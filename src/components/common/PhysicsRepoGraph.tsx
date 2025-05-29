import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';
import HistoryCard from '../history/HistoryCard';

const CARD_WIDTH = 335;
const CARD_HEIGHT = 150;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const UPDATE_INTERVAL = 1000 / 60; // 60 FPS로 증가

interface NodeData {
  id: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description?: string;
  timeAgo?: string;
  isMain?: boolean;
  x: number;
  y: number;
  historyId?: string;
  onDetailClick?: (historyId: string) => void;
  currentUserId?: string;
  historyCreatorId?: string;
  onEditClick?: (historyId: string) => void;
  onCreateClick?: (historyId?: string) => void;
  onProposalClick?: (historyId: string) => void;
}

interface EdgeData {
  source: string;
  target: string;
}

interface PhysicsRepoGraphProps {
  nodes: NodeData[];
  edges?: EdgeData[];
}

const INITIAL_VIEWPORT = { x: 0, y: 0, scale: 1 };

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  background: transparent;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const GraphViewport = styled.div<{ x: number; y: number; scale: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  transform: translate(${props => props.x}px, ${props => props.y}px) scale(${props => props.scale});
  will-change: transform;
`;

const NodeWrapper = styled.div<{ x: number; y: number; isDragging: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(${props => props.x}px, ${props => props.y}px);
  z-index: ${props => (props.isDragging ? 10 : 1)};
  cursor: grab;
  user-select: none;
  will-change: transform;
  &:active {
    cursor: grabbing;
  }
`;

const EdgesSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Edge = styled.line<{ isMain?: boolean }>`
  stroke: ${props => props.isMain ? '#2563eb' : '#94a3b8'};
  stroke-width: ${props => props.isMain ? '3px' : '2.5px'};
  opacity: ${props => props.isMain ? 0.8 : 0.5};
  vector-effect: non-scaling-stroke;
  transition: stroke-width 0.2s ease, opacity 0.2s ease;

  &:hover {
    stroke-width: ${props => props.isMain ? '4px' : '3px'};
    opacity: 1;
  }
`;

const ResetButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 100;
  background: #fff;
  border: 1.5px solid #2563eb;
  color: #2563eb;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover, &:focus {
    background: #2563eb;
    color: #fff;
    outline: none;
  }
