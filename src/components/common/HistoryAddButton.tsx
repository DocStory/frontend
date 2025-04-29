import React from 'react';
import styled from 'styled-components';

interface HistoryAddButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

const StyledButton = styled.button<{
  disabled?: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6C9EFF;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: 'Inter', 'Pretendard', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 35px;
  font-weight: 500;
  line-height: 40px;
  position: relative;
  top: -1px;
  transition: background 0.2s;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  &:hover:not(:disabled) {
    background: #4078FF;
  }
  &:active:not(:disabled) {
    background: #2257C7;
  }
  &:disabled {
    background: #B3CFFF;
    color: #FFF;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const HistoryAddButton: React.FC<HistoryAddButtonProps> = ({
  onClick,
  disabled = false,
  'aria-label': ariaLabel = '히스토리 추가',
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as any);
    }
  };

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={0}
      className={className}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <span style={{ display: 'inline-block', position: 'relative', top: '-2px' }}>+</span>
    </StyledButton>
  );
};

export default HistoryAddButton; 