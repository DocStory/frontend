import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheck, FiX, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  top: 80px;
  right: 24px;
  min-width: 320px;
  max-width: 400px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.shadow};
  border-left: 4px solid ${({ type, theme }) => 
    type === 'success' ? theme.success :
    type === 'error' ? theme.error : theme.warning};
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  animation: ${({ type }) => type ? slideIn : slideOut} 0.3s ease-out;
  font-family: 'Pretendard';
`;

const IconWrapper = styled.div<{ type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ type, theme }) =>
    type === 'success' ? 'rgba(16, 185, 129, 0.1)' :
    type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  color: ${({ type, theme }) =>
    type === 'success' ? theme.success :
    type === 'error' ? theme.error : theme.warning};
`;

const MessageText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  line-height: 1.4;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.hoverBackground};
  }
`;

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FiCheck size={14} />;
      case 'error':
        return <FiAlertCircle size={14} />;
      case 'warning':
        return <FiAlertTriangle size={14} />;
      default:
        return null;
    }
  };

  return (
    <ToastContainer type={toast.type}>
      <IconWrapper type={toast.type}>
        {getIcon()}
      </IconWrapper>
      <MessageText>{toast.message}</MessageText>
      <CloseButton onClick={() => onClose(toast.id)}>
        <FiX size={16} />
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast; 