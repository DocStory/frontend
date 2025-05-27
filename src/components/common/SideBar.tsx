import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';
import HomeIcon from '../../assets/homeIcon.svg';
import RepoIcon from '../../assets/repoIcon.svg';
import HelpIcon from '../../assets/helpIcon.svg';
import SettingIcon from '../../assets/settingIcon.svg';
import LogoutIcon from '../../assets/logoutIcon.png';
import Avatar from '../../assets/avatar.svg';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SideBarProps {
  activeMenu?: string;
  onMenuClick?: (label: string) => void;
  userName?: string;
}

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #F0F0F0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  border-bottom: 1px solid #F0F0F0;
  gap: 12px;
`;

const LogoImg = styled.img`
  height: 32px;
`;

const ProjectTitle = styled.div`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 22px;
  color: #6C9EFF;
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
  background: ${({active}) => active ? '#F6F7FB' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-weight: ${({active}) => active ? 800 : 500};
  font-size: 16px;
  color: ${({active}) => active ? '#3A5EFF' : '#61677F'};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #F6F7FB;
    color: #3A5EFF;
  }
`;

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const BottomSection = styled.div`
  border-top: 1px solid #F0F0F0;
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
    background-color: #F8FAFC;
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
  color: #61677F;
`;

const LogoutIconBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F8FAFC;
  }
`;

const LogoutImg = styled.img`
  width: 24px;
  height: 24px;
`;

const SideBar: React.FC<SideBarProps> = ({ activeMenu = '홈', onMenuClick, userName = '홍길동' }) => {
  const menuList: MenuItem[] = [
    { icon: <MenuIcon src={HomeIcon} alt="홈" />, label: '홈', active: activeMenu === '홈' },
    { icon: <MenuIcon src={RepoIcon} alt="저장소" />, label: '저장소', active: activeMenu === '저장소' },
    { icon: <MenuIcon src={HelpIcon} alt="도움말" />, label: '도움말', active: activeMenu === '도움말' },
    { icon: <MenuIcon src={SettingIcon} alt="설정" />, label: '설정', active: activeMenu === '설정' },
  ];

  return (
    <SidebarContainer>
      <TopArea>
        <TopSection>
          <LogoImg src={Logo} alt="DocStory Logo" />
          <ProjectTitle>DocStory</ProjectTitle>
        </TopSection>
        <MenuSection>
          {menuList.map((item) => (
            <MenuItemBox
              key={item.label}
              active={item.active}
              onClick={() => onMenuClick && onMenuClick(item.label)}
            >
              {item.icon}
              {item.label}
            </MenuItemBox>
          ))}
        </MenuSection>
      </TopArea>
      <BottomSection>
        <AvatarBox>
          <AvatarImg src={Avatar} alt="User Avatar" />
          <UserName>{userName}</UserName>
        </AvatarBox>
        <LogoutIconBox title="로그아웃">
          <LogoutImg src={LogoutIcon} alt="로그아웃" />
        </LogoutIconBox>
      </BottomSection>
    </SidebarContainer>
  );
};

export default SideBar; 