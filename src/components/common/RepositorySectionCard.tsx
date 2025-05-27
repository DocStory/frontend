import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
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

interface ApiRepository {
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
  data: ApiRepository[];
}

const RepositoryCardGrid: React.FC = () => {
  const [repositories, setRepositories] = useState<ApiRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ApiResponse>('/api/repositories/my');
        setRepositories(response.data.data);
      } catch (err: any) {
        console.error('내 레포지토리 목록 조회 실패:', err);
        setError(err.response?.data?.message || err.message || '레포지토리 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchRepositories();
  }, []);

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
        />
      ))}
    </CardGrid>
  );
};

export default RepositoryCardGrid; 