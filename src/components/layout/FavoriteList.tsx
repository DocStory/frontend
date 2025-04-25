import React from 'react';
import styled from 'styled-components';

interface FavoriteItemProps {
  title: string;
  description: string;
  language: string;
  isPublic: boolean;
}

interface FavoriteListProps {
  favorites?: FavoriteItemProps[];
}

const FavoriteItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #FFFFFF;
  border: 1px solid #F0F0F0;
  border-radius: 15px;
  margin-bottom: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7C7C7C;
`;

const Title = styled.h3`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: #6C9EFF;
  margin: 0;
`;

const Description = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 12px;
  color: #7C7C7C;
  margin: 0;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LanguageTag = styled.span`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 11px;
  color: #7C7C7C;
  letter-spacing: -0.01em;
`;

const PublicBadge = styled.div`
  padding: 4px 8px;
  background-color: #FFFFFF;
  border: 1px solid #F0F0F0;
  border-radius: 6px;
`;

const PublicText = styled.span`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 11px;
  color: #7C7C7C;
`;

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  title,
  description,
  language,
  isPublic,
}) => {
  return (
    <FavoriteItemContainer>
      <TitleContainer>
        <Icon>📁</Icon>
        <Title>{title}</Title>
      </TitleContainer>
      <Description>{description}</Description>
      <FooterContainer>
        <LanguageTag>{language}</LanguageTag>
        {isPublic && (
          <PublicBadge>
            <PublicText>Public</PublicText>
          </PublicBadge>
        )}
      </FooterContainer>
    </FavoriteItemContainer>
  );
};

const FavoriteList: React.FC<FavoriteListProps> = ({
  favorites = [
    {
      title: '저장소 제목',
      description: '부제목 설명글',
      language: 'JavaScript',
      isPublic: true,
    },
    {
      title: '저장소 제목',
      description: '부제목 설명글',
      language: 'JavaScript',
      isPublic: true,
    },
  ]
}) => {
  return (
    <div>
      {favorites.map((favorite, index) => (
        <FavoriteItem key={index} {...favorite} />
      ))}
    </div>
  );
};

export default FavoriteList; 