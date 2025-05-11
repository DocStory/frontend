import React from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';

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

export interface Favorite {
  title: string;
  description: string;
  fileTypes: FileType[];
}

interface FavoriteCardGridProps {
  favorites?: Favorite[];
}

const defaultFavorites: Favorite[] = [
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
    title: 'AI 프로젝트',
    description: 'AI 기반 문서 자동화 저장소',
    fileTypes: ['hwp', 'docx', 'pdf'],
  },
  {
    title: '팀 위키',
    description: '팀원들과 함께 관리하는 위키 저장소',
    fileTypes: ['docx', 'pdf'],
  },
];

const FavoriteSectionCard: React.FC<FavoriteCardGridProps> = ({ favorites = defaultFavorites }) => (
  <CardGrid>
    {favorites.map((favorite, idx) => (
      <RepositoryCard
        key={idx}
        title={favorite.title}
        description={favorite.description}
        fileTypes={favorite.fileTypes}
      />
    ))}
  </CardGrid>
);

export default FavoriteSectionCard; 