import React from 'react';
import styled from 'styled-components';

interface ContentProps {
  title: string;
  content: string;
  isEditing?: boolean;
  isModifying?: boolean;
  isRecentActivity?: boolean;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
}

const ContentContainer = styled.div<{ isEditing?: boolean }>`
  padding: 24px 33px;
  background: ${({ isEditing, theme }) => (isEditing ? theme.cardBackground : theme.surface)};
  transition: background-color 0.3s ease;
`;

const EditingContainer = styled.div`
  padding: 24px 33px;
  background: #ffffff;
`;

const ContentTitle = styled.h3<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${props => props.isRecentActivity ? '20px' : '26px'};
  line-height: 1.2;
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
`;

const ContentText = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 18px;
  line-height: 1.67em;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const TitleInput = styled.input`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 26px;
  line-height: 1.2;
  color: #292929;
  margin: 0 0 16px 0;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ContentTextarea = styled.textarea`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 18px;
  line-height: 1.67em;
  letter-spacing: -0.007em;
  color: #6d6d6d;
  margin: 0;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;
`;

const ContentArea: React.FC<ContentProps> = ({
  title,
  content,
  isEditing,
  isModifying,
  isRecentActivity = false,
  onTitleChange,
  onContentChange,
}) => {
  if (isModifying) {
    return (
      <EditingContainer>
        <TitleInput
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <ContentTextarea
          value={content}
          onChange={(e) => onContentChange?.(e.target.value)}
          placeholder="내용을 입력하세요"
        />
      </EditingContainer>
    );
  }

  const Container = isEditing ? EditingContainer : ContentContainer;

  return (
    <Container>
      <ContentTitle isRecentActivity={isRecentActivity}>{title}</ContentTitle>
      <ContentText>{content}</ContentText>
    </Container>
  );
};

export default ContentArea;