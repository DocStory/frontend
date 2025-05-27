import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfoModal from './UserInfoModal';
import SettingsModal from './SettingsModal';
import avatarIcon from '../../assets/avatar.svg';
import Logo from '../../assets/logo.svg';
import HomeIcon from '../../assets/homeIcon.svg';
import RepoIcon from '../../assets/repoIcon.svg';
import HelpIcon from '../../assets/helpIcon.svg';
import SettingIcon from '../../assets/settingIcon.svg';
import LogoutIcon from '../../assets/logoutIcon.png';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  isCollapsed?: boolean;
  activeMenu?: string;
  onMenuClick?: (label: string) => void;
  userName?: string;
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

const LogoTitle = styled.h1`
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
  padding: 24px 0;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

const MenuItemBox = styled.div<{ active?: boolean; isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.isCollapsed ? '0' : '12px'};
  padding: ${props => props.isCollapsed ? '12px' : '12px 16px'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  
  background-color: ${props => props.active ? '#F0F7FF' : 'transparent'};
  color: ${props => props.active ? '#6C9EFF' : '#6B7280'};
  
  &:hover {
    background-color: ${props => props.active ? '#F0F7FF' : '#F8FAFC'};
  }
  
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuLabel = styled.span<{ isCollapsed?: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'block'};
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

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  activeMenu = '홈', 
  onMenuClick, 
  userName = '홍길동',
  onUserNameChange 
}) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(userName);

  const menuList: MenuItem[] = [
    { icon: <MenuIcon src={HomeIcon} alt="홈" />, label: '홈', active: activeMenu === '홈' },
    { icon: <MenuIcon src={RepoIcon} alt="저장소" />, label: '저장소', active: activeMenu === '저장소' },
    { icon: <MenuIcon src={HelpIcon} alt="도움말" />, label: '도움말', active: activeMenu === '도움말' },
    { icon: <MenuIcon src={SettingIcon} alt="설정" />, label: '설정', active: activeMenu === '설정' },
  ];

  const handleMenuClick = (label: string) => {
    if (label === '설정') {
      setIsSettingsModalOpen(true);
    } else {
      if (onMenuClick) {
        onMenuClick(label);
      }
    }
  };

  const handleUserProfileClick = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
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
          <LogoTitle>DocStory</LogoTitle>
        </LogoSection>
        
        <ContentArea>
          <MenuSection>
            {menuList.map((item) => (
              <MenuItemBox
                key={item.label}
                active={item.active}
                isCollapsed={isCollapsed}
                onClick={() => handleMenuClick(item.label)}
              >
                {item.icon}
                <MenuLabel isCollapsed={isCollapsed}>{item.label}</MenuLabel>
              </MenuItemBox>
            ))}
          </MenuSection>
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

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
      />
    </>
  );
};

export default Sidebar; 