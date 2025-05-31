import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ isScrolled, theme }) => isScrolled 
    ? `${theme.headerBackground}98` 
    : `${theme.headerBackground}40`};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ isScrolled, theme }) => isScrolled 
    ? theme.border 
    : `${theme.border}50`};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
`;

const Brand = styled.h1<{ isScrolled: boolean }>`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: ${({ isScrolled, theme }) => theme.text};
  margin: 0;
  letter-spacing: -0.5px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ isScrolled: boolean }>`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primaryHover} 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const CTAButton = styled.button<{ isScrolled: boolean }>`
  background: ${({ theme }) => theme.primary};
  border: 1px solid transparent;
  color: ${({ theme }) => theme.background};
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
    background: ${({ theme }) => theme.primaryHover};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MobileMenuButton = styled.button<{ isScrolled: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const LandingHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('intro');
  };

  return (
    <HeaderWrapper isScrolled={isScrolled} aria-label="메인 헤더" tabIndex={0}>
      <Container>
        <LogoSection onClick={() => scrollToSection('intro')}>
          <LogoImg src="/src/assets/logo.svg" alt="DocStory 로고" />
          <Brand isScrolled={isScrolled} theme={theme}>DocStory</Brand>
        </LogoSection>
        
        <Navigation>
          <NavLink 
            isScrolled={isScrolled}
            href="#features" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            기능
          </NavLink>
          <NavLink 
            isScrolled={isScrolled}
            href="#how" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how');
            }}
          >
            사용법
          </NavLink>
          <NavLink 
            isScrolled={isScrolled}
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            문의
          </NavLink>
        </Navigation>
        
        <CTAButton isScrolled={isScrolled} onClick={handleGetStarted}>
          시작하기
        </CTAButton>
        
        <MobileMenuButton isScrolled={isScrolled}>
          ☰
        </MobileMenuButton>
      </Container>
    </HeaderWrapper>
  );
};

export default LandingHeader; 