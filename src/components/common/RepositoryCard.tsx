import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import folderIcon from '../../assets/folderIcon.svg';
import dotIcon from '../../assets/dot.svg';
import favoriteLineIcon from '../../assets/clarity_favorite-line.svg';
import favoriteSolidIcon from '../../assets/clarity_favorite-solid.svg';

export type FileType = 'hwp' | 'docx' | 'pdf';

interface RepositoryCardProps {
  id?: string;
  fileTypes: FileType[];
  title: string;
  description?: string;
  className?: string;
  isFavorite?: boolean;
  onFavoriteClick?: (isFavorite: boolean) => void;
}

const fileTypeBadgeColorMap: Record<FileType, { bg: string; text: string }> = {
  hwp: { bg: '#FFF7B2', text: '#A89B3C' },
  docx: { bg: '#D6E8FF', text: '#4A7EBB' },
  pdf: { bg: '#FFD6D6', text: '#C96A6A' },
};

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBackground};
  transition: all 0.2s ease;
  cursor: pointer;
  height: 160px;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Title = styled.h3`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
`;

const Description = styled.p`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.3s ease;
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
`;

const FileTypeBadge = styled.div<{ $fileType: FileType }>`
  display: flex;
  align-items: center;
  height: 16px;
`;

const BadgeCircle = styled.span<{ $fileType: FileType }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $fileType }) => fileTypeBadgeColorMap[$fileType].bg};
  display: inline-block;
  margin-right: 4px;
`;

const BadgeText = styled.span<{ $fileType: FileType }>`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: ${({ $fileType }) => fileTypeBadgeColorMap[$fileType].text};
  text-transform: uppercase;
  letter-spacing: -0.009em;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid #4078FF;
    outline-offset: 2px;
  }
`;

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  id,
  fileTypes,
  title,
  description,
  className = '',
  isFavorite = false,
  onFavoriteClick,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // 즐겨찾기 버튼 클릭 시에는 카드 클릭 이벤트 무시
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (id) {
      navigate(`/repository/${id}`);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(!isFavorite);
  };

  return (
    <Card 
      className={className} 
      tabIndex={0} 
      aria-label={`저장소 카드: ${title}`}
      onClick={handleCardClick}
    > 
      <IconWrapper>
        <img src={folderIcon} alt="폴더 아이콘" width={32} height={32} />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <BadgeGroup>
          {fileTypes.map((type) => (
            <FileTypeBadge $fileType={type} key={type} aria-label={`파일 형식: ${type}`}>
              <BadgeCircle $fileType={type} />
              <BadgeText $fileType={type}>{type}</BadgeText>
            </FileTypeBadge>
          ))}
        </BadgeGroup>
      </Content>
      <FavoriteButton
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        <img 
          src={isFavorite ? favoriteSolidIcon : favoriteLineIcon} 
          alt={isFavorite ? "즐겨찾기됨" : "즐겨찾기"} 
          width={20} 
          height={20} 
        />
      </FavoriteButton>
    </Card>
  );
};

export default RepositoryCard; 