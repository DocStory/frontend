import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
import { useRepositories } from '../../contexts/RepositoryContext';
import api from '../../api/axios';

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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

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