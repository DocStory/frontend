import React from 'react';
import styled from 'styled-components';
import ProfileList from './ProfileList.tsx';
import ModalContent from './ContentArea.tsx';

interface RecentActivityCardProps {
  headerTitle: string;
  headerTime: string;
  isEditing?: boolean;
  canEdit?: boolean;
  contentTitle: string;
  content: string;
}

const ModalContainer = styled.div`
  width: 100%;
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
  margin-top: -15px;
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
      <ProfileList
        title={headerTitle}
        time={headerTime}
        isEditing={isEditing}
        canEdit={canEdit}
        backgroundColor="#ffffff"
        isRecentActivity={true}
      />
      <ContentWrapper>
        <ModalContent
          title={contentTitle}
          content={content}
          isEditing={true}
          isRecentActivity={true}
        />
      </ContentWrapper>
    </ModalContainer>
  );
};

export default RecentActivityCard;
