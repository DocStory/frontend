import React from 'react';
import styled from 'styled-components';
import ModalHeader from './ModalHeader.tsx';
import ModalContent from './ModalContent.tsx';

interface RecentActivityCardProps {
  headerTitle: string;
  headerTime: string;
  isEditing?: boolean;
  canEdit?: boolean;
  contentTitle: string;
  content: string;
}

const ModalContainer = styled.div`
  width: 1016px;
  min-height: 200px;
  background: #ffffff;
  border-radius: 15px;
  border: 3px solid #cbd5e1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  background: #ffffff;
`;

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  headerTitle,
  headerTime,
  isEditing = false,
  canEdit = false,
  contentTitle,
  content,
}) => {
  return (
    <ModalContainer>
      <ModalHeader
        title={headerTitle}
        time={headerTime}
        isEditing={isEditing}
        canEdit={canEdit}
        backgroundColor="#ffffff"
      />
      <ContentWrapper>
        <ModalContent
          title={contentTitle}
          content={content}
          isEditing={isEditing}
        />
      </ContentWrapper>
    </ModalContainer>
  );
};

export default RecentActivityCard;
