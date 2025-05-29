import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProfileList from '../common/ProfileList.tsx';
import ModalContent from '../common/ContentArea.tsx';
import ModalList from '../common/ModalList.tsx';
import ModalComment from '../common/ModalComment.tsx';
import ModalFooter from '../common/ModalFooter.tsx';
import ModalHeader from '../common/ModalHeader';
import Button from '../common/Button';

interface ModalItem {
  Name: string;
  date: string;
  iconType?: 'download' | 'upload' | 'diff';
}

interface Comment {
  author: string;
  content: string;
}

interface ModalProps {
  headerTitle: string;
  headerTime: string;
  modalTitle: string;
  isEditing?: boolean;
  canEdit?: boolean;
  contentTitle: string;
  content: string;
  items: ModalItem[];
  comments: Comment[];
  onReject: () => void;
  onAccept: () => void;
  role?: string;
  onClose?: () => void;
  userProfileImage?: string;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onEditSave?: () => void;
  isCreating?: boolean;
  onCreateSave?: () => void;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onFileSelect?: (file: File) => void;
  onFileRemove?: (file: File) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 15px;
  border: 3px solid #CBD5E1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #f1f5f9;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 26px;
  line-height: 0.85em;
  letter-spacing: -0.007em;
  color: #1e293b;
  margin: 0;
  padding: 46px 33px 22px 33px;
  background: #f1f5f9;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  background: white;
`;

const Modal: React.FC<ModalProps> = ({
  headerTitle,
  headerTime,
  modalTitle,
  isEditing = false,
  canEdit = false,
  contentTitle,
  content,
  items,
  comments,
  onReject,
  onAccept,
  role,
  onClose,
  userProfileImage,
  onEditStart,
  onEditCancel,
  onEditSave,
  isCreating,
  onCreateSave,
  onTitleChange,
  onContentChange,
  onFileSelect,
  onFileRemove,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick} tabIndex={-1} aria-label="모달 오버레이">
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={modalTitle} onClose={onClose} />
        
        <ProfileList
          title={headerTitle}
          time={headerTime}
          isEditing={isEditing}
          canEdit={canEdit}
          userProfileImage={userProfileImage}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          onEditSave={onEditSave}
        />
        
        <ContentWrapper>
          <ModalContent
            title={contentTitle}
            content={content}
            isEditing={isEditing}
            isModifying={isEditing}
            onTitleChange={onTitleChange}
            onContentChange={onContentChange}
          />
          
          <SectionTitle>{isCreating ? '파일 업로드' : '변경사항'}</SectionTitle>
          <ModalList 
            items={items} 
            onFileSelect={onFileSelect}
            onFileRemove={onFileRemove}
            isCreating={isCreating}
          />
        </ContentWrapper>
        
        <ButtonRow>
          <Button
            variant="secondary"
            size="medium"
            onClick={onEditCancel || onClose}
          >
            {isEditing ? '취소' : '닫기'}
          </Button>
          {isEditing && onEditSave && (
            <Button
              variant="primary"
              size="medium"
              onClick={onEditSave}
            >
              저장
            </Button>
          )}
          {isCreating && onCreateSave && (
            <Button
              variant="primary"
              size="medium"
              onClick={onCreateSave}
            >
              생성하기
            </Button>
          )}
        </ButtonRow>
      </Container>
    </Overlay>
  );
};

export default Modal;