`;

// 메모이제이션된 노드 컴포넌트
const MemoizedNode = memo(({ node, isDragging, onDragStart, onDrag, onDragEnd }: {
  node: NodeData;
  isDragging: boolean;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onDrag: (id: string, e: React.MouseEvent) => void;
  onDragEnd: (id: string) => void;
}) => (
  <NodeWrapper
    x={node.x}
    y={node.y}
    isDragging={isDragging}
    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    data-node-id={node.id}
    onMouseDown={e => onDragStart(node.id, e)}
    onMouseMove={e => isDragging && onDrag(node.id, e)}
    onMouseUp={() => onDragEnd(node.id)}
    onMouseLeave={() => onDragEnd(node.id)}
    tabIndex={0}
    aria-label={node.title}
  >
    <HistoryCard
      isMain={node.isMain}
      userName={node.userName}
      userAvatar={node.userAvatar}
      title={node.title}
      description={node.description}
      timeAgo={node.timeAgo}
      historyId={node.historyId}
      onDetailClick={node.onDetailClick}
      currentUserId={node.currentUserId}
      historyCreatorId={node.historyCreatorId}
      onEditClick={node.onEditClick}
      onCreateClick={node.onCreateClick}
      onProposalClick={node.onProposalClick}
    />
  </NodeWrapper>
));

// 메모이제이션된 엣지 컴포넌트
const MemoizedEdge = memo(({ source, target, isMain }: { 
  source: NodeData; 
  target: NodeData;
  isMain?: boolean;
}) => (
  <Edge
    isMain={isMain}
    x1={source.x + CARD_WIDTH/2}
    y1={source.y + CARD_HEIGHT/2}
    x2={target.x + CARD_WIDTH/2}
    y2={target.y + CARD_HEIGHT/2}
  />
));

MemoizedEdge.displayName = 'MemoizedEdge';

const DRAG_NONE = 0;
const DRAG_PAN = 1;
const DRAG_NODE = 2;

const PhysicsRepoGraph: React.FC<PhysicsRepoGraphProps> = ({ nodes, edges = [] }) => {
  const [nodeStates, setNodeStates] = useState<NodeData[]>(nodes);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [dragMode, setDragMode] = useState<number>(DRAG_NONE); // 0: 없음, 1: 시점, 2: 노드
  
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<{ [id: string]: Matter.Body }>({});
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const constraintsRef = useRef<Matter.Constraint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialViewportRef = useRef(INITIAL_VIEWPORT);
  const animatingRef = useRef(false);
  const initialNodeStatesRef = useRef<NodeData[]>(nodes.map(n => ({ ...n })));
  const lastNodePositionsRef = useRef<{ [id: string]: { x: number; y: number } }>({});

  // nodes prop이 바뀌면 초기 노드 위치도 갱신
  useEffect(() => {
    initialNodeStatesRef.current = nodes.map(n => ({ ...n }));
    setNodeStates(nodes);
  }, [nodes]);

  // 휠 이벤트 직접 등록 (passive: false)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const scaleChange = delta > 0 ? 0.9 : 1.1;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const newScale = Math.min(Math.max(viewport.scale * scaleChange, MIN_ZOOM), MAX_ZOOM);
      const newX = mouseX - (mouseX - viewport.x) * (newScale / viewport.scale);
      const newY = mouseY - (mouseY - viewport.y) * (newScale / viewport.scale);
      setViewport({ x: newX, y: newY, scale: newScale });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [viewport]);

  // 마우스 다운 핸들러 (드래그 모드 결정)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 노드 드래그 중이면 시점 드래그 불가
    if (dragMode === DRAG_NODE) return;
    // 우클릭(2) 또는 space/ctrl/meta/alt/shift 키 → 시점 드래그
    if (
      e.button === 2 ||
      e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ||
      (e.nativeEvent && (e.nativeEvent as any).code === 'Space')
    ) {
      setIsPanning(true);
      setDragMode(DRAG_PAN);
      setLastMousePos({ x: e.clientX, y: e.clientY });
      return;
    }
    // 노드 위에서만 노드 드래그
    const nodeElem = (e.target as HTMLElement).closest('[data-node-id]');
    if (nodeElem) {
      // 시점 드래그 시작하지 않음 (노드 드래그는 MemoizedNode에서 처리)
      return;
    }
    // 그 외는 시점 드래그
    setIsPanning(true);
    setDragMode(DRAG_PAN);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [dragMode]);

  // 노드 드래그 핸들러
  const handleDragStart = useCallback((id: string, e: React.MouseEvent) => {
    setDraggingId(id);
    setDragMode(DRAG_NODE);
    const body = bodiesRef.current[id];
    if (body) {
      Matter.Body.setStatic(body, true);
    }
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const handleDrag = useCallback((id: string, e: React.MouseEvent) => {
    if (dragMode !== DRAG_NODE) return;
    const body = bodiesRef.current[id];
    if (!body) return;
    const container = (e.target as HTMLElement).closest('[data-graph-container]') as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - viewport.x) / viewport.scale - CARD_WIDTH / 2;
    const y = (e.clientY - rect.top - viewport.y) / viewport.scale - CARD_HEIGHT / 2;
    Matter.Body.setPosition(body, { x, y });
  }, [dragMode, viewport]);
  const handleDragEnd = useCallback((id: string) => {
    if (dragMode !== DRAG_NODE) return;
    const body = bodiesRef.current[id];
    if (body) {
      Matter.Body.setStatic(body, false);
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
    }
    setDraggingId(null);
    setDragMode(DRAG_NONE);
  }, [dragMode]);

  // 마우스 무브 핸들러
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragMode === DRAG_PAN && isPanning) {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      requestAnimationFrame(() => {
        setViewport(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      });
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } else if (dragMode === DRAG_NODE && draggingId) {
      const body = bodiesRef.current[draggingId];
      if (!body) return;
      const container = (e.target as HTMLElement).closest('[data-graph-container]') as HTMLElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - viewport.x) / viewport.scale - CARD_WIDTH / 2;
      const y = (e.clientY - rect.top - viewport.y) / viewport.scale - CARD_HEIGHT / 2;
      Matter.Body.setPosition(body, { x, y });
    }
  }, [dragMode, isPanning, lastMousePos, draggingId, viewport]);

  // 우클릭 메뉴 방지
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Matter.js 초기화 및 최적화
  useEffect(() => {
    let rafId: number | null = null;
    let lastUpdate = performance.now();
    let lastRender = performance.now();
    let engine: Matter.Engine | null = null;
    let world: Matter.World | null = null;
    let bodies: { [id: string]: Matter.Body } = {};
    let constraints: Matter.Constraint[] = [];

    function setupEngine() {
      engine = Matter.Engine.create({
        gravity: { x: 0, y: 0 },
        enableSleeping: true,
      });
      engine.constraintIterations = 2;
      engine.positionIterations = 3;
      engine.velocityIterations = 3;
      engineRef.current = engine;

      bodies = {};
      nodes.forEach(node => {
        bodies[node.id] = Matter.Bodies.rectangle(
          node.x,
          node.y,
          CARD_WIDTH,
          CARD_HEIGHT,
          {
            inertia: Infinity,
            restitution: 0.1,
            friction: 0.05,
            frictionAir: 0.05,
            frictionStatic: 0.1,
            density: 0.0005,
            isStatic: false,
            sleepThreshold: 30,
          }
        );
      });
      constraints = edges.map(edge => {
        const sourceBody = bodies[edge.source];
        const targetBody = bodies[edge.target];
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        const isMainEdge = sourceNode?.isMain && targetNode?.isMain;
        return Matter.Constraint.create({
          bodyA: sourceBody,
          bodyB: targetBody,
          stiffness: isMainEdge ? 0.04 : 0.02,
          damping: isMainEdge ? 0.5 : 0.4,
          length: Math.sqrt(
            Math.pow(sourceBody.position.x - targetBody.position.x, 2) +
            Math.pow(sourceBody.position.y - targetBody.position.y, 2)
          )
        });
      });
      world = engine.world;
      Matter.World.add(world, Object.values(bodies));
      Matter.World.add(world, constraints);
      bodiesRef.current = bodies;
      constraintsRef.current = constraints;
    }

    function cleanupEngine() {
      if (rafId) cancelAnimationFrame(rafId);
      if (world && engine) {
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
      }
      if (bodies) Object.keys(bodies).forEach(id => delete bodies[id]);
      if (constraints) constraints.length = 0;
      engineRef.current = null;
      bodiesRef.current = {};
      constraintsRef.current = [];
      world = null;
      engine = null;
    }

    function startLoop() {
      lastUpdate = performance.now();
      lastRender = performance.now();
      function update(now: number) {
        const delta = now - lastUpdate;
        if (engine) {
          if (delta > 0) {
            Matter.Engine.update(engine, Math.min(delta, 16.67));
            lastUpdate = now;
          }
          // 항상 60fps로 setNodeStates (빈도 제한 제거)
          setNodeStates(prev =>
            prev.map(node => {
              const body = bodies[node.id];
              if (!body) return node;
              lastNodePositionsRef.current[node.id] = { x: body.position.x, y: body.position.y };
              return { ...node, x: body.position.x, y: body.position.y };
            })
          );
          lastRender = now;
        }
        rafId = requestAnimationFrame(update);
      }
      rafId = requestAnimationFrame(update);
    }

    // 최초 엔진 세팅 및 루프 시작
    setupEngine();
    startLoop();

    return () => {
      cleanupEngine();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  // 노드 위치만 초기화
  const handleResetNodes = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    
    const startNodes = nodeStates.map(n => ({ ...n }));
    const endNodes = initialNodeStatesRef.current;
    const duration = 400; // ms
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // LERP
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      
      // 노드 위치 보간
      const newNodes = startNodes.map((node, i) => {
        const end = endNodes[i];
        return {
          ...node,
          x: lerp(node.x, end.x, t),
          y: lerp(node.y, end.y, t),
        };
      });
      
      setNodeStates(newNodes);
      
      // Matter.Body 위치도 동기화
      newNodes.forEach((node) => {
        const body = bodiesRef.current[node.id];
        if (body) {
          Matter.Body.setPosition(body, { x: node.x, y: node.y });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }
      });

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
      }
    }
    
    requestAnimationFrame(animate);
  }, [nodeStates]);

  // handleMouseUp을 document 전역에 등록
  useEffect(() => {
    const onUp = () => {
      if (dragMode === DRAG_PAN) {
        setIsPanning(false);
      } else if (dragMode === DRAG_NODE && draggingId) {
        const body = bodiesRef.current[draggingId];
        if (body) {
          Matter.Body.setStatic(body, false);
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }
        setDraggingId(null);
      }
      setDragMode(DRAG_NONE);
    };
    document.addEventListener('mouseup', onUp);
    return () => document.removeEventListener('mouseup', onUp);
  }, [dragMode, draggingId]);

  return (
    <GraphContainer
      ref={containerRef}
      data-graph-container
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onContextMenu={handleContextMenu}
    >
      <ResetButton
        onClick={handleResetNodes}
        aria-label="노드 위치 초기화"
        tabIndex={0}
      >
        노드 초기화
      </ResetButton>
      <GraphViewport x={viewport.x} y={viewport.y} scale={viewport.scale}>
        <EdgesSvg>
          {edges.map((edge) => {
            const source = nodeStates.find(n => n.id === edge.source);
            const target = nodeStates.find(n => n.id === edge.target);
            if (!source || !target) return null;
            const isMainEdge = !!(source.isMain && target.isMain);
            
            return (
              <MemoizedEdge
                key={`${edge.source}-${edge.target}`}
                source={source}
                target={target}
                isMain={isMainEdge}
              />
            );
          })}
        </EdgesSvg>
        {nodeStates.map(node => (
          <MemoizedNode
            key={node.id}
            node={node}
            isDragging={draggingId === node.id}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </GraphViewport>
    </GraphContainer>
  );
};

export default PhysicsRepoGraph; 