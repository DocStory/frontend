import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  width: 100%;
  background: #f8f9fa;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 42px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${fadeInUp} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #6C9EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;

const FeatureTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #333;
  margin: 0;
  line-height: 1.4;
`;

const FeatureDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

const features = [
  {
    icon: '/src/assets/diffIcon.svg',
    title: '버전 관리',
    description: '문서의 변경 사항을 자동으로 추적하고 관리합니다. 언제든 이전 버전으로 되돌릴 수 있어요.'
  },
  {
    icon: '/src/assets/teamIcon.svg',
    title: '팀 협업',
    description: '팀원들과 실시간으로 문서를 공유하고 함께 작업할 수 있습니다.'
  },
  {
    icon: '/src/assets/repoIcon.svg',
    title: '체계적 관리',
    description: '프로젝트별로 문서를 정리하고 효율적으로 관리할 수 있습니다.'
  }
];

const LandingFeatures: React.FC = () => (
  <Section aria-label="주요 기능 소개" tabIndex={0} id="features">
    <Container>
      <HeaderSection>
        <Title>DocStory의 주요 기능</Title>
        <Subtitle>
          문서 관리를 더 쉽고 효율적으로 만드는 핵심 기능들을 소개합니다.
        </Subtitle>
      </HeaderSection>
      
      <FeaturesContainer>
        {features.map((feature, index) => (
          <FeatureCard key={index} aria-label={feature.title} tabIndex={0}>
            <FeatureHeader>
              <FeatureIcon>
                <IconImage src={feature.icon} alt={feature.title} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </FeatureHeader>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesContainer>
    </Container>
  </Section>
);

export default LandingFeatures; 