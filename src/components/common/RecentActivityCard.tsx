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
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  border: 3px solid ${({ theme }) => theme.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.cardBackground};
  margin-top: -15px;
  transition: background-color 0.3s ease;
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
        backgroundColor="transparent"
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
