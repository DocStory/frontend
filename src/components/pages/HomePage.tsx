import React from 'react';
import styled from 'styled-components';
import RecentActivitySectionHeader from '../common/RecentActivitySectionHeader.tsx';
import RecentActivitySectionCard from '../common/RecentActivitySectionCard.tsx';
import FavoriteSectionHeader from '../common/FavoriteSectionHeader.tsx';
import FavoriteSectionCard from '../common/FavoriteSectionCard.tsx';

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage: React.FC = () => (
  <SectionWrapper>
    <Section>
      <FavoriteSectionHeader />
      <FavoriteSectionCard />
    </Section>
    <Section>
      <RecentActivitySectionHeader />
      <RecentActivitySectionCard />
    </Section>
  </SectionWrapper>
);

export default HomePage; 