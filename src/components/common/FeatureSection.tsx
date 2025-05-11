import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  background: #fff;
  padding: 64px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1A237E;
  margin-bottom: 40px;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
`;

const FeatureCard = styled.div`
  background: #F7FAFF;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.06);
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 18px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2257C7;
  margin-bottom: 10px;
`;

const FeatureDesc = styled.p`
  font-size: 1rem;
  color: #3B4A6B;
  text-align: center;
`;

const features = [
  {
    icon: '📝',
    title: 'AI 문서 요약',
    desc: '긴 문서도 한눈에! AI가 핵심만 뽑아 빠르게 요약해줍니다.'
  },
  {
    icon: '🔍',
    title: '강력한 검색',
    desc: '문서 내 원하는 정보를 빠르고 정확하게 찾아줍니다.'
  },
  {
    icon: '🤝',
    title: '실시간 협업',
    desc: '여러 명이 동시에 문서를 편집하고 의견을 나눌 수 있습니다.'
  },
  {
    icon: '🔒',
    title: '안전한 보안',
    desc: '모든 데이터는 안전하게 암호화되어 보호됩니다.'
  },
];

const FeatureSection: React.FC = () => (
  <Section aria-label="주요 기능" tabIndex={0}>
    <Title>DocStory의 주요 기능</Title>
    <FeaturesGrid>
      {features.map((f, i) => (
        <FeatureCard key={i} aria-label={f.title} tabIndex={0}>
          <Icon aria-hidden>{f.icon}</Icon>
          <FeatureTitle>{f.title}</FeatureTitle>
          <FeatureDesc>{f.desc}</FeatureDesc>
        </FeatureCard>
      ))}
    </FeaturesGrid>
  </Section>
);

export default FeatureSection; 