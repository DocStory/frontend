import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../common/SideBar';
import RepoHeader from '../layout/RepoHeader';
import RepositoryTile from '../layout/RepositoryTitle';
import { getRepositoryDetail, RepositoryDetail } from '../../api/repository';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f7faff;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard';
  font-size: 18px;
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Pretendard';
  font-size: 18px;
  color: #666;
`;

const RepositoryHistoryPage: React.FC = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const navigate = useNavigate();
  const [repositoryDetail, setRepositoryDetail] = useState<RepositoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMenuClick = (label: string) => {
    switch (label) {
      case '홈':
        navigate('/home');
        break;
      case '저장소':
        navigate('/repository');
        break;
      case '도움말':
        // 도움말 페이지로 이동
        break;
      case '설정':
        // 설정 페이지로 이동 (모달은 SideBar에서 처리)
        break;
    }
  };

  const fetchRepositoryDetail = async () => {
    if (!repositoryId) {
      setError('레포지토리 ID가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const detail = await getRepositoryDetail(repositoryId);
      setRepositoryDetail(detail);
    } catch (err) {
      console.error('레포지토리 상세 정보 조회 실패:', err);
      setError('레포지토리 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositoryDetail();
  }, [repositoryId]);

  if (loading) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <LoadingContainer>
          레포지토리 정보를 불러오는 중...
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !repositoryDetail) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <MainContent>
          <RepoHeader hasNewNotification={true} />
          <RepositoryTile 
            title="오류 발생" 
            subtitle={error || '레포지토리 정보를 찾을 수 없습니다.'} 
          />
          <ContentContainer>
            레포지토리를 불러올 수 없습니다.
          </ContentContainer>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
      <MainContent>
        <RepoHeader hasNewNotification={true} />
        <RepositoryTile 
          title={repositoryDetail.name} 
          subtitle={repositoryDetail.description || '설명이 없습니다.'} 
        />
        <ContentContainer>
          {/* 여기에 커밋 목록이 들어갈 예정입니다 - 팀원이 구현 */}
          커밋 목록 영역
          <br />
          (팀원이 구현할 예정)
        </ContentContainer>
      </MainContent>
    </PageContainer>
  );
};

export default RepositoryHistoryPage; 