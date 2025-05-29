import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';
import { Dropdown, DropdownOption } from './Dropdown';

const CARD_WIDTH = 335;
const CARD_HEIGHT = 150;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const DPR = window.devicePixelRatio || 1;

interface NodeData {
  id: string;
  userName: string;
  userAvatar?: string;
  profileImage?: string;
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
  createdBy?: {
    profileImage?: string;
    nickname?: string;
    providerId?: string;
    email?: string;
  };
}

interface EdgeData {
  source: string;
  target: string;
}

interface CanvasRepoGraphProps {
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

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
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

// 텍스트 측정용 숨겨진 캔버스
let textMeasureCanvas: HTMLCanvasElement | null = null;
let textMeasureCtx: CanvasRenderingContext2D | null = null;

const getTextMeasureContext = (): CanvasRenderingContext2D => {
  if (!textMeasureCanvas) {
    textMeasureCanvas = document.createElement('canvas');
    textMeasureCtx = textMeasureCanvas.getContext('2d');
    if (!textMeasureCtx) throw new Error('Cannot create 2D context for text measure');
  }
  if (!textMeasureCtx) throw new Error('Text measure context is null');
  return textMeasureCtx;
};

// 프로필 이미지 처리 - SideBar와 정확히 동일한 로직
const getProfileImageSrc = (node: NodeData): string => {
  // 여러 경로에서 프로필 이미지 찾기
  const profileImageSrc = node.profileImage || node.userAvatar || node.createdBy?.profileImage;
  
  if (!profileImageSrc) {
    return ''; // 기본 아바타 이미지는 별도 처리
  }
  
  // SideBar와 정확히 동일한 로직
  const result = profileImageSrc.startsWith('data:') 
    ? profileImageSrc 
    : `data:image/jpeg;base64,${profileImageSrc}`;
    
  return result;
};

// 텍스트 줄바꿈 함수
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const testWidth = ctx.measureText(testLine).width;
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
};

// 텍스트를 중앙 정렬로 그리기
const drawTextCentered = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  font: string,
  color: string,
  lineHeight: number = 1.2
): void => {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const lines = wrapText(ctx, text, maxWidth);
  const totalHeight = lines.length * lineHeight * parseInt(font);
  const startY = y - totalHeight / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight * parseInt(font));
  });
  
  ctx.restore();
};

// 모서리가 둥근 사각형 그리기
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

