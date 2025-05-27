import React, { useState } from 'react';
import styled from 'styled-components';
import avatarIcon from '../../assets/avatar.svg';
import profilePencilIcon from '../../assets/profilepencilIcon.svg';
import ModalHeader from '../common/ModalHeader';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  onUserNameChange?: (newName: string) => void;
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
  max-width: 563px;
  border-radius: 15px;
  border: 3px solid #CBD5E1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #D9D9D9;
  object-fit: cover;
`;

const AvatarEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0px 1px 4px 0px rgba(26, 15, 1, 0.12);

  img {
    width: 16px;
    height: 16px;
  }
`;

const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserNameDisplay = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.7%;
  color: #6C9EFF;
`;

const UserNameInput = styled.input`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.7%;
  color: #6C9EFF;
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  border-bottom: 2px solid #6C9EFF;
  padding: 4px 8px;
  min-width: 120px;
`;

const NameEditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F3F4F6;
  }
  
  img {
    width: 16px;
    height: 16px;
  }
`;

const UserEmail = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43em;
  color: #6B7280;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E5E7EB;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const InfoLabel = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #1F2937;
`;

const InfoValue = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #4B5563;
  text-align: right;
`;

const InfoDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #F3F4F6;
`;

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  phoneNumber,
  address,
  onUserNameChange,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userName);

  const handleNameEdit = () => {
    setIsEditingName(true);
    setEditedName(userName);
  };

  const handleNameSave = () => {
    if (onUserNameChange && editedName.trim()) {
      onUserNameChange(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(userName);
    setIsEditingName(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader 
          title="사용자 정보" 
          onClose={onClose}
        />
        
        <ContentWrapper>
          <ProfileSection>
            <AvatarSection>
              <AvatarWrapper>
                <Avatar src={avatarIcon} alt="사용자 아바타" />
                <AvatarEditButton>
                  <img src={profilePencilIcon} alt="프로필 편집" />
                </AvatarEditButton>
              </AvatarWrapper>
              
              <UserInfoSection>
                <UserNameContainer>
                  {isEditingName ? (
                    <UserNameInput
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onBlur={handleNameSave}
                      onKeyDown={handleKeyPress}
                      autoFocus
                    />
                  ) : (
                    <>
                      <UserNameDisplay>{userName}</UserNameDisplay>
                      <NameEditButton onClick={handleNameEdit}>
                        <img src={profilePencilIcon} alt="이름 편집" />
                      </NameEditButton>
                    </>
                  )}
                </UserNameContainer>
                <UserEmail>{userEmail}</UserEmail>
              </UserInfoSection>
            </AvatarSection>
            
            <Divider />
          </ProfileSection>

          <InfoSection>
            <InfoRow>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{userName}</InfoValue>
            </InfoRow>
            <InfoDivider />
            
            <InfoRow>
              <InfoLabel>이메일 주소</InfoLabel>
              <InfoValue>{userEmail}</InfoValue>
            </InfoRow>
            <InfoDivider />
          </InfoSection>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserInfoModal;
