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
`;

const SubTitle1 = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 60px;
  color: #000;
  margin-bottom: 10px;
  text-align: center;
`;

const SubTitle2 = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #0F172A;
  text-align: center;
`;

const StepsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const StepCard = styled.div`
  background: #F5F5F5;
  border-radius: 10px;
  width: 336px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.06);
`;

const StepNum = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #6C9EFF;
  margin-bottom: 10px;
`;

const StepTitle = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #0F172A;
`;

const Chevron = styled.span`
  display: flex;
  align-items: center;
  font-size: 40px;
  color: #6C9EFF;
  user-select: none;
`;

const steps = [
  { num: '1단계', title: '저장소 만들기' },
  { num: '2단계', title: '파일 업로드하기' },
  { num: '3단계', title: '버전을 쉽게 관리하기' },
];

const LandingHowItWorks: React.FC = () => (
  <Section aria-label="사용 방법" tabIndex={0} id="how">
    <Title>어떻게 사용하나요?</Title>
    <SubTitleWrap>
      <SubTitle1>파일 버전 흐름을 쉽게 확인해 보세요</SubTitle1>
      <SubTitle2>파일을 업로드하고, 쉽게 관리해보세요</SubTitle2>
    </SubTitleWrap>
    <StepsRow>
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <StepCard aria-label={step.title} tabIndex={0}>
            <StepNum>{step.num}</StepNum>
            <StepTitle>{step.title}</StepTitle>
          </StepCard>
          {i < steps.length - 1 && <Chevron aria-hidden>{'>'}</Chevron>}
        </React.Fragment>
      ))}
    </StepsRow>
  </Section>
);

export default LandingHowItWorks; 