import React from 'react';
import styled from 'styled-components';
import ProfileList from '../common/ProfileList.tsx';
import ModalContent from '../common/ContentArea.tsx';
import ModalList from '../common/ModalList.tsx';
import ModalHeader from '../common/ModalHeader';

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
}

const ModalContainer = styled.div`
  width: 1016px;
  height: 740px;
  background: #ffffff;
  border-radius: 15px;
  border: 3px solid #cbd5e1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

const ModalSimple: React.FC<ModalSimpleProps> = ({
  headerTitle,
  headerTime,
  modalTitle,
  isEditing = false,
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
}) => {
  return (
    <ModalContainer>
      <ModalHeader title={modalTitle} onClose={onClose || (() => {})} backgroundColor="#f1f5f9"/>
      <ProfileList
        title={headerTitle}
        time={headerTime}
        isEditing={isEditing}
        canEdit={canEdit}
        backgroundColor="#f1f5f9"
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
    </ModalContainer>
  );
};

export default ModalSimple;
