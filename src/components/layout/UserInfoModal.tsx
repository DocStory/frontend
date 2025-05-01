import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.svg';
import avatarIcon from '../../assets/avatar.svg';
import profilePencilIcon from '../../assets/profilepencilIcon.svg';
import InfoList from '../common/InfoList.tsx';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  position: relative;
  padding: 40px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 20px;
    height: 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #2d81ff;
`;

const UserEmail = styled.div`
  font-size: 16px;
  color: #666666;
`;

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  phoneNumber,
  address,
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={closeIcon} alt='close' />
        </CloseButton>
        <ProfileSection>
          <AvatarWrapper>
            <Avatar src={avatarIcon} alt='user avatar' />
            <EditButton>
              <img src={profilePencilIcon} alt='edit profile' />
            </EditButton>
          </AvatarWrapper>
          <UserInfo>
            <UserName>{userName}</UserName>
            <UserEmail>{userEmail}</UserEmail>
          </UserInfo>
        </ProfileSection>
        <InfoList
          name={userName}
          email={userEmail}
          phoneNumber={phoneNumber}
          address={address}
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserInfoModal;
