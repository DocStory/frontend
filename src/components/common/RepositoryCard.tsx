import React from 'react';
import styled from 'styled-components';
import { MdFolderOpen } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';

interface RepositoryCardProps {
  title: string;
  description: string;
  language: string;
  isPublic?: boolean;
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #F0F0F0;
  border-radius: 15px;
  padding: 16px 20px;
  gap: 16px;
  min-width: 320px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const FolderIconWrap = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YellowCircle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #EEDE5D;
  border: 1px solid #D4C65B;
  z-index: 0;
`;

const FolderIcon = styled(MdFolderOpen)`
  color: #7C7C7C;
  font-size: 22px;
  position: relative;
  z-index: 1;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: #6C9EFF;
`;

const Description = styled.div`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 12px;
  color: #7C7C7C;
`;

const Language = styled.div`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 11px;
  color: #7C7C7C;
  letter-spacing: -0.009em;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PublicBadge = styled.div`
  border: 1px solid #F0F0F0;
  border-radius: 6px;
  padding: 2px 10px;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 11px;
  color: #7C7C7C;
  background: #fff;
`;

const DotsIcon = styled(BsThreeDots)`
  color: #7C7C7C;
  font-size: 20px;
  cursor: pointer;
`;

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  title,
  description,
  language,
  isPublic = false,
}) => {
  return (
    <CardContainer>
      <Left>
        <FolderIconWrap>
          <YellowCircle />
          <FolderIcon />
        </FolderIconWrap>
        <Info>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Language>{language}</Language>
        </Info>
      </Left>
      <Badge>
        {isPublic && <PublicBadge>Public</PublicBadge>}
        <DotsIcon />
      </Badge>
    </CardContainer>
  );
};

export default RepositoryCard; 