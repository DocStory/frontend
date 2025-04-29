import React from 'react';
import styled from 'styled-components';
import PhysicsRepoGraph from '../common/PhysicsRepoGraph';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 테스트용 데이터
const testNodes = [
  {
    id: '1',
    userName: '강욱이',
    title: '초기 설정',
    description: '프로젝트 초기 설정 및 기본 구조 구성',
    timeAgo: '2일 전',
    isMain: true,
    x: 100,
    y: 100,
  },
  {
    id: '2',
    userName: '강욱이',
    title: '컴포넌트 구현',
    description: '기본 컴포넌트 구현 및 스타일링',
    timeAgo: '1일 전',
    isMain: true,
    x: 500,
    y: 200,
  },
  {
    id: '3',
    userName: '강욱이',
    title: '그래프 연결',
    description: 'Matter.js를 이용한 그래프 구현',
    timeAgo: '3시간 전',
    x: 300,
    y: 400,
  },
  {
    id: '4',
    userName: '강욱이',
    title: '물리 엔진 적용',
    description: '노드 간 충돌 방지 및 자연스러운 움직임',
    timeAgo: '1시간 전',
    isMain: true,
    x: 700,
    y: 300,
  },
  {
    id: '5',
    userName: '강욱이',
    title: '줌/패닝 구현',
    description: '그래프 확대/축소 및 이동 기능',
    timeAgo: '30분 전',
    x: 500,
    y: 500,
  },
];

// 엣지 데이터
const testEdges = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '2', target: '4' },
  { source: '4', target: '5' },
];

const PhysicsGraphTestPage: React.FC = () => {
  return (
    <PageContainer>
      <PhysicsRepoGraph nodes={testNodes} edges={testEdges} />
    </PageContainer>
  );
};

export default PhysicsGraphTestPage; 