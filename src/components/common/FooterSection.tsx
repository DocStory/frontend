import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  background: #1A237E;
  color: #FDFDFD;
  padding: 40px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const FooterLink = styled.a`
  color: #B3CFFF;
  text-decoration: none;
  font-size: 1rem;
  &:hover { color: #fff; text-decoration: underline; }
`;

const Copyright = styled.div`
  font-size: 0.95rem;
  color: #B3CFFF;
`;

const FooterSection: React.FC = () => (
  <FooterWrapper aria-label="푸터" tabIndex={0}>
    <Links>
      <FooterLink href="#" aria-label="이용약관" tabIndex={0}>이용약관</FooterLink>
      <FooterLink href="#" aria-label="개인정보처리방침" tabIndex={0}>개인정보처리방침</FooterLink>
      <FooterLink href="#" aria-label="문의하기" tabIndex={0}>문의하기</FooterLink>
    </Links>
    <Copyright>© 2024 DocStory. All rights reserved.</Copyright>
  </FooterWrapper>
);

export default FooterSection; 