// 노드 렌더링 함수
const renderNode = (
  ctx: CanvasRenderingContext2D,
  node: NodeData,
  isHovered: boolean,
  isDragging: boolean,
  imageRefs: { [key: string]: HTMLImageElement }
): void => {
  const x = node.x;
  const y = node.y;
  const width = CARD_WIDTH;
  const height = isHovered ? 150 : 105; // 기존 HistoryCard와 동일한 높이
  
  ctx.save();
  
  // 그림자 (main이고 expanded일 때 / main일 때)
  if (node.isMain && isHovered) {
    ctx.shadowColor = 'rgba(108, 158, 255, 0.10)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
  } else if (node.isMain) {
    ctx.shadowColor = 'rgba(108, 158, 255, 0.06)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
  }
  
  // 카드 배경 (둥근 모서리)
  drawRoundedRect(ctx, x, y, width, height, 15);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  // 보더 (2px, main일 때 #6C9EFF, 아니면 #F0F0F0)
  ctx.lineWidth = 2;
  ctx.strokeStyle = node.isMain ? '#6C9EFF' : '#F0F0F0';
  ctx.stroke();
  
  ctx.shadowColor = 'transparent'; // 그림자 제거
  
  // 드래그 중일 때 opacity
  if (isDragging) {
    ctx.globalAlpha = 0.8;
  }
  
  // 패딩 계산 (기존: expanded ? '24px 18px 24px 28px') - 상단 패딩 줄임
  const paddingTop = isHovered ? 18 : 16; // 상단 패딩을 줄여서 컨텐츠를 위로 올림
  const paddingBottom = isHovered ? 18 : 24; // 호버 시 상단과 동일한 패딩으로 맞춤
  const paddingLeft = isHovered ? 28 : 28;
  const paddingRight = isHovered ? 18 : 28;
  
  // Content 영역 시작
  const contentStartY = y + paddingTop;
  
  // Title Row - 타이틀을 더 위로 올림
  const titleX = x + paddingLeft;
  const titleY = contentStartY + 8; // 12에서 8로 줄여서 위로 올림
  
  // 제목 (18px, 700, #222, letter-spacing: -0.5px)
  ctx.font = '700 18px Pretendard, Inter, sans-serif';
  ctx.fillStyle = '#222222';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // 제목 너비 계산 (timeAgo를 위한 공간 확보)
  const titleMaxWidth = width - paddingLeft - paddingRight - (isHovered && node.timeAgo ? 80 : 0);
  const titleLines = wrapText(ctx, node.title, titleMaxWidth);
  
  titleLines.forEach((line, index) => {
    ctx.fillText(line, titleX, titleY + (index * 20));
  });
  
  // TimeAgo (hover 시에만, 12px, #7C7C7C, right-aligned)
  if (isHovered && node.timeAgo) {
    ctx.font = '400 12px Pretendard, Inter, sans-serif';
    ctx.fillStyle = '#7C7C7C';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(node.timeAgo, x + width - paddingRight, titleY);
  }
  
  // Description (hover 시에만, 13px, #909090, margin-top: 2px + 8px gap)
  if (isHovered && node.description) {
    const descY = titleY + (titleLines.length * 20) + 10; // 8px gap + 2px margin-top
    ctx.font = '400 13px Pretendard, Inter, sans-serif';
    ctx.fillStyle = '#909090';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    const descMaxWidth = width - paddingLeft - paddingRight;
    const descLines = wrapText(ctx, node.description, descMaxWidth);
    
    descLines.forEach((line, index) => {
      ctx.fillText(line, titleX, descY + (index * 19.5)); // line-height 1.5 * 13 = 19.5
    });
  }
  
  // Bottom Row - 하단 패딩을 정확히 지켜서 아바타 위치를 고정으로 계산
  // 호버 시: y + 150 - 18 - 14 = y + 118 (카드높이 - 하단패딩 - 아바타반지름)
  // 일반 시: y + 105 - 24 - 14 = y + 67 (카드높이 - 하단패딩 - 아바타반지름)
  const avatarY = isHovered ? y + 118 : y + 67;
  
  // 아바타 (28px, border: 1.5px solid #fff, box-shadow, background: #f5f7fa)
  const avatarX = x + paddingLeft + 14; // 28px/2 = 14
  
  // 아바타 배경
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 14, 0, 2 * Math.PI);
  ctx.fillStyle = '#f5f7fa';
  ctx.fill();
  
  // 아바타 보더
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  
  // 프로필 이미지 렌더링 (imageRefs에서 로드된 img 요소 사용)
  const profileImageSrc = getProfileImageSrc(node);
  let avatarImage = null;
  
  // 먼저 해당 노드의 프로필 이미지 찾기
  if (profileImageSrc && imageRefs[node.id]) {
    avatarImage = imageRefs[node.id];
  }
  
  // 프로필 이미지가 없으면 기본 아바타 사용
  if (!avatarImage && imageRefs['default-avatar']) {
    avatarImage = imageRefs['default-avatar'];
  }
  
  // 이미지가 있는지 확인하고 그리기
  if (avatarImage && avatarImage.complete && avatarImage.naturalWidth > 0) {
    ctx.save();
    // 원형 클리핑 마스크
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, 13, 0, 2 * Math.PI); // 보더 안쪽 크기
    ctx.clip();
    
    // 이미지 그리기
    try {
      ctx.drawImage(avatarImage, avatarX - 13, avatarY - 13, 26, 26);
    } catch (error) {
      console.error(`❌ ${node.userName} 아바타 그리기 실패:`, error);
    }
    ctx.restore();
    
    // 보더 다시 그리기
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, 14, 0, 2 * Math.PI);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
  
  // 아바타 그림자 효과 (box-shadow: 0 1px 2px 0 rgba(107, 110, 116, 0.04))
  ctx.shadowColor = 'rgba(107, 110, 116, 0.04)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 1;
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  
  // 사용자 이름 (14px, #292929, margin-left: 2px, letter-spacing: -0.2px)
  const userNameX = avatarX + 14 + 8 + 2; // 아바타 반지름 + gap + margin-left
  const userNameY = avatarY; // 아바타와 동일한 Y 좌표 사용
  
  ctx.font = '400 14px Pretendard, Inter, sans-serif';
  ctx.fillStyle = '#292929';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.userName, userNameX, userNameY);
  
  ctx.restore();
};

