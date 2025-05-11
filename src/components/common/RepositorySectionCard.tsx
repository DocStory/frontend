import React from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';

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

export interface Repository {
  title: string;
  description: string;
  fileTypes: FileType[];
}

interface RepositoryCardGridProps {
  repositories?: Repository[];
}

const defaultRepositories: Repository[] = [
  {
    title: 'AI 프로젝트',
    description: 'AI 기반 문서 자동화 저장소',
    fileTypes: ['hwp', 'docx', 'pdf'],
  },
  {
    title: '팀 위키',
    description: '팀원들과 함께 관리하는 위키 저장소',
    fileTypes: ['docx', 'pdf'],
  },
  {
    title: '회의록',
    description: '주간 회의록 저장소',
    fileTypes: ['hwp'],
  },
  {
    title: '프로젝트 자료',
    description: '프로젝트 관련 각종 자료 모음',
    fileTypes: ['pdf', 'docx'],
  },
];

const RepositoryCardGrid: React.FC<RepositoryCardGridProps> = ({ repositories = defaultRepositories }) => (
  <CardGrid>
    {repositories.map((repo, idx) => (
      <RepositoryCard
        key={idx}
        title={repo.title}
        description={repo.description}
        fileTypes={repo.fileTypes}
      />
    ))}
  </CardGrid>
);

export default RepositoryCardGrid; 