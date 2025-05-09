import React from 'react';
import styled from 'styled-components';
import pencilIcon from '../../assets/pencilIcon.svg';
import saveIcon from '../../assets/saveIcon.svg';
import avatar from '../../assets/avatar.svg';

interface ProfileListProps {
  title: string;
  time: string;
  isEditing?: boolean;
  canEdit?: boolean;
  backgroundColor?: string;
}

const ProfileListContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 37px 24px 16px 33px;
  background: ${props => props.backgroundColor || '#ffffff'};
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

const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.007em;
  color: #1e293b;
  margin: 0;
`;

const Time = styled.span`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.006em;
  color: #475569;
`;

const IconButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
  padding: 16px;
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
}) => {
  let icon = null;
  if (isEditing) {
    icon = <Icon src={saveIcon} alt='Save' />;
  } else if (canEdit) {
    icon = <Icon src={pencilIcon} alt='Pencil' />;
  }

  return (
    <ProfileListContainer backgroundColor={backgroundColor}>
      <ProfileListContent>
        <UserInfo>
          <Avatar src={avatar} alt='User Avatar' />
          <TextContainer>
            <Title>{title}</Title>
            <Time>{time}</Time>
          </TextContainer>
        </UserInfo>
        {icon && <IconButton>{icon}</IconButton>}
      </ProfileListContent>
    </ProfileListContainer>
  );
};

export default ProfileList;