// 엣지 렌더링 함수
const renderEdge = (
  ctx: CanvasRenderingContext2D,
  sourceNode: NodeData,
  targetNode: NodeData,
  isMain: boolean = false
): void => {
  const x1 = sourceNode.x + CARD_WIDTH / 2;
  const y1 = sourceNode.y + CARD_HEIGHT / 2;
  const x2 = targetNode.x + CARD_WIDTH / 2;
  const y2 = targetNode.y + CARD_HEIGHT / 2;
  
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = isMain ? 3 : 2.5;
  ctx.strokeStyle = isMain ? '#2563eb' : '#94a3b8';
  ctx.globalAlpha = isMain ? 0.8 : 0.5;
  ctx.stroke();
  ctx.restore();
};

const DRAG_NONE = 0;
const DRAG_PAN = 1;
const DRAG_NODE = 2;

const CanvasRepoGraph: React.FC<CanvasRepoGraphProps> = ({ nodes, edges = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  // States
  const [nodeStates, setNodeStates] = useState<NodeData[]>(nodes);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const viewportRef = useRef(viewport);
  const [dragMode, setDragMode] = useState<number>(DRAG_NONE);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [forceRender, setForceRender] = useState(0); // 강제 렌더링용
  const [dropdown, setDropdown] = useState<{ open: boolean; x: number; y: number; nodeId: string | null }>({ 
    open: false, 
    x: 0, 
    y: 0, 
    nodeId: null 
  });
  
  // 이미지 refs - 사이드바와 동일한 방식으로 img 태그 사용
  const imageRefs = useRef<{ [key: string]: HTMLImageElement }>({});
  
  // Matter.js refs
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<{ [id: string]: Matter.Body }>({});
  const constraintsRef = useRef<Matter.Constraint[]>([]);
  const initialNodeStatesRef = useRef<NodeData[]>(nodes.map(n => ({ ...n })));
  const animatingRef = useRef(false);
  
  // 1. 패닝 애니메이션용 ref 추가
  const panningAnimationId = useRef<number | null>(null);
  
  // 2. 패닝 루프 함수 정의
  const startPanningLoop = useCallback(() => {
    if (panningAnimationId.current === null) {
      const loop = () => {
        setForceRender(f => f + 1);
        panningAnimationId.current = requestAnimationFrame(loop);
      };
      panningAnimationId.current = requestAnimationFrame(loop);
    }
  }, []);
  const stopPanningLoop = useCallback(() => {
    if (panningAnimationId.current !== null) {
      cancelAnimationFrame(panningAnimationId.current);
      panningAnimationId.current = null;
    }
  }, []);
  
  // 3. 패닝 시작 시 루프 시작
  useEffect(() => {
    if (dragMode === DRAG_PAN && isPanning) {
      startPanningLoop();
    } else {
      stopPanningLoop();
    }
    // 패닝 상태가 바뀔 때마다 실행
    return () => stopPanningLoop();
  }, [dragMode, isPanning, startPanningLoop, stopPanningLoop]);
  
  // 노드 위치를 화면 좌표로 변환
  const nodeToScreen = useCallback((node: { x: number; y: number }) => {
    const v = viewportRef.current;
    return {
      x: node.x * v.scale + v.x,
      y: node.y * v.scale + v.y
    };
  }, []);
  
  // 화면 좌표를 노드 좌표로 변환  
  const screenToNode = useCallback((screen: { x: number; y: number }) => {
    const v = viewportRef.current;
    return {
      x: (screen.x - v.x) / v.scale,
      y: (screen.y - v.y) / v.scale
    };
  }, []);
  
  // 마우스 위치에서 노드 찾기
  const getNodeAtPosition = useCallback((mouseX: number, mouseY: number): NodeData | null => {
    const nodePos = screenToNode({ x: mouseX, y: mouseY });
    
    return nodeStates.find(node => 
      nodePos.x >= node.x && 
      nodePos.x <= node.x + CARD_WIDTH &&
      nodePos.y >= node.y && 
      nodePos.y <= node.y + CARD_HEIGHT
    ) || null;
  }, [nodeStates, screenToNode]);
  
  // Canvas 크기 조정
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(DPR, DPR);
    }
  }, []);
  
  // 렌더링 함수
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // 캔버스 클리어
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    ctx.save();
    
    // 뷰포트 변환 적용
    const v = viewportRef.current;
    ctx.translate(v.x, v.y);
    ctx.scale(v.scale, v.scale);
    
    // 엣지 렌더링
    edges.forEach(edge => {
      const sourceNode = nodeStates.find(n => n.id === edge.source);
      const targetNode = nodeStates.find(n => n.id === edge.target);
      if (sourceNode && targetNode) {
        const isMainEdge = sourceNode.isMain && targetNode.isMain;
        renderEdge(ctx, sourceNode, targetNode, isMainEdge);
      }
    });
    
    // 노드 렌더링
    nodeStates.forEach(node => {
      const isHovered = hoveredNodeId === node.id;
      const isDragging = draggingId === node.id;
      renderNode(ctx, node, isHovered, isDragging, imageRefs.current);
    });
    
    ctx.restore();
  }, [nodeStates, edges, hoveredNodeId, draggingId, forceRender, imageRefs]);
  
  // nodes prop 변경 시 업데이트
  useEffect(() => {
    initialNodeStatesRef.current = nodes.map(n => ({ ...n }));
    setNodeStates(nodes);
  }, [nodes]);
  
  // 이미지 요소들을 미리 생성 (사이드바와 동일한 방식)
  const createImageElements = useCallback(() => {
    console.log('🔄 이미지 로딩 시작, 노드 수:', nodes.length);
    
    // 기본 아바타 이미지
    try {
      import('../../assets/avatar.svg').then(avatarModule => {
        console.log('📦 기본 아바타 모듈 로드됨:', avatarModule.default);
        const defaultImg = new Image();
        defaultImg.onload = () => {
          console.log('✅ 기본 아바타 이미지 로드 완료');
          imageRefs.current['default-avatar'] = defaultImg;
          setForceRender(prev => prev + 1);
        };
        defaultImg.onerror = (error) => {
          console.error('❌ 기본 아바타 이미지 로드 실패:', error);
        };
        defaultImg.src = avatarModule.default;
      }).catch(error => {
        console.error('❌ 기본 아바타 모듈 로드 실패:', error);
      });
    } catch (error) {
      console.warn('기본 아바타 이미지 로딩 실패:', error);
    }
    
    // 각 노드의 프로필 이미지
    nodes.forEach(node => {
      const profileImageSrc = getProfileImageSrc(node);
      console.log(`📸 ${node.userName} 프로필 이미지:`, profileImageSrc ? '있음' : '없음', profileImageSrc?.substring(0, 50));
      
      if (profileImageSrc && !imageRefs.current[node.id]) {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ ${node.userName} 프로필 이미지 로드 완료`);
          imageRefs.current[node.id] = img;
          setForceRender(prev => prev + 1); // 이미지 로드시마다 리렌더링
        };
        img.onerror = (error) => {
          console.warn(`❌ ${node.userName} 프로필 이미지 로딩 실패:`, error);
          // 실패시 기본 아바타 사용
          if (imageRefs.current['default-avatar']) {
            imageRefs.current[node.id] = imageRefs.current['default-avatar'];
            setForceRender(prev => prev + 1);
          }
        };
        img.src = profileImageSrc;
      }
    });
  }, [nodes]);
  
  useEffect(() => {
    createImageElements();
  }, [createImageElements]);
  
  // Canvas 이벤트 핸들러들
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const nodeAtPos = getNodeAtPosition(mouseX, mouseY);
    
    if (nodeAtPos && (e.button === 0)) {
      // 노드 드래그 시작
      setDragMode(DRAG_NODE);
      setDraggingId(nodeAtPos.id);
      
      // 마우스 위치와 노드 위치의 오프셋 계산
      const nodePos = screenToNode({ x: mouseX, y: mouseY });
      const offsetX = nodePos.x - nodeAtPos.x;
      const offsetY = nodePos.y - nodeAtPos.y;
      setDragOffset({ x: offsetX, y: offsetY });
      
      const body = bodiesRef.current[nodeAtPos.id];
      if (body) {
        Matter.Body.setStatic(body, true);
      }
    } else if (e.button === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      // 시점 드래그 시작
      setDragMode(DRAG_PAN);
      setIsPanning(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } else {
      // 빈 공간 클릭 - 시점 드래그
      setDragMode(DRAG_PAN);
      setIsPanning(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [getNodeAtPosition]);
  
  // 4. 기존 handleCanvasMouseMove에서 setForceRender는 제거 (루프에서 처리)
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // 호버 상태 업데이트
    if (dragMode === DRAG_NONE) {
      const nodeAtPos = getNodeAtPosition(mouseX, mouseY);
      setHoveredNodeId(nodeAtPos?.id || null);
    }
    if (dragMode === DRAG_PAN && isPanning) {
      // 시점 드래그: ref만 변경 + 즉시 렌더링
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      viewportRef.current = {
        ...viewportRef.current,
        x: viewportRef.current.x + dx,
        y: viewportRef.current.y + dy
      };
      setLastMousePos({ x: e.clientX, y: e.clientY });
      render(); // 마우스 이동마다 즉시 렌더링
    } else if (dragMode === DRAG_NODE && draggingId) {
      // 노드 드래그는 기존대로
      const body = bodiesRef.current[draggingId];
      if (body) {
        const nodePos = screenToNode({ x: mouseX, y: mouseY });
        Matter.Body.setPosition(body, { 
          x: nodePos.x - dragOffset.x, 
          y: nodePos.y - dragOffset.y 
        });
      }
    }
  }, [dragMode, isPanning, lastMousePos, draggingId, getNodeAtPosition, screenToNode, dragOffset, render]);
  
  const handleCanvasMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 클릭 이벤트 처리 (드래그가 아닌 경우에만)
    if (dragMode === DRAG_NONE || (dragMode === DRAG_NODE && !draggingId)) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const nodeAtPos = getNodeAtPosition(mouseX, mouseY);
      if (nodeAtPos && nodeAtPos.onDetailClick && nodeAtPos.historyId) {
        // 우클릭이면 context menu 처리하지 않고 기본 동작
        if (e.button === 2) {
          return;
        }
        // 왼쪽 클릭이면 상세보기 실행
        nodeAtPos.onDetailClick(nodeAtPos.historyId);
      }
    }
    
    if (dragMode === DRAG_NODE && draggingId) {
      const body = bodiesRef.current[draggingId];
      if (body) {
        Matter.Body.setStatic(body, false);
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(body, 0);
      }
    }
    
    if (dragMode === DRAG_PAN) {
      setViewport(viewportRef.current);
    }
    setDragMode(DRAG_NONE);
    setDraggingId(null);
    setIsPanning(false);
    setDragOffset({ x: 0, y: 0 });
  }, [dragMode, draggingId, getNodeAtPosition]);
  
  const handleCanvasMouseLeave = useCallback(() => {
    setHoveredNodeId(null);
  }, []);
  
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const nodeAtPos = getNodeAtPosition(mouseX, mouseY);
    if (nodeAtPos) {
      setDropdown({ 
        open: true, 
        x: e.clientX, 
        y: e.clientY, 
        nodeId: nodeAtPos.id 
      });
    }
  }, [getNodeAtPosition]);
  
  const handleDropdownSelect = useCallback((value: string) => {
    const node = nodeStates.find(n => n.id === dropdown.nodeId);
    if (!node) return;
    
    setDropdown({ ...dropdown, open: false });
    
    if (value === 'create' && node.onCreateClick) {
      node.onCreateClick(node.historyId);
    } else if (value === 'detail' && node.historyId && node.onDetailClick) {
      node.onDetailClick(node.historyId);
    } else if (value === 'edit' && node.historyId && node.onEditClick) {
      node.onEditClick(node.historyId);
    } else if (value === 'pp' && node.historyId && node.onProposalClick) {
      node.onProposalClick(node.historyId);
    }
  }, [nodeStates, dropdown]);
  
  const handleDropdownClose = useCallback(() => {
    setDropdown({ ...dropdown, open: false });
  }, [dropdown]);
  
  // 휠 이벤트 핸들러
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
  
  // Matter.js 초기화
  useEffect(() => {
    let engine: Matter.Engine | null = null;
    let world: Matter.World | null = null;
    let bodies: { [id: string]: Matter.Body } = {};
    let constraints: Matter.Constraint[] = [];
    let lastUpdate = performance.now();
    
    // 엔진 설정
    engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
      enableSleeping: true,
    });
    engine.constraintIterations = 2;
    engine.positionIterations = 3;
    engine.velocityIterations = 3;
    engineRef.current = engine;
    
    // 바디 생성
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
    
    // 제약 조건 생성
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
    
    // 업데이트 루프 최적화
    let lastStateUpdate = 0;
    const STATE_UPDATE_INTERVAL = 33; // 30fps로 상태 업데이트 제한
    
    const update = (now: number) => {
      const delta = now - lastUpdate;
      if (engine && delta > 0) {
        Matter.Engine.update(engine, Math.min(delta, 16.67));
        lastUpdate = now;
        
        // 상태 업데이트를 30fps로 제한
        if (now - lastStateUpdate > STATE_UPDATE_INTERVAL) {
          lastStateUpdate = now;
          setNodeStates(prev => {
            const newNodes = prev.map(node => {
              const body = bodies[node.id];
              if (!body) return node;
              
              // 위치 변화가 미미하면 업데이트 생략
              const dx = Math.abs(body.position.x - node.x);
              const dy = Math.abs(body.position.y - node.y);
              if (dx < 0.5 && dy < 0.5) return node;
              
              return { ...node, x: body.position.x, y: body.position.y };
            });
            
            // 실제로 변경된 노드가 있는지 확인
            const hasChanges = newNodes.some((node, i) => 
              node.x !== prev[i].x || node.y !== prev[i].y
            );
            
            return hasChanges ? newNodes : prev;
          });
        }
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };
    
    animationFrameRef.current = requestAnimationFrame(update);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (world && engine) {
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
      }
      if (bodies) Object.keys(bodies).forEach(id => delete bodies[id]);
      if (constraints) constraints.length = 0;
      engineRef.current = null;
      bodiesRef.current = {};
      constraintsRef.current = [];
    };
  }, [nodes, edges]);
  
  // 렌더링 최적화 - 필요할 때만 렌더링
  useEffect(() => {
    let animationId: number;
    let needsRender = true;
    
    const scheduleRender = () => {
      if (needsRender) {
        needsRender = false;
        render();
      }
      animationId = requestAnimationFrame(scheduleRender);
    };
    
    // 상태 변경 시 렌더링 필요 표시
    const markNeedsRender = () => {
      needsRender = true;
    };
    
    // 초기 렌더링
    scheduleRender();
    
    // 뷰포트 변경 감지
    const checkViewport = () => markNeedsRender();
    const checkNodes = () => markNeedsRender();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  // 뷰포트나 노드 상태 변경 시 재렌더링 트리거
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      render();
    }, 16); // 60fps 제한
    
    return () => clearTimeout(timeoutId);
  }, [viewport, nodeStates, hoveredNodeId, draggingId]);
  
  // 리사이즈 핸들러
  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resizeCanvas]);
  
  // 노드 초기화 함수
  const handleResetNodes = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    
    const startNodes = nodeStates.map(n => ({ ...n }));
    const endNodes = initialNodeStatesRef.current;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      
      const newNodes = startNodes.map((node, i) => {
        const end = endNodes[i];
        return {
          ...node,
          x: lerp(node.x, end.x, t),
          y: lerp(node.y, end.y, t),
        };
      });
      
      setNodeStates(newNodes);
      
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
    };
    
    requestAnimationFrame(animate);
  }, [nodeStates]);
  
  // 전역 마우스업 이벤트
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (dragMode === DRAG_NODE && draggingId) {
        const body = bodiesRef.current[draggingId];
        if (body) {
          Matter.Body.setStatic(body, false);
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }
      }
      setDragMode(DRAG_NONE);
      setDraggingId(null);
      setIsPanning(false);
      setDragOffset({ x: 0, y: 0 });
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [dragMode, draggingId]);
  
  // viewport 상태가 바뀔 때 ref도 동기화
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);
  
  return (
    <GraphContainer ref={containerRef}>
      <ResetButton
        onClick={handleResetNodes}
        aria-label="노드 위치 초기화"
        tabIndex={0}
      >
        노드 초기화
      </ResetButton>
      <StyledCanvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseLeave}
        onContextMenu={handleContextMenu}
      />
      {dropdown.open && (() => {
        const node = nodeStates.find(n => n.id === dropdown.nodeId);
        if (!node) return null;
        
        // 현재 사용자가 작성한 히스토리인지 확인
        const canEdit = node.currentUserId && node.historyCreatorId && node.currentUserId === node.historyCreatorId;
        
        const dropdownOptions: DropdownOption[] = [
          { label: '생성하기', value: 'create' },
          { label: '자세히 보기', value: 'detail' },
          ...(canEdit ? [{ label: '수정하기', value: 'edit' }] : []),
          { label: 'PP 요청', value: 'pp' },
        ];
        
        return (
          <Dropdown
            isOpen={dropdown.open}
            options={dropdownOptions}
            position={{ x: dropdown.x, y: dropdown.y }}
            onSelect={handleDropdownSelect}
            onClose={handleDropdownClose}
          />
        );
      })()}
    </GraphContainer>
  );
};

export default CanvasRepoGraph; 