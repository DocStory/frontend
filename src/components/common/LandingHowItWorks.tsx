import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  background: #fff;
  padding: 100px 0 100px 0;
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

const SubTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  max-width: 800px;
  padding: 0 20px;
`;

const SubTitle1 = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
`;

const SubTitle2 = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #64748B;
  text-align: center;
  line-height: 1.6;
`;

const StepsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  padding: 0 20px;
`;

const StepCard = styled.div`
  background: #F8FAFC;
  border-radius: 16px;
  width: 280px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.06);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-8px);
  }
`;

const StepNum = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #6C9EFF;
  margin-bottom: 16px;
`;

const StepIcon = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #0F172A;
  margin-bottom: 10px;
  text-align: center;
`;

const StepDesc = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #64748B;
  text-align: center;
  line-height: 1.5;
`;

const steps = [
  { 
    num: '1단계', 
    icon: '📁', 
    title: '저장소 만들기',
    desc: '프로젝트 저장소를 생성하여 관련 문서를 한 곳에 모아보세요.'
  },
  { 
    num: '2단계', 
    icon: '📤', 
    title: '파일 업로드하기',
    desc: '간단한 드래그 앤 드롭으로 문서를 업로드하고 관리하세요.'
  },
  { 
    num: '3단계', 
    icon: '🔄', 
    title: '버전 관리하기',
    desc: '문서의 모든 버전을 자동으로 기록하고 쉽게 확인하세요.'
  },
  { 
    num: '4단계', 
    icon: '🤝', 
    title: '팀원과 협업하기',
    desc: '팀원을 초대하고 변경 사항에 대한 리뷰를 남겨보세요.'
  },
];

const LandingHowItWorks: React.FC = () => (
  <Section aria-label="사용 방법" tabIndex={0} id="how">
    <Title>어떻게 사용하나요?</Title>
    <SubTitleWrap>
      <SubTitle1>쉽고 간편한 문서 관리 프로세스</SubTitle1>
      <SubTitle2>
        DocStory는 복잡한 문서 관리 프로세스를 쉽고 간편하게 만들어줍니다.
        몇 가지 단계만 거치면 효율적인 문서 관리와 팀 협업이 가능합니다.
      </SubTitle2>
    </SubTitleWrap>
    <StepsRow>
      {steps.map((step) => (
        <StepCard key={step.num} aria-label={step.title} tabIndex={0}>
          <StepNum>{step.num}</StepNum>
          <StepIcon aria-hidden>{step.icon}</StepIcon>
          <StepTitle>{step.title}</StepTitle>
          <StepDesc>{step.desc}</StepDesc>
        </StepCard>
      ))}
    </StepsRow>
  </Section>
);

export default LandingHowItWorks; 