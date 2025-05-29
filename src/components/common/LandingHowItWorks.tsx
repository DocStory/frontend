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
  background: #ffffff;
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

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StepCard = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border: 1px solid #f0f0f0;
  border-top: 3px solid #f0f0f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-top-color 0.2s ease;
  animation: ${fadeInUp} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(108, 158, 255, 0.12);
    border-color: #f0f0f0;
    border-top-color: #6C9EFF;
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
  
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #8BB5FF 0%, #6C9EFF 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(108, 158, 255, 0.25);
`;

const StepIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const StepIcon = styled.img`
  width: 28px;
  height: 28px;
  opacity: 0.8;
`;

const StepTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const StepDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

const steps = [
  { 
    num: '1', 
    icon: '/src/assets/repoIcon.svg', 
    title: '저장소 생성',
    description: '프로젝트별로 저장소를 만들어 문서들을 체계적으로 관리하세요.'
  },
  { 
    num: '2', 
    icon: '/src/assets/uploadIcon.svg', 
    title: '파일 업로드',
    description: '드래그 앤 드롭으로 간편하게 문서를 업로드할 수 있습니다.'
  },
  { 
    num: '3', 
    icon: '/src/assets/diffIcon.svg', 
    title: '버전 관리',
    description: '모든 변경사항이 자동으로 기록되어 이전 버전으로 복원할 수 있습니다.'
  },
  { 
    num: '4', 
    icon: '/src/assets/memberInviteIcon.svg', 
    title: '팀 협업',
    description: '팀원을 초대하고 함께 문서를 관리하며 협업할 수 있습니다.'
  },
];

const LandingHowItWorks: React.FC = () => (
  <Section aria-label="사용 방법" tabIndex={0} id="how">
    <Container>
      <HeaderSection>
        <Title>간단한 4단계로 시작하기</Title>
        <Subtitle>
          복잡한 설정 없이 몇 분만에 DocStory를 시작할 수 있습니다.
        </Subtitle>
      </HeaderSection>
      
      <StepsContainer>
        {steps.map((step) => (
          <StepCard key={step.num} aria-label={step.title} tabIndex={0}>
            <StepNumber>{step.num}</StepNumber>
            <StepIconWrapper>
              <StepIcon 
                src={step.icon} 
                alt={step.title}
              />
            </StepIconWrapper>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </StepsContainer>
    </Container>
  </Section>
);

export default LandingHowItWorks; 