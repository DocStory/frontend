import React, { useEffect } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
import { useRepositories } from '../../contexts/RepositoryContext';

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

const RepositoryCardGrid: React.FC = () => {
  const { repositories, loading, error, fetchRepositories } = useRepositories();

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

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