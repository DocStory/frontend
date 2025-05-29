import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  background: #0F172A;
  padding: 60px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 40px;
  margin-bottom: 40px;
`;

const Column = styled.div`
  min-width: 200px;
  margin-bottom: 30px;
`;

const ColumnTitle = styled.h4`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

const Link = styled.a`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #CBD5E1;
  text-decoration: none;
  display: block;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    color: #6C9EFF;
  }
`;

const Copyright = styled.div`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #94A3B8;
  text-align: center;
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

const Brand = styled.span`
  font-family: 'Inter', 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: 20px;
  color: #6C9EFF;
`;

const LandingFooter: React.FC = () => (
  <FooterWrapper aria-label="푸터" tabIndex={0}>
    <Content>
      <Column>
        <LogoRow>
          <LogoImg src="/src/assets/logo.svg" alt="DocStory 로고" />
          <Brand>DocStory</Brand>
        </LogoRow>
        <Link href="mailto:contact@docstory.io">contact@docstory.io</Link>
      </Column>
      <Column>
        <ColumnTitle>제품</ColumnTitle>
        <Link href="#features">주요 기능</Link>
        <Link href="#how">사용 방법</Link>
        <Link href="#pricing">요금제</Link>
      </Column>
      <Column>
        <ColumnTitle>회사</ColumnTitle>
        <Link href="/about">소개</Link>
        <Link href="/careers">채용</Link>
      </Column>
      <Column>
        <ColumnTitle>법적 정보</ColumnTitle>
        <Link href="/terms">이용약관</Link>
        <Link href="/privacy">개인정보처리방침</Link>
      </Column>
    </Content>
    <Copyright>© {new Date().getFullYear()} DocStory. All rights reserved.</Copyright>
  </FooterWrapper>
);

export default LandingFooter; 