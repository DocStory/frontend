import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import fileIcon from '../../assets/fileIcon.svg';
import diffIcon from '../../assets/diffIcon.svg';
import downloadIcon from '../../assets/downloadIcon.svg';

interface FileItem {
  Name: string;
  date: string;
  iconType?: 'download' | 'upload' | 'diff';
  onCompareClick?: () => void;
  onDownloadClick?: () => void;
}

interface HistoryDetailModalProps {
  userName: string;
  userProfileImage?: string;
  createdAt: string;
  title: string;
  content: string;
  files: FileItem[];
  onClose: () => void;
  canEdit?: boolean;
  onEditStart?: () => void;
  isEditing?: boolean;
  onEditSave?: () => void;
  onEditCancel?: () => void;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 520px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 18px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.shadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 32px 12px 32px;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  background-image: ${({ src }) => src ? `url(${src})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.textSecondary};
`;

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.surface};
`;

const AuthorTime = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const Time = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 2px;
`;

const HeaderDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 0 0 0 0;
`;

const TitleSection = styled.div`
  padding: 18px 32px 0 32px;
`;

const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.text};
  margin: 0 0 8px 0;
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
  margin-bottom: 12px;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContentBox = styled.div`
  padding: 24px 28px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionSubtitle = styled.div`
  font-family: 'Pretendard';
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-left: auto;
`;

const ContentDivider = styled.div`
  height: 2px;
  background: ${({ theme }) => theme.border};
  margin: 24px 0;
`;

const ContentText = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
  word-break: break-word;
`;

const ContentTextarea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 14px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const MetaInfo = styled.div`
  font-family: 'Pretendard';
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  font-family: 'Pretendard';
  font-size: 14px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const TextArea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 14px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const CreatedAt = styled.div`
  font-family: 'Pretendard';
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin: 24px 0;
`;

const FilesSection = styled.div`
  padding: 0 32px 24px 32px;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${({ theme }) => theme.surface};
  border-radius: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  gap: 8px;
`;

const FileActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 32px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
`;

const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({
  userName,
  userProfileImage,
  createdAt,
  title,
  content,
  files,
  onClose,
  canEdit = false,
  onEditStart,
  isEditing = false,
  onEditSave,
  onEditCancel,
  onTitleChange,
  onContentChange,
}) => {
  // base64 프로필 처리
  const getProfileSrc = (src?: string) => {
    if (!src) return undefined;
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `data:image/png;base64,${src}`;
  };
  const getInitial = (name: string) => name ? name[0].toUpperCase() : '?';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick} tabIndex={-1} aria-label="모달 오버레이">
      <ModalContainer>
        <HeaderSection>
          {userProfileImage ? (
            <AvatarImg src={getProfileSrc(userProfileImage)} alt={userName} />
          ) : (
            <Avatar src={undefined}>{getInitial(userName)}</Avatar>
          )}
          <AuthorTime>
            <Author>{userName}</Author>
            <Time>{createdAt}</Time>
          </AuthorTime>
        </HeaderSection>
        <HeaderDivider />
        <TitleSection>
          {isEditing ? (
            <TitleInput
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTitleChange?.(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          ) : (
            <Title>{title}</Title>
          )}
        </TitleSection>
        {isEditing ? (
          <ContentBox>
            <ContentTextarea
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onContentChange?.(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </ContentBox>
        ) : (
          <ContentBox>
            <ContentText>{content}</ContentText>
          </ContentBox>
        )}
        <ContentDivider />
        <FilesSection>
          <SectionTitle>첨부파일/변경사항</SectionTitle>
          <FileList>
            {files.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: 14 }}>첨부파일이 없습니다.</div>
            ) : files.map((file, idx) => (
              <FileItem key={idx}>
                <span>{file.Name}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>{file.date}</span>
                <FileActionButton title="비교" onClick={file.onCompareClick}>
                  <img src={diffIcon} alt="비교" style={{ width: 18, height: 18 }} />
                </FileActionButton>
                <FileActionButton title="다운로드" onClick={file.onDownloadClick}>
                  <img src={downloadIcon} alt="다운로드" style={{ width: 20, height: 20, display: 'block', verticalAlign: 'middle' }} />
                </FileActionButton>
              </FileItem>
            ))}
          </FileList>
        </FilesSection>
        <Footer>
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={onEditCancel}>취소</Button>
              <Button variant="primary" onClick={onEditSave}>저장</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={onClose}>닫기</Button>
              {canEdit && <Button variant="primary" onClick={onEditStart}>수정</Button>}
            </>
          )}
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default HistoryDetailModal; 