import React from 'react';
import styled from 'styled-components';
import LoginButton from './LoginButton';

const HeroWrapper = styled.section`
  width: 100vw;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #F7FAFF 0%, #E3EDFF 100%);
  padding: 120px 0 60px 0;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 120px;
  min-width: 420px;
`;

const Title = styled.h1`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 50px;
  color: #6C9EFF;
  margin-bottom: 8px;
  letter-spacing: -3.5%;
`;

const SubTitle = styled.h2`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 50px;
  color: #6C9EFF;
  margin-bottom: 18px;
  letter-spacing: -3.5%;
`;

const Desc = styled.p`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #000;
  margin-bottom: 32px;
  line-height: 2.06;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  width: 327px;
`;

const MacbookImage = styled.img`
  flex: 1;
  max-width: 600px;
  min-width: 320px;
  height: auto;
  margin-left: 40px;
  box-shadow: 0px 4px 24px 0px rgba(0,0,0,0.10);
  border-radius: 24px;
`;

const LandingHero: React.FC = () => (
  <HeroWrapper aria-label="히어로 섹션" tabIndex={0}>
    <Content>
      <Title>DocStory와 함께,</Title>
      <SubTitle>빠르고 쉬운 문서관리</SubTitle>
      <Desc>문서를 업로드하고, 쉽게 버전 관리하세요. <br />팀원들과의 협업도 간편하게</Desc>
      <ButtonRow>
        <LoginButton type="google">구글 계정으로 로그인</LoginButton>
        <LoginButton type="kakao">카카오 계정으로 로그인</LoginButton>
        <LoginButton type="guest">로그인 없이 체험해보기</LoginButton>
      </ButtonRow>
    </Content>
    <MacbookImage src="/assets/examImage.svg" alt="Macbook Air 일러스트" />
  </HeroWrapper>
);

export default LandingHero; 