import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px 20px 60px;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  min-height: 80px;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Brand = styled.span`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: #6C9EFF;
`;

const MenuRow = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const MenuItem = styled.a`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #18181B;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #6C9EFF;
  }
`;

const LandingHeader: React.FC = () => (
  <HeaderWrapper aria-label="메인 헤더" tabIndex={0}>
    <LogoRow>
      <LogoImg src="/assets/logo.svg" alt="DocStory 로고" />
      <Brand>DocStory</Brand>
    </LogoRow>
    <MenuRow>
      <MenuItem href="#intro" aria-label="소개" tabIndex={0}>소개</MenuItem>
      <MenuItem href="#how" aria-label="사용 방법" tabIndex={0}>사용 방법</MenuItem>
    </MenuRow>
  </HeaderWrapper>
);

export default LandingHeader; 