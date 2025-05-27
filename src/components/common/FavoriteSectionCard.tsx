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

interface ApiFavorite {
  id: string;
  name: string;
  description: string;
  ownerNickname: string;
  myRole: string;
  isFavorite: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: ApiFavorite[];
}

const FavoriteSectionCard: React.FC = () => {
  const [favorites, setFavorites] = useState<ApiFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ApiResponse>('/api/repositories/favorites');
        setFavorites(response.data.data);
      } catch (err: any) {
        console.error('즐겨찾기 목록 조회 실패:', err);
        setError(err.response?.data?.message || err.message || '즐겨찾기 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

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
        />
      ))}
    </CardGrid>
  );
};

export default FavoriteSectionCard; 