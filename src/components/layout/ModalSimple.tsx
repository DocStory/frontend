import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProfileList from '../common/ProfileList.tsx';
import ModalContent from '../common/ContentArea.tsx';
import ModalList from '../common/ModalList.tsx';
import ModalHeader from '../common/ModalHeader';
import Button from '../common/Button';

interface ModalItem {
  Name: string;
  date: string;
  iconType?: 'download' | 'upload' | 'diff';
}

interface ModalSimpleProps {
  headerTitle: string;
  headerTime: string;
  modalTitle: string;
  isEditing?: boolean;
  isModifying?: boolean;
  canEdit?: boolean;
  contentTitle: string;
  content: string;
  items: ModalItem[];
  onClose?: () => void;
  userProfileImage?: string;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onEditSave?: () => void;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onFileSelect?: (files: FileList | null) => void;
  onFileRemove?: (index: number) => void;
  isCreating?: boolean;
  isProposal?: boolean;
  onCreateSave?: () => void;
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
  max-width: 900px;
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

const ModalSimple: React.FC<ModalSimpleProps> = ({
  headerTitle,
  headerTime,
  modalTitle,
  isEditing = false,
  isModifying = false,
  canEdit = false,
  contentTitle,
  content,
  items,
  onClose,
  userProfileImage,
  onEditStart,
  onEditCancel,
  onEditSave,
  onTitleChange,
  onContentChange,
  onFileSelect,
  onFileRemove,
  isCreating = false,
  isProposal = false,
  onCreateSave,
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
        <ModalHeader 
          title={modalTitle} 
          onClose={onClose}
        />
        
        <ContentWrapper>
          <ModalContent
            headerTitle={headerTitle}
            headerTime={headerTime}
            contentTitle={contentTitle}
            content={content}
            isEditing={isEditing}
            isModifying={isModifying}
            onEditStart={onEditStart}
            onEditCancel={onEditCancel}
            onEditSave={onEditSave}
            onTitleChange={onTitleChange}
            onContentChange={onContentChange}
          />
          
          {!isProposal && (
            <SectionTitle>{isCreating ? '파일 업로드' : '변경사항'}</SectionTitle>
          )}
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

export default ModalSimple;
