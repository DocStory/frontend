import React from 'react';
import styled from 'styled-components';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingHowItWorks from './LandingHowItWorks';
import LandingFeatures from './LandingFeatures';
import LandingFooter from './LandingFooter';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const LandingPage: React.FC = () => (
  <PageContainer>
    <LandingHeader />
    <LandingHero />
    <LandingHowItWorks />
    <LandingFeatures />
    <LandingFooter />
  </PageContainer>
);

export default LandingPage; 