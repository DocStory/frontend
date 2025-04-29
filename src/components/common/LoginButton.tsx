import React from 'react';
import styled, { css } from 'styled-components';

interface LoginButtonProps {
  type: 'google' | 'kakao' | 'guest';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = styled.button<{ $type: 'google' | 'kakao' | 'guest' }>`
  width: 327px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Pretendard', 'Inter', sans-serif;
  font-size: 16px;
  font-weight: ${(props) => (props.$type === 'guest' ? 700 : 500)};
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
  ${(props) =>
    props.$type === 'google'
      ? css`
          background: #fff;
          color: rgba(0,0,0,0.5);
          border: 1.5px solid rgba(11,70,84,0.25);
        `
      : props.$type === 'kakao'
      ? css`
          background: #FEE500;
          color: #000;
          border: none;
        `
      : css`
          background: #6C9EFF;
          color: #fff;
          border: none;
          font-weight: 700;
          box-shadow: 0px 5px 10px 0px rgba(81, 103, 125, 0.25);
          &:hover { background: #4078FF; }
          &:active { background: #2257C7; }
        `}
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const LoginButton: React.FC<LoginButtonProps> = ({ type, onClick, children, className }) => (
  <Button
    $type={type}
    onClick={onClick}
    aria-label={typeof children === 'string' ? children : undefined}
    tabIndex={0}
    className={className}
  >
    {(type === 'google' || type === 'kakao') && (
      <Icon
        src={type === 'google' ? '/assets/googleIcon.svg' : '/assets/kakaoIcon.svg'}
        alt={type === 'google' ? '구글 아이콘' : '카카오 아이콘'}
        aria-hidden
      />
    )}
    {children}
  </Button>
);

export default LoginButton; 