import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
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

const ToastContainer = styled.div<{ isVisible: boolean; type: string }>`
  position: fixed;
  top: 80px;
  right: 24px;
  min-width: 320px;
  max-width: 400px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-left: 4px solid ${({ type }) => 
    type === 'success' ? '#10B981' : 
    type === 'error' ? '#EF4444' : '#F59E0B'};
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  animation: ${({ isVisible }) => isVisible ? slideIn : slideOut} 0.3s ease-out;
  font-family: 'Pretendard';
`;

const IconWrapper = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ type }) => 
    type === 'success' ? '#DCFCE7' : 
    type === 'error' ? '#FEE2E2' : '#FEF3C7'};
  color: ${({ type }) => 
    type === 'success' ? '#10B981' : 
    type === 'error' ? '#EF4444' : '#F59E0B'};
`;

const MessageText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
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
  color: #9CA3AF;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #6B7280;
    background: #F3F4F6;
  }
`;

const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck size={16} />;
      case 'error':
        return <FiX size={16} />;
      case 'warning':
        return <FiAlertCircle size={16} />;
      default:
        return <FiCheck size={16} />;
    }
  };

  if (!isVisible) return null;

  return (
    <ToastContainer isVisible={isVisible} type={type}>
      <IconWrapper type={type}>
        {getIcon()}
      </IconWrapper>
      <MessageText>{message}</MessageText>
      <CloseButton onClick={onClose}>
        <FiX size={16} />
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast; 