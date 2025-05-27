import React, { useState } from "react";
import styled from 'styled-components';
import SideBar from '../common/SideBar';
import RepoHeader from '../layout/RepoHeader';
import RepositoryTile from '../layout/RepositoryTitle';
import PhysicsRepoGraph from '../common/PhysicsRepoGraph';
import TeamInviteModal from '../layout/TeamInviteModal';

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const GraphContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

// 테스트용 데이터
const testNodes = [
  {
    id: '1',
    userName: '강욱이',
    title: '프로젝트 생성',
    description: '프로젝트 초기 설정 및 기본 구조 구성',
    timeAgo: '2일 전',
    isMain: true,
    x: 100,
    y: 100,
  },
  {
    id: '2',
    userName: '이강욱',
    title: '프로젝트 기획서 작성',
    description: '기본 컴포넌트 구현 및 스타일링',
    timeAgo: '1일 전',
    isMain: true,
    x: 500,
    y: 200,
  },
  {
    id: '3',
    userName: '서영진',
    title: '기획서 오타 수정',
    description: '문서 오타 및 오류 수정',
    timeAgo: '3시간 전',
    x: 300,
    y: 400,
  },
  {
    id: '4',
    userName: '이강욱',
    title: '기획서 문구 수정',
    description: '프로젝트 초기 생성 파일에서 필요한 부분과 수정, 추가 해야 할 부분들을 추가했습니다.',
    timeAgo: '10분 전',
    isMain: true,
    x: 700,
    y: 300,
  },
];

// 엣지 데이터
const testEdges = [
  { source: '1', target: '2' },
  { source: '2', target: '3' },
  { source: '3', target: '4' },
];

const RepositoryHistoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      <SideBar activeMenu="저장소" />
      <MainContent>
        <RepoHeader
          hasNewNotification={true}
          onTeamIconClick={() => setIsModalOpen(true)}
        />
        <RepositoryTile 
          title="캡스톤 디자인" 
          subtitle="2025 상반기 프로젝트" 
        />
        <GraphContainer>
          <PhysicsRepoGraph nodes={testNodes} edges={testEdges} />
        </GraphContainer>
      </MainContent>

      <TeamInviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvite={(email) => {
          console.log('Invite requested for', email);
        }}
      />
    </PageContainer>
  );
};

export default RepositoryHistoryPage; 