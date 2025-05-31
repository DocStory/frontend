import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import avatarIcon from '../../assets/avatar.svg';
import profilePencilIcon from '../../assets/profilepencilIcon.svg';
import ModalHeader from '../common/ModalHeader';
import { useToastContext } from '../../contexts/ToastContext';
import api from '../../api/axios';
import { useUser } from '../../contexts/UserContext';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  profileImage?: string;
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
  background: ${({ theme }) => theme.modalBackground};
  width: 100%;
  max-width: 563px;
  border-radius: 15px;
  border: 3px solid ${({ theme }) => theme.border};
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
  background-color: ${({ theme }) => theme.backgroundLighter};
  object-fit: cover;
`;

const AvatarEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.primary};
`;

const UserNameInput = styled.input`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.7%;
  color: ${({ theme }) => theme.primary};
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
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
    background-color: ${({ theme }) => theme.backgroundLighter};
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
  color: ${({ theme }) => theme.textSecondary};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.borderLight};
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
  color: ${({ theme }) => theme.text};
`;

const InfoValue = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: ${({ theme }) => theme.textSecondary};
  text-align: right;
`;

const InfoDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.backgroundLighter};
`;

const WithdrawSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const WithdrawButton = styled.button`
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : '#FEF2F2'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : '#FECACA'};
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#F87171' : '#DC2626'};
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:hover {
    background-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : '#FEE2E2'};
    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : '#FCA5A5'};
    color: ${({ theme }) => theme.mode === 'dark' ? '#EF4444' : '#B91C1C'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
  }
  
  &:active {
    background-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : '#FECACA'};
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(220, 38, 38, 0.1);
  }
`;

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  phoneNumber,
  address,
  profileImage,
  onUserNameChange,
}) => {
  const { refetchUser } = useUser();
  const toast = useToastContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [profileImageState, setProfileImageState] = useState<string>(profileImage || avatarIcon);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // profileImage prop이 변경될 때 상태 업데이트
  React.useEffect(() => {
    setProfileImageState(profileImage || avatarIcon);
  }, [profileImage]);

  const handleNameEdit = () => {
    setIsEditingName(true);
    setEditedName(userName);
  };

  const handleNameSave = async () => {
    if (editedName.trim() === userName) {
      setIsEditingName(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('updateUserRequest', JSON.stringify({
        nickname: editedName.trim()
      }));

      const response = await api.put('/api/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.code === 100) {
        if (onUserNameChange) {
          onUserNameChange(editedName.trim());
        }
        setIsEditingName(false);
        toast.success('사용자 이름이 성공적으로 변경되었습니다.');
        
        // 사용자 정보 갱신
        await refetchUser();
      } else {
        toast.error(`이름 변경 실패: ${response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
        setEditedName(userName);
      }
    } catch (error: any) {
      console.error('사용자 이름 변경 오류:', error);
      toast.error('사용자 이름 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
      setEditedName(userName);
    }
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

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (file.type.startsWith('image/')) {
        try {
          const formData = new FormData();
          formData.append('updateUserRequest', JSON.stringify({}));
          formData.append('profileImage', file);

          const response = await api.put('/api/users/me', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.data.code === 100) {
            // 파일을 미리보기용으로 읽기
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setProfileImageState(event.target.result as string);
              }
            };
            reader.readAsDataURL(file);

            toast.success('프로필 이미지가 성공적으로 변경되었습니다.');
            
            // 사용자 정보 갱신
            await refetchUser();
          } else {
            toast.error(`프로필 이미지 변경 실패: ${response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
          }
        } catch (error: any) {
          console.error('프로필 이미지 변경 오류:', error);
          toast.error('프로필 이미지 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        toast.warning('이미지 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const handleWithdraw = () => {
    const isConfirmed = window.confirm(
      '정말로 회원 탈퇴를 하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.'
    );
    
    if (isConfirmed) {
      // 여기에 실제 회원 탈퇴 로직을 구현
      console.log('회원 탈퇴 요청');
      alert('회원 탈퇴가 완료되었습니다.');
      onClose();
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
                <Avatar 
                  src={profileImageState} 
                  alt="사용자 아바타"
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 아바타로 대체
                    const target = e.target as HTMLImageElement;
                    target.src = avatarIcon;
                  }}
                />
                <AvatarEditButton onClick={handleProfileImageClick}>
                  <img src={profilePencilIcon} alt="프로필 편집" />
                </AvatarEditButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
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

          <WithdrawSection>
            <WithdrawButton onClick={handleWithdraw}>
              회원 탈퇴
            </WithdrawButton>
          </WithdrawSection>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserInfoModal;
