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
  padding: 32px;
  background: ${({ isEditing, theme }) => (isEditing ? theme.cardBackground : theme.background)};
  transition: all 0.2s ease;
`;

const EditingContainer = styled.div`
  padding: 32px;
  background: ${({ theme }) => theme.cardBackground};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentTitle = styled.h3<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${props => props.isRecentActivity ? '18px' : '24px'};
  line-height: 1.3;
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
  letter-spacing: -0.007em;
`;

const ContentText = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const TitleInput = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContentTextarea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
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
    <Container isEditing={isEditing}>
      <ContentTitle isRecentActivity={isRecentActivity}>{title}</ContentTitle>
      <ContentText>{content}</ContentText>
    </Container>
  );
};

export default ContentArea;