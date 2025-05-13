import React from 'react';
import styled from 'styled-components';
import LoginButton from './LoginButton';
import AuthService from '../../api/auth';

const HeroWrapper = styled.section`
  width: 100vw;
  min-height: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #F7FAFF 0%, #E3EDFF 100%);
  padding: 110px 0 50px 0;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 100px;
  min-width: 400px;
`;

const Title = styled.h1`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 44px;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -1.5px;
`;

const HighlightText = styled.span`
  color: #6C9EFF;
`;

const SubTitle = styled.h2`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 44px;
  color: #000;
  margin-bottom: 16px;
  letter-spacing: -1.5px;
`;

const Desc = styled.p`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #64748B;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 500px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  width: 300px;
`;

const MacbookImage = styled.img`
  flex: 1;
  max-width: 550px;
  min-width: 300px;
  height: auto;
  margin-left: 40px;
  border-radius: 24px;
`;

const LinkWrapper = styled.a`
  text-decoration: none;
`;

const LandingHero: React.FC = () => {
  // 소셜 로그인 핸들러
  const handleGoogleLogin = () => {
    window.location.href = AuthService.getSocialLoginUrl('google');
  };
  
  const handleKakaoLogin = () => {
    window.location.href = AuthService.getSocialLoginUrl('kakao');
  };
  
  const handleGuestLogin = () => {
    // 게스트 로그인 로직
    console.log('게스트 로그인');
  };

  return (
    <HeroWrapper aria-label="히어로 섹션" tabIndex={0} id="intro">
      <Content>
        <Title>복잡한 파일 관리,</Title>
        <SubTitle><HighlightText>DocStory</HighlightText>가 해결합니다.</SubTitle>
        <Desc>
          문서를 업로드하고, 문서 흐름을 간편하게 관리해보세요. 
          팀원들과 협업까지 간편하게 가능합니다.
        </Desc>
        <ButtonRow>
          <LoginButton type="google" onClick={handleGoogleLogin}>구글 계정으로 로그인</LoginButton>
          <LoginButton type="kakao" onClick={handleKakaoLogin}>카카오 계정으로 로그인</LoginButton>
          <LoginButton type="guest" onClick={handleGuestLogin}>로그인 없이 체험해보기</LoginButton>
        </ButtonRow>
      </Content>
      <MacbookImage src="/assets/examImage.svg" alt="Macbook Air 일러스트" />
    </HeroWrapper>
  );
};

export default LandingHero;