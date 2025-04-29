import React from 'react';
import styled from 'styled-components';
// import NavigationMenu from './NavigationMenu'; // 파일이 없으므로 주석 처리

interface SidebarProps {
  isCollapsed?: boolean;
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

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <LogoSection>
        <Logo>DocStory</Logo>
      </LogoSection>
    </SidebarContainer>
  );
};

export default Sidebar; 