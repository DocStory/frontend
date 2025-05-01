import React from 'react';
import styled from 'styled-components';
import ModalHeader from '../common/ModalHeader.tsx';
import ModalContent from '../common/ModalContent.tsx';
import ModalList from '../common/ModalList.tsx';
import ModalComment from '../common/ModalComment.tsx';
import ModalFooter from '../common/ModalFooter.tsx';

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
  isEditing?: boolean;
  canEdit?: boolean;
  contentTitle: string;
  content: string;
  items: ModalItem[];
  comments: Comment[];
  onReject: () => void;
  onAccept: () => void;
  role?: string;
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

const Modal: React.FC<ModalProps> = ({
  headerTitle,
  headerTime,
  isEditing = false,
  canEdit = false,
  contentTitle,
  content,
  items,
  comments,
  onReject,
  onAccept,
  role,
}) => {
  return (
    <ModalContainer>
      <ModalHeader
        title={headerTitle}
        time={headerTime}
        isEditing={isEditing}
        canEdit={canEdit}
        backgroundColor="#f1f5f9"
      />
      <ContentWrapper>
        <ModalContent
          title={contentTitle}
          content={content}
          isEditing={isEditing}
        />
        <SectionTitle>변경사항</SectionTitle>
        <ModalList items={items} />
        {!isEditing && (
          <ModalComment comments={comments} isEditing={isEditing} />
        )}
      </ContentWrapper>
      <ModalFooter
        onReject={onReject}
        onAccept={onAccept}
        role={role}
        isEditing={isEditing}
      />
    </ModalContainer>
  );
};

export default Modal;
