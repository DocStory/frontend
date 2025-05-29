import React from 'react';
import styled, { keyframes } from 'styled-components';
import LoginButton from './LoginButton';
import AuthService from '../../api/auth';

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`;

const HeroWrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8BB5FF 0%, #6C9EFF 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 60px;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 600px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 5vw, 64px);
  color: #fff;
  margin-bottom: 24px;
  line-height: 1.2;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const HighlightText = styled.span`
  color: #ffd700;
`;

const Desc = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 700px;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out 0.5s both;
`;

const MacbookImage = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 0 15px 35px rgba(108, 158, 255, 0.15);
  border-radius: 8px;
  animation: ${float} 6s ease-in-out infinite;
`;

const LandingHero: React.FC = () => {
  // 소셜 로그인 핸들러
  const handleGoogleLogin = () => {
    window.location.href = AuthService.getSocialLoginUrl('google');
  };
  
  const handleKakaoLogin = () => {
    window.location.href = AuthService.getSocialLoginUrl('kakao');
  };

  return (
    <HeroWrapper aria-label="히어로 섹션" tabIndex={0} id="intro">
      <Container>
        <Content>
          <Title>
            복잡한 파일 관리,<br />
            <HighlightText>DocStory</HighlightText>가<br />
            해결합니다.
          </Title>
          <Desc>
            문서를 업로드하고, 문서 흐름을 간편하게 관리해보세요.<br />
            팀원들과 협업까지 간편하게 가능합니다.
          </Desc>
          <ButtonRow>
            <LoginButton type="google" onClick={handleGoogleLogin}>
              구글 계정으로 시작하기
            </LoginButton>
            <LoginButton type="kakao" onClick={handleKakaoLogin}>
              카카오 계정으로 시작하기
            </LoginButton>
          </ButtonRow>
        </Content>
        
        <ImageContainer>
          <MacbookImage src="/src/assets/examImage.svg" alt="DocStory 서비스 화면" />
        </ImageContainer>
      </Container>
    </HeroWrapper>
  );
};

export default LandingHero;