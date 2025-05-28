import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'rgba(255, 255, 255, 0.25)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.isScrolled 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.3)'};
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

const Brand = styled.h1`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: ${props => props.theme?.isScrolled ? '#0F172A' : '#FFFFFF'};
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
  color: ${props => props.isScrolled ? '#64748B' : 'rgba(255, 255, 255, 0.9)'};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.isScrolled ? '#6C9EFF' : '#FFFFFF'};
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6C9EFF 0%, #4F80FF 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const CTAButton = styled.button<{ isScrolled: boolean }>`
  background: ${props => props.isScrolled 
    ? 'linear-gradient(135deg, #6C9EFF 0%, #4F80FF 100%)' 
    : 'rgba(255, 255, 255, 0.2)'};
  border: 1px solid ${props => props.isScrolled 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.isScrolled ? '#FFFFFF' : '#FFFFFF'};
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
    box-shadow: 0 8px 25px rgba(108, 158, 255, 0.3);
    background: linear-gradient(135deg, #6C9EFF 0%, #4F80FF 100%);
    border-color: transparent;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MobileMenuButton = styled.button<{ isScrolled: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${props => props.isScrolled ? '#0F172A' : '#FFFFFF'};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isScrolled 
      ? 'rgba(0, 0, 0, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)'};
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const LandingHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Brand theme={{ isScrolled }}>DocStory</Brand>
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