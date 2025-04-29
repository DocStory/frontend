import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const HeroWrapper = styled.section`
  width: 100%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #F7FAFF 0%, #E3EDFF 100%);
  padding: 80px 16px 64px 16px;
`;

const Logo = styled.img`
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
`;

const Headline = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #1A237E;
  margin-bottom: 18px;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 1.25rem;
  color: #3B4A6B;
  margin-bottom: 36px;
  text-align: center;
  max-width: 480px;
`;

const HeroSection: React.FC = () => (
  <HeroWrapper aria-label="Hero" tabIndex={0}>
    <Logo src="/logo192.png" alt="DocStory 로고" />
    <Headline>문서의 새로운 시작, DocStory</Headline>
    <SubText>AI 기반 문서 요약, 검색, 협업까지 한 번에!<br />지금 바로 DocStory로 업무 효율을 경험하세요.</SubText>
    <Button variant="primary" size="large" aria-label="시작하기 버튼">시작하기</Button>
  </HeroWrapper>
);

export default HeroSection; 