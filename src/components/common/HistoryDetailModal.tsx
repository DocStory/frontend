import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
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
  background: #e5e7eb;
  background-image: ${({ src }) => src ? `url(${src})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  color: #64748b;
`;

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #e5e7eb;
`;

const AuthorTime = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  color: #1e293b;
`;

const Time = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #94a3b8;
  margin-top: 2px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e7eb;
  margin: 0 0 0 0;
`;

const TitleSection = styled.div`
  padding: 18px 32px 0 32px;
`;

const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 22px;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const TitleInput = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #4078FF;
  }
`;

const ContentCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  margin: 12px 32px 0 32px;
  padding: 20px 18px;
  font-family: 'Pretendard';
  font-size: 16px;
  color: #334155;
  min-height: 80px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;

const ContentTextarea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  transition: border-color 0.2s ease;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    outline: none;
    border-color: #4078FF;
  }
`;

const FilesSection = styled.div`
  padding: 24px 32px 0 32px;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  color: #64748b;
  margin: 0 0 12px 0;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 15px;
  color: #334155;
`;

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
`;

const FileActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px 8px;
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: background 0.15s;
  &:hover {
    background: #e5e7eb;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 28px 32px 32px 32px;
  background: #fff;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  padding: 10px 22px;
  border: none;
  cursor: pointer;
  background: ${({ variant }) => variant === 'primary' ? '#4078FF' : '#f1f5f9'};
  color: ${({ variant }) => variant === 'primary' ? '#fff' : '#334155'};
  transition: background 0.2s;
  &:hover {
    background: ${({ variant }) => variant === 'primary' ? '#2563eb' : '#e2e8f0'};
  }
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
        <Divider />
        <TitleSection>
          {isEditing ? (
            <TitleInput
              value={title}
              onChange={e => onTitleChange?.(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          ) : (
            <Title>{title}</Title>
          )}
        </TitleSection>
        {isEditing ? (
          <ContentCard>
            <ContentTextarea
              value={content}
              onChange={e => onContentChange?.(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </ContentCard>
        ) : (
          <ContentCard>{content}</ContentCard>
        )}
        <Divider />
        <FilesSection>
          <SectionTitle>첨부파일/변경사항</SectionTitle>
          <FileList>
            {files.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: 14 }}>첨부파일이 없습니다.</div>
            ) : files.map((file, idx) => (
              <FileRow key={idx}>
                <FileIcon src={fileIcon} alt="file" />
                <span>{file.Name}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>{file.date}</span>
                <FileActionButton title="비교" onClick={file.onCompareClick}>
                  <img src={diffIcon} alt="비교" style={{ width: 18, height: 18 }} />
                </FileActionButton>
                <FileActionButton title="다운로드" onClick={file.onDownloadClick}>
                  <img src={downloadIcon} alt="다운로드" style={{ width: 20, height: 20, display: 'block', verticalAlign: 'middle' }} />
                </FileActionButton>
              </FileRow>
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