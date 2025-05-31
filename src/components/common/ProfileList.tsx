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
  gap: 12px;
  padding: 32px 32px 24px 32px;
  background: ${({ backgroundColor, theme }) => 
    backgroundColor === 'transparent' ? 'transparent' : 
    backgroundColor || theme.cardBackground
  };
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;
`;

const ProfileListContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border};
  transition: border-color 0.2s ease;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${props => props.isRecentActivity ? '16px' : '20px'};
  line-height: 1.3;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
  margin: 0;
  transition: color 0.3s ease;
`;

const Time = styled.span<{ isRecentActivity?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${props => props.isRecentActivity ? '13px' : '14px'};
  line-height: 1.4;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
  opacity: 0.8;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.surface};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  ${IconButton}:hover & {
    opacity: 1;
  }
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
