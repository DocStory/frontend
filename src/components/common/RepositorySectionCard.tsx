import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
import { useRepositories } from '../../contexts/RepositoryContext';
import api from '../../api/axios';
import repoIcon from '../../assets/repoIcon.svg';

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 0 auto;
  padding: 0 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  grid-column: 1 / -1;
`;

const EmptyIcon = styled.img`
  width: 80px;
  height: 80px;
  opacity: 0.3;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 20px;
  color: #666;
  margin: 0 0 12px 0;
`;

const EmptyDescription = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: #999;
  margin: 0 0 32px 0;
  line-height: 1.5;
  max-width: 400px;
`;

const CreateButton = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: #4285f4;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3367d6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface Repository {
  id: string;
  name: string;
  description: string;
  ownerNickname: string;
  myRole: string;
  isFavorite: boolean;
}

interface ApiResponse {
  code: number;
  message: string;
  data: Repository;
}

const RepositoryCardGrid: React.FC = () => {
  const { repositories: initialRepositories, loading, error, fetchRepositories } = useRepositories();
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (initialRepositories) {
      setRepositories(initialRepositories);
    }
  }, [initialRepositories]);

  // 컴포넌트 마운트 시와 포커스를 받을 때 목록 새로고침
  useEffect(() => {
    fetchRepositories();

    const handleFocus = () => {
      fetchRepositories();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchRepositories]);

  const handleFavoriteClick = async (repoId: string, isFavorite: boolean) => {
    try {
      // 낙관적 업데이트
      setRepositories(prev => 
        prev.map(repo => 
          repo.id === repoId ? { ...repo, isFavorite } : repo
        )
      );

      if (isFavorite) {
        // 즐겨찾기 추가
        const response = await api.post<ApiResponse>(`/api/repositories/${repoId}/favorite`);
        if (response.data.code !== 100) {
          throw new Error(response.data.message);
        }
      } else {
        // 즐겨찾기 삭제
        const response = await api.delete<ApiResponse>(`/api/repositories/${repoId}/favorite`);
        if (response.data.code !== 100) {
          throw new Error(response.data.message);
        }
      }

      // 성공 시 목록 새로고침
      fetchRepositories();
    } catch (error) {
      console.error('즐겨찾기 상태 변경 실패:', error);
      
      // 실패 시 원래 상태로 롤백
      setRepositories(prev => 
        prev.map(repo => 
          repo.id === repoId ? { ...repo, isFavorite: !isFavorite } : repo
        )
      );
    }
  };

  const handleCreateFirstRepository = () => {
    // 헤더의 New Repository 버튼 클릭 시뮬레이션
    const event = new CustomEvent('openNewRepositoryModal');
    window.dispatchEvent(event);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  // 빈 상태 처리
  if (repositories.length === 0) {
    return (
      <CardGrid>
        <EmptyStateContainer>
          <EmptyIcon src={repoIcon} alt="빈 저장소" />
          <EmptyTitle>아직 저장소가 없습니다</EmptyTitle>
          <EmptyDescription>
            첫 번째 저장소를 만들어 프로젝트를 시작해보세요.<br />
            문서와 파일을 체계적으로 관리할 수 있습니다.
          </EmptyDescription>
          <CreateButton onClick={handleCreateFirstRepository}>
            첫 저장소 만들기
          </CreateButton>
        </EmptyStateContainer>
      </CardGrid>
    );
  }

  return (
    <CardGrid>
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          title={repo.name}
          description={repo.description}
          fileTypes={['pdf']} // TODO: 실제 fileTypes 정보가 있으면 반영
          isFavorite={repo.isFavorite}
          onFavoriteClick={(isFavorite) => handleFavoriteClick(repo.id, isFavorite)}
        />
      ))}
    </CardGrid>
  );
};

export default RepositoryCardGrid; 