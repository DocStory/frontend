import React from 'react';
import styled from 'styled-components';
import pencilIcon from '../../assets/pencilIcon.svg';
import saveIcon from '../../assets/saveIcon.svg';
import avatar from '../../assets/avatar.svg';
import statusIcon from '../../assets/StatusIcon.svg';

interface ProfileListProps {
  title: string;
  time: string;
  isEditing?: boolean;
  canEdit?: boolean;
  backgroundColor?: string;
  isRecentActivity?: boolean;
  userProfileImage?: string;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onEditSave?: () => void;
}

const ProfileListContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 37px 24px 16px 33px;
  background: ${({ backgroundColor, theme }) => 
    backgroundColor === 'transparent' ? 'transparent' : 
    backgroundColor || theme.cardBackground
  };
  transition: background-color 0.3s ease;
`;

const ProfileListContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${props => props.isRecentActivity ? '14px' : '22px'};
  line-height: 1em;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
  margin: 0;
  transition: color 0.3s ease;
`;

const Time = styled.span<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${props => props.isRecentActivity ? '12px' : '14px'};
  line-height: 1.43em;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
`;

const IconButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
`;

const ProfileList: React.FC<ProfileListProps> = ({
  title,
  time,
  isEditing = false,
  canEdit = false,
  backgroundColor,
  isRecentActivity = false,
  userProfileImage,
  onEditStart,
  onEditCancel,
  onEditSave,
}) => {
  let icon = null;
  let handleIconClick = null;
  
  if (isRecentActivity) {
    icon = <Icon src={statusIcon} alt='Status' />;
  } else if (isEditing) {
    icon = <Icon src={saveIcon} alt='Save' />;
    handleIconClick = onEditSave;
  } else if (canEdit) {
    icon = <Icon src={pencilIcon} alt='Pencil' />;
    handleIconClick = onEditStart;
  }

  return (
    <ProfileListContainer backgroundColor={backgroundColor}>
      <ProfileListContent>
        <UserInfo>
          <Avatar src={userProfileImage || avatar} alt='User Avatar' />
          <TextContainer>
            <Title isRecentActivity={isRecentActivity}>{title}</Title>
            <Time isRecentActivity={isRecentActivity}>{time}</Time>
          </TextContainer>
        </UserInfo>
        {icon && (
          <IconButton onClick={handleIconClick || undefined}>
            {icon}
          </IconButton>
        )}
      </ProfileListContent>
    </ProfileListContainer>
  );
};

export default ProfileList;
