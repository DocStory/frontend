import React from 'react';
import styled from 'styled-components';
import Toast from './Toast';
import { useToast } from '../../hooks/useToast';

const Container = styled.div`
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  return (
    <Container>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </Container>
  );
};

export default ToastContainer; 