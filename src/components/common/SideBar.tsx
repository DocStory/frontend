import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';
import HomeIcon from '../../assets/homeIcon.svg';
import RepoIcon from '../../assets/repoIcon.svg';
import HelpIcon from '../../assets/helpIcon.svg';
import SettingIcon from '../../assets/settingIcon.svg';
import LogoutIcon from '../../assets/logoutIcon.png';
import Avatar from '../../assets/avatar.svg';
import UserInfoModal from '../layout/UserInfoModal';
import SettingsModal from '../layout/SettingsModal';
import { useUser } from '../../contexts/UserContext';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SideBarProps {
  activeMenu?: string;
  onMenuClick?: (label: string) => void;
}

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
`;

const TopArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 32px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const LogoImg = styled.img`
  height: 32px;
`;

const ProjectTitle = styled.div`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
  margin-left: 12px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 24px;
`;

const MenuItemBox = styled.div<{active?: boolean}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 32px;
  background: ${({active, theme}) => active ? theme.activeBackground : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-weight: ${({active}) => active ? 800 : 500};
  font-size: 16px;
  color: ${({active, theme}) => active ? theme.primary : theme.textSecondary};
  transition: all 0.2s ease;
  margin: 0 16px;
  
  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    color: ${({ theme }) => theme.primary};
  }
`;

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const BottomSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const LogoutIconBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const LogoutImg = styled.img`
  width: 24px;
  height: 24px;
`;

const LoadingText = styled.span`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

const SideBar: React.FC<SideBarProps> = ({ activeMenu = '홈', onMenuClick }) => {
  const { userInfo, loading, error } = useUser();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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

  const handleLogoClick = () => {
    if (onMenuClick) {
      onMenuClick('홈');
    }
  };

  const getUserDisplayInfo = () => {
    if (loading) {
      return { name: '로딩 중...', avatar: Avatar, email: '' };
    }
    
    if (error || !userInfo) {
      return { name: '사용자 정보 없음', avatar: Avatar, email: '' };
    }

    // profileImage가 base64 인코딩된 이미지인 경우 data URL로 변환
    const avatarSrc = userInfo.profileImage && userInfo.profileImage.startsWith('data:') 
      ? userInfo.profileImage 
      : userInfo.profileImage 
        ? `data:image/jpeg;base64,${userInfo.profileImage}`
        : Avatar;

    return {
      name: userInfo.nickname,
      avatar: avatarSrc,
      email: userInfo.email || 'yourname@gmail.com'
    };
  };

  const { name, avatar, email } = getUserDisplayInfo();

  // 모달용 사용자 데이터
  const userData = {
    name: name,
    email: email,
    phoneNumber: '010-1234-5678', // API에서 제공되지 않는 경우 기본값
    address: '서울특별시 강남구 테헤란로 123', // API에서 제공되지 않는 경우 기본값
  };

  return (
    <>
      <SidebarContainer>
        <TopArea>
          <TopSection onClick={handleLogoClick}>
            <LogoImg src={Logo} alt="DocStory Logo" />
            <ProjectTitle>DocStory</ProjectTitle>
          </TopSection>
          <MenuSection>
            {menuList.map((item) => (
              <MenuItemBox
                key={item.label}
                active={item.active}
                onClick={() => handleMenuClick(item.label)}
              >
                {item.icon}
                {item.label}
              </MenuItemBox>
            ))}
          </MenuSection>
        </TopArea>
        <BottomSection>
          <AvatarBox onClick={handleUserProfileClick}>
            <AvatarImg 
              src={avatar} 
              alt="User Avatar"
              onError={(e) => {
                // 이미지 로드 실패 시 기본 아바타로 대체
                const target = e.target as HTMLImageElement;
                target.src = Avatar;
              }}
            />
            {loading ? (
              <LoadingText>로딩 중...</LoadingText>
            ) : (
              <UserName>{name}</UserName>
            )}
          </AvatarBox>
          <LogoutIconBox title="로그아웃">
            <LogoutImg src={LogoutIcon} alt="로그아웃" />
          </LogoutIconBox>
        </BottomSection>
      </SidebarContainer>

      <UserInfoModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        userName={userData.name}
        userEmail={userData.email}
        phoneNumber={userData.phoneNumber}
        address={userData.address}
        profileImage={avatar}
        onUserNameChange={(newName) => {
          // 필요시 사용자 이름 변경 로직 추가
          console.log('사용자 이름 변경:', newName);
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
      />
    </>
  );
};

export default SideBar; 