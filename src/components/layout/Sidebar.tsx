import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfoModal from './UserInfoModal';
import avatarIcon from '../../assets/avatar.svg';
// import NavigationMenu from './NavigationMenu'; // 파일이 없으므로 주석 처리

interface SidebarProps {
  isCollapsed?: boolean;
  onUserNameChange?: (newName: string) => void;
}

const SidebarContainer = styled.div<{ isCollapsed?: boolean }>`
  width: ${props => props.isCollapsed ? '80px' : '280px'};
  height: 100vh;
  background-color: #FFFFFF;
  border-right: 1px solid #F0F0F0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
`;

const LogoSection = styled.div`
  padding: 24px;
  border-bottom: 1px solid #F0F0F0;
`;

const Logo = styled.h1`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 22px;
  color: #6C9EFF;
  margin: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserProfileSection = styled.div<{ isCollapsed?: boolean }>`
  margin-top: auto;
  padding: 24px;
  border-top: 1px solid #F0F0F0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F8FAFC;
  }
`;

const UserProfileContent = styled.div<{ isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.isCollapsed ? '0' : '12px'};
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
`;

const UserAvatar = styled.img<{ isCollapsed?: boolean }>`
  width: ${props => props.isCollapsed ? '40px' : '48px'};
  height: ${props => props.isCollapsed ? '40px' : '48px'};
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div<{ isCollapsed?: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  color: #1F2937;
  line-height: 1.5;
`;

const UserEmail = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  color: #6B7280;
  line-height: 1.4;
`;

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onUserNameChange }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('홍길동');

  const handleUserProfileClick = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleUserNameChange = (newName: string) => {
    setCurrentUserName(newName);
    if (onUserNameChange) {
      onUserNameChange(newName);
    }
  };

  // 임시 사용자 데이터 (실제로는 props나 context에서 가져올 것)
  const userData = {
    name: currentUserName,
    email: 'yourname@gmail.com',
    phoneNumber: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
  };

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed}>
        <LogoSection>
          <Logo>DocStory</Logo>
        </LogoSection>
        
        <ContentArea>
          {/* 여기에 네비게이션 메뉴가 들어갈 예정 */}
        </ContentArea>

        <UserProfileSection 
          isCollapsed={isCollapsed}
          onClick={handleUserProfileClick}
        >
          <UserProfileContent isCollapsed={isCollapsed}>
            <UserAvatar 
              src={avatarIcon} 
              alt="사용자 프로필" 
              isCollapsed={isCollapsed}
            />
            <UserInfo isCollapsed={isCollapsed}>
              <UserName>{userData.name}</UserName>
              <UserEmail>{userData.email}</UserEmail>
            </UserInfo>
          </UserProfileContent>
        </UserProfileSection>
      </SidebarContainer>

      <UserInfoModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        userName={userData.name}
        userEmail={userData.email}
        phoneNumber={userData.phoneNumber}
        address={userData.address}
        onUserNameChange={handleUserNameChange}
      />
    </>
  );
};

export default Sidebar; 