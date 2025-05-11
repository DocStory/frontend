import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingFeatures from './LandingFeatures';
import LandingHowItWorks from './LandingHowItWorks';
import LandingFooter from './LandingFooter';

const NavigationLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
  background: #f0f5ff;
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  padding: 8px 16px;
  background: #6C9EFF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;
  
  &:hover {
    background: #3a70ff;
  }
`;

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <NavigationLinks>
        <StyledLink to="/repository-history">저장소 히스토리 페이지</StyledLink>
        <StyledLink to="/repo-tree">트리 페이지</StyledLink>
        <StyledLink to="/physics-test">물리 그래프 테스트</StyledLink>
      </NavigationLinks>
      <LandingFooter />
    </>
  );
};

export default LandingPage; 