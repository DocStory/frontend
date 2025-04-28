import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const sizeStyles = {
  small: css`
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 7px;
    height: 29px;
    min-width: 92px;
    font-weight: 600;
  `,
  medium: css`
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 7px;
    height: 41px;
    min-width: 110px;
    font-weight: 600;
  `,
  large: css`
    font-size: 22px;
    padding: 8px 12px;
    border-radius: 10px;
    height: 54px;
    min-width: 240px;
    font-weight: 600;
  `,
};

const variantStyles = {
  primary: css`
    background: #6C9EFF;
    color: #FDFDFD;
    border: none;
    &:hover:not(:disabled) { background: #4078FF; }
    &:active:not(:disabled) { background: #2257C7; }
    &:disabled { background: #B3CFFF; color: #FDFDFD; cursor: not-allowed; }
  `,
  secondary: css`
    background: #FFFFFF;
    color: #8CB3FF;
    border: 2px solid #8CB3FF;
    &:hover:not(:disabled) { background: #E6F0FF; border-color: #4078FF; color: #4078FF; }
    &:active:not(:disabled) { background: #D0E3FF; border-color: #2257C7; color: #2257C7; }
    &:disabled { background: #F5F7FA; color: #B3CFFF; border-color: #B3CFFF; cursor: not-allowed; }
  `,
  outline: css`
    background: #FFFFFF;
    color: #292929;
    border: 2px solid #F0F0F0;
    &:hover:not(:disabled) { background: #F5F7FA; border-color: #CBD5E1; }
    &:active:not(:disabled) { background: #E5E7EB; border-color: #CBD5E1; }
    &:disabled { background: #F5F7FA; color: #B3CFFF; border-color: #F0F0F0; cursor: not-allowed; }
  `,
  danger: css`
    background: #FF4D4F;
    color: #FFF;
    border: none;
    &:hover:not(:disabled) { background: #D9363E; }
    &:active:not(:disabled) { background: #A5282C; }
    &:disabled { background: #FFB3B5; color: #FFF; border: none; cursor: not-allowed; }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Pretendard', 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  transition: background 0.2s, color 0.2s, border 0.2s;
  outline: none;
  ${(props) => sizeStyles[props.$size]}
  ${(props) => variantStyles[props.$variant]}
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
}) => {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 