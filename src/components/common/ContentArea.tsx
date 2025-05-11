import React from 'react';
import styled from 'styled-components';

interface ContentProps {
  title: string;
  content: string;
  isEditing?: boolean;
  isRecentActivity?: boolean;
}

const ContentContainer = styled.div<{ isEditing?: boolean }>`
  padding: 24px 33px;
  background: ${({ isEditing }) => (isEditing ? '#ffffff' : '#F9FBFD')};
`;

const ContentTitle = styled.h3<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${props => props.isRecentActivity ? '20px' : '26px'};
  line-height: 1.2;
  color: #292929;
  margin: 0 0 16px 0;
`;

const ContentText = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 18px;
  line-height: 1.67em;
  letter-spacing: -0.007em;
  color: #6d6d6d;
  margin: 0;
`;

const ContentArea: React.FC<ContentProps> = ({
  title,
  content,
  isEditing,
  isRecentActivity = false,
}) => {
  return (
    <ContentContainer isEditing={isEditing}>
      <ContentTitle isRecentActivity={isRecentActivity}>{title}</ContentTitle>
      <ContentText>{content}</ContentText>
    </ContentContainer>
  );
};

export default ContentArea;