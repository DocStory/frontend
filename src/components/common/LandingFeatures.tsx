import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  background: #F7FAFF;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: #6C9EFF;
  margin-bottom: 30px;
  text-align: center;
`;

const Subtitle = styled.h3`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #000;
  margin-bottom: 60px;
  text-align: center;
`;

const FeaturesContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 60px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 540px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #E3EDFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: #6C9EFF;
  font-size: 36px;
`;

const FeatureTitle = styled.h4`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #0F172A;
  margin-bottom: 16px;
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
  text-align: center;
`;

const features = [
  {
    icon: '📄',
    title: '파일 히스토리 관리',
    description: '문서의 모든 변경 사항을 자동으로 기록하고, 언제든 이전 버전으로 돌아갈 수 있습니다. 각 버전별 변경 내용을 한눈에 확인하세요.'
  },
  {
    icon: '👥',
    title: '리뷰를 통한 협업',
    description: '팀원들과 실시간으로 문서를 공유하고 리뷰할 수 있습니다. 변경 사항에 대해 코멘트를 남기고, 승인 프로세스를 통해 문서 품질을 높이세요.'
  }
];

const LandingFeatures: React.FC = () => (
  <Section aria-label="주요 기능 소개" tabIndex={0} id="features">
    <Title>DocStory의 주요 기능</Title>
    <Subtitle>복잡한 파일 관리, DocStory가 해결합니다.</Subtitle>
    <FeaturesContainer>
      {features.map((feature, index) => (
        <FeatureCard key={index} aria-label={feature.title} tabIndex={0}>
          <FeatureIcon aria-hidden>{feature.icon}</FeatureIcon>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </FeatureCard>
      ))}
    </FeaturesContainer>
  </Section>
);

export default LandingFeatures; 