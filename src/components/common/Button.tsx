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
    background: ${({ theme }) => theme.primary};
    color: #FDFDFD;
    border: none;
    &:hover:not(:disabled) { 
      background: ${({ theme }) => theme.primaryHover}; 
    }
    &:active:not(:disabled) { 
      background: ${({ theme }) => theme.primaryHover}; 
      filter: brightness(0.9);
    }
    &:disabled { 
      background: ${({ theme }) => theme.textSecondary}; 
      color: #FDFDFD; 
      cursor: not-allowed; 
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
    &:hover:not(:disabled) { 
      background: ${({ theme }) => theme.hoverBackground}; 
      border-color: ${({ theme }) => theme.primaryHover}; 
      color: ${({ theme }) => theme.primaryHover}; 
    }
    &:active:not(:disabled) { 
      background: ${({ theme }) => theme.activeBackground}; 
      border-color: ${({ theme }) => theme.primaryHover}; 
      color: ${({ theme }) => theme.primaryHover}; 
    }
    &:disabled { 
      background: ${({ theme }) => theme.surface}; 
      color: ${({ theme }) => theme.textSecondary}; 
      border-color: ${({ theme }) => theme.textSecondary}; 
      cursor: not-allowed; 
    }
  `,
  outline: css`
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    border: 2px solid ${({ theme }) => theme.border};
    &:hover:not(:disabled) { 
      background: ${({ theme }) => theme.hoverBackground}; 
      border-color: ${({ theme }) => theme.borderLight}; 
    }
    &:active:not(:disabled) { 
      background: ${({ theme }) => theme.surface}; 
      border-color: ${({ theme }) => theme.borderLight}; 
    }
    &:disabled { 
      background: ${({ theme }) => theme.surface}; 
      color: ${({ theme }) => theme.textSecondary}; 
      border-color: ${({ theme }) => theme.border}; 
      cursor: not-allowed; 
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.error};
    color: #FFF;
    border: none;
    &:hover:not(:disabled) { 
      background: ${({ theme }) => theme.error}; 
      filter: brightness(0.9);
    }
    &:active:not(:disabled) { 
      background: ${({ theme }) => theme.error}; 
      filter: brightness(0.8);
    }
    &:disabled { 
      background: ${({ theme }) => theme.textSecondary}; 
      color: #FFF; 
      border: none; 
      cursor: not-allowed; 
    }
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
  transition: all 0.2s ease;
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