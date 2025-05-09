import React, { useCallback } from 'react';
import styled from 'styled-components';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  NodeProps,
  Position,
  Handle,
  EdgeProps,
  getSmoothStepPath,
} from 'reactflow';
import 'reactflow/dist/style.css';
import HistoryCard from '../history/HistoryCard';

const GraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #f7faff;
  position: relative;
  overflow: visible;
`;

// 노드 데이터 타입 정의 (HistoryCard용)
export type HistoryNodeData = {
  isMain?: boolean;
  userName: string;
  userAvatar?: string;
  title: string;
  description?: string;
  timeAgo?: string;
};

// 커스텀 엣지 컴포넌트
const CustomEdge: React.FC<EdgeProps> = ({ sourceX, sourceY, targetX, targetY, data, id }) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Bottom,
    targetX,
    targetY,
    targetPosition: Position.Top,
    borderRadius: 0,
  });
  const isMain = data?.isMain;
  const filterId = `mainEdgeShadow-${id}`;
  return (
    <g>
      {isMain && (
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6C9EFF" floodOpacity="0.3" />
          </filter>
        </defs>
      )}
      <path
        d={edgePath}
        fill="none"
        stroke={isMain ? '#6C9EFF' : '#C0C0C0'}
        strokeWidth={isMain ? 3 : 2}
        filter={isMain ? `url(#${filterId})` : undefined}
      />
    </g>
  );
};

const edgeTypes = {
  custom: CustomEdge,
};

// 노드 렌더러
const HistoryNode = ({ data, selected, className, style }: any) => (
  <div
    tabIndex={0}
    aria-label={`히스토리 노드: ${data.title}`}
    className={className}
    style={{
      ...style,
      willChange: 'transform',
    }}
    data-selected={selected}
  >
    {/* target handle (위쪽) */}
    <Handle type="target" position={Position.Top} />
    <HistoryCard {...data} />
    {/* source handle (아래쪽) */}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = {
  history: HistoryNode,
};

// 샘플 노드/엣지 데이터 
const initialNodes: Node<HistoryNodeData>[] = [
  {
    id: '1',
    type: 'history',
    position: { x: 500, y: 100 },
    data: {
      isMain: true,
      userName: '홍길동',
      title: '최초 버전',
      description: '최초 업로드된 문서',
      timeAgo: '3일 전',
    },
  },
  {
    id: '2',
    type: 'history',
    position: { x: 300, y: 300 },
    data: {
      isMain: true,
      userName: '김철수',
      title: '2차 메인',
      description: '메인 브랜치에서 수정',
      timeAgo: '2일 전',
    },
  },
  {
    id: '3',
    type: 'history',
    position: { x: 700, y: 300 },
    data: {
      userName: '이영희',
      title: '2차 분기',
      description: '서브 브랜치에서 수정',
      timeAgo: '2일 전',
    },
  },
  {
    id: '4',
    type: 'history',
    position: { x: 200, y: 500 },
    data: {
      isMain: true,
      userName: '박민수',
      title: '3차 메인',
      description: '메인 브랜치 최종',
      timeAgo: '1일 전',
    },
  },
  {
    id: '5',
    type: 'history',
    position: { x: 800, y: 500 },
    data: {
      userName: '최지훈',
      title: '3차 분기',
      description: '서브 브랜치 최종',
      timeAgo: '1일 전',
    },
  },
];

const initialEdges: Edge[] = [
  // main branch
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom',
    data: { isMain: true },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'custom',
    data: { isMain: true },
  },
  // sub branch
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'custom',
    data: { isMain: false },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'custom',
    data: { isMain: false },
  },
];

const RepoTreeGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Edge | Connection) => {
    // source가 1(메인)이면 강조, 아니면 회색
    const isMainEdge = connection.source === '1';
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          animated: isMainEdge,
          style: isMainEdge
            ? { stroke: '#6C9EFF', strokeWidth: 3 }
            : { stroke: '#C0C0C0', strokeWidth: 2 },
        },
        eds
      )
    );
  }, [setEdges]);

  return (
    <GraphWrapper>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#e3edff" gap={24} />
        </ReactFlow>
      </ReactFlowProvider>
    </GraphWrapper>
  );
};

export default RepoTreeGraph; 