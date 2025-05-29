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

const PhysicsRepoGraph: React.FC<PhysicsRepoGraphProps> = ({ nodes, edges = [] }) => {
  const [nodeStates, setNodeStates] = useState<NodeData[]>(nodes);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<{ [id: string]: Matter.Body }>({});
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const constraintsRef = useRef<Matter.Constraint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialViewportRef = useRef(INITIAL_VIEWPORT);
  const animatingRef = useRef(false);
  const initialNodeStatesRef = useRef<NodeData[]>(nodes.map(n => ({ ...n })));

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

  // 최적화된 패닝 핸들러
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPanning(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    
    requestAnimationFrame(() => {
      setViewport(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy
      }));
    });
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isPanning, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Matter.js 초기화 및 최적화
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
      enableSleeping: true, // 정지된 물체 계산 제외
    });

    // 물리 엔진 설정 최적화
    engine.constraintIterations = 2; // 기본값 보다 낮춤
    engine.positionIterations = 3; // 기본값 보다 낮춤
    engine.velocityIterations = 3; // 기본값 보다 낮춤

    engineRef.current = engine;

    // 노드별 Body 생성
    const bodies: { [id: string]: Matter.Body } = {};
    nodes.forEach(node => {
      bodies[node.id] = Matter.Bodies.rectangle(
        node.x,
        node.y,
        CARD_WIDTH,
        CARD_HEIGHT,
        {
          inertia: Infinity,
          restitution: 0.1, // 반발력 더 감소
          friction: 0.05, // 마찰력 감소
          frictionAir: 0.05, // 공기 마찰 감소
          frictionStatic: 0.1, // 정적 마찰 감소
          density: 0.0005, // 밀도 감소
          isStatic: false,
          sleepThreshold: 30, // 더 빨리 잠들도록
        }
      );
    });

    // 최적화된 Constraint 설정
    const constraints = edges.map(edge => {
      const sourceBody = bodies[edge.source];
      const targetBody = bodies[edge.target];
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      const isMainEdge = sourceNode?.isMain && targetNode?.isMain;
      
      return Matter.Constraint.create({
        bodyA: sourceBody,
        bodyB: targetBody,
        stiffness: isMainEdge ? 0.04 : 0.02, // 강성 감소
        damping: isMainEdge ? 0.5 : 0.4, // 댐핑 증가
        length: Math.sqrt(
          Math.pow(sourceBody.position.x - targetBody.position.x, 2) +
          Math.pow(sourceBody.position.y - targetBody.position.y, 2)
        )
      });
    });

    const world = engine.world;
    Matter.World.add(world, Object.values(bodies));
    Matter.World.add(world, constraints);
    
    bodiesRef.current = bodies;
    constraintsRef.current = constraints;

    // 최적화된 업데이트 루프
    function update(timestamp: number) {
      const deltaTime = timestamp - lastUpdateRef.current;
      
      if (deltaTime >= UPDATE_INTERVAL) {
        // 더 부드러운 물리 시뮬레이션을 위해 작은 단위로 업데이트
        Matter.Engine.update(engine, Math.min(deltaTime, 16.67)); // 최대 60fps
        
        setNodeStates(prev =>
          prev.map(node => {
            const body = bodies[node.id];
            return {
              ...node,
              x: body.position.x,
              y: body.position.y,
            };
          })
        );
        
        lastUpdateRef.current = timestamp;
      }
      
      rafRef.current = requestAnimationFrame(update);
    }
    
    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [nodes, edges]);

  // 최적화된 드래그 핸들러
  const handleDragStart = useCallback((id: string, e: React.MouseEvent) => {
    setDraggingId(id);
    const body = bodiesRef.current[id];
    if (body) {
      // 드래그 시작 시 물리 시뮬레이션 비활성화
      Matter.Body.setStatic(body, true);
    }
    e.preventDefault();
  }, []);

  const handleDrag = useCallback((id: string, e: React.MouseEvent) => {
    const body = bodiesRef.current[id];
    if (!body) return;

    const container = (e.target as HTMLElement).closest('[data-graph-container]') as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    const x = (e.clientX - rect.left - viewport.x) / viewport.scale - CARD_WIDTH / 2;
    const y = (e.clientY - rect.top - viewport.y) / viewport.scale - CARD_HEIGHT / 2;
    
    Matter.Body.setPosition(body, { x, y });
  }, [viewport]);

  const handleDragEnd = useCallback((id: string) => {
    const body = bodiesRef.current[id];
    if (body) {
      // 드래그 종료 시 물리 시뮬레이션 재활성화
      Matter.Body.setStatic(body, false);
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
    }
    setDraggingId(null);
  }, []);

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

  return (
    <GraphContainer 
      ref={containerRef}
      data-graph-container
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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