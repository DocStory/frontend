import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
import api from '../../api/axios';

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
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
  data: Repository[];
}

interface ApiSingleResponse {
  code: number;
  message: string;
  data: Repository;
}

const FavoriteSectionCard: React.FC = () => {
  const [favorites, setFavorites] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse>('/api/repositories/favorites');
      setFavorites(response.data.data.map(repo => ({
        ...repo,
        isFavorite: true // 즐겨찾기 목록의 모든 항목은 isFavorite이 true
      })));
    } catch (err: any) {
      console.error('즐겨찾기 목록 조회 실패:', err);
      setError(err.response?.data?.message || err.message || '즐겨찾기 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteClick = async (repoId: string, isFavorite: boolean) => {
    try {
      // 낙관적 업데이트
      if (!isFavorite) {
        setFavorites(prev => prev.filter(repo => repo.id !== repoId));
      }

      // API 호출
      const response = await api.delete<ApiSingleResponse>(`/api/repositories/${repoId}/favorite`);
      if (response.data.code !== 100) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('즐겨찾기 상태 변경 실패:', error);
      // 실패 시 목록 새로고침
      fetchFavorites();
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <CardGrid>
      {favorites.map((favorite) => (
        <RepositoryCard
          key={favorite.id}
          title={favorite.name}
          description={favorite.description}
          fileTypes={['pdf']} // TODO: 실제 fileTypes 정보가 있으면 반영
          isFavorite={true}
          onFavoriteClick={(isFavorite) => handleFavoriteClick(favorite.id, isFavorite)}
        />
      ))}
    </CardGrid>
  );
};

export default FavoriteSectionCard; 