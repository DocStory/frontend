import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../common/SideBar';
import RepoHeader from '../layout/RepoHeader';
import RepositoryTile from '../layout/RepositoryTitle';
import EditRepositoryModal from '../common/EditRepositoryModal';
import { getRepositoryDetail, updateRepository, RepositoryDetail, UpdateRepositoryRequest } from '../../api/repository';
import { useUser } from '../../contexts/UserContext';
import { useToastContext } from '../../contexts/ToastContext';
import pencilIcon from '../../assets/pencilIcon.svg';

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

const TitleSection = styled.div`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 24px 58px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 26px;
  color: #292929;
  margin: 0;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const Subtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.62);
  margin: 0;
  letter-spacing: 0.94%;
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
  const { userInfo } = useUser(); // 현재 로그인한 사용자 정보
  const toast = useToastContext(); // 토스트 컨텍스트
  const [repositoryDetail, setRepositoryDetail] = useState<RepositoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (name: string, description: string) => {
    if (!repositoryId || !repositoryDetail) return;

    try {
      setIsUpdating(true);
      
      const updateData: UpdateRepositoryRequest = {
        name,
        description,
      };

      const response = await updateRepository(repositoryId, updateData);
      
      if (response.code === 100) {
        // 성공 시 레포지토리 정보 업데이트
        setRepositoryDetail(prev => prev ? {
          ...prev,
          name: response.data.name,
          description: response.data.description,
        } : null);
        
        setIsEditModalOpen(false);
        toast.success('레포지토리가 성공적으로 수정되었습니다.');
      } else {
        toast.error(`수정 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('레포지토리 수정 실패:', error);
      toast.error('레포지토리 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 현재 사용자가 어드민(레포지토리 소유자)인지 확인
  const isAdmin = repositoryDetail && userInfo
    ? repositoryDetail.owner.email === userInfo.email
    : false;

  // 디버깅용 로그
  useEffect(() => {
    if (repositoryDetail && userInfo) {
      console.log('Repository Owner:', repositoryDetail.owner.email);
      console.log('Current User:', userInfo.email);
      console.log('Is Admin:', isAdmin);
    }
  }, [repositoryDetail, userInfo, isAdmin]);

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
          <TitleSection>
            <TitleContainer>
              <Title>오류 발생</Title>
            </TitleContainer>
            <Subtitle>{error || '레포지토리 정보를 찾을 수 없습니다.'}</Subtitle>
          </TitleSection>
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
        <TitleSection>
          <TitleContainer>
            <Title>{repositoryDetail.name}</Title>
            {isAdmin && (
              <EditButton 
                onClick={handleEditClick}
                aria-label="레포지토리 수정"
                title="레포지토리 수정"
              >
                <img src={pencilIcon} alt="수정" />
              </EditButton>
            )}
          </TitleContainer>
          <Subtitle>{repositoryDetail.description || '설명이 없습니다.'}</Subtitle>
        </TitleSection>
        <ContentContainer>
          {/* 여기에 커밋 목록이 들어갈 예정입니다 - 팀원이 구현 */}
          커밋 목록 영역
          <br />
          (팀원이 구현할 예정)
        </ContentContainer>
      </MainContent>

      <EditRepositoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialName={repositoryDetail.name}
        initialDescription={repositoryDetail.description || ''}
        loading={isUpdating}
      />
    </PageContainer>
  );
};

export default RepositoryHistoryPage; 