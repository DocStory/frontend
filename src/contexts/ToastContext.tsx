import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import ToastContainer from '../components/common/ToastContainer';

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

const ToastWrapper = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(1);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = nextId;
    setNextId(prev => prev + 1);
    
    const newToast: Toast = { id, type, message };
    setToasts(prev => [...prev, newToast]);

    // 자동 제거 (3초 후)
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, [nextId]);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string) => addToast('success', message), [addToast]);
  const error = useCallback((message: string) => addToast('error', message), [addToast]);
  const warning = useCallback((message: string) => addToast('warning', message), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, warning, removeToast }}>
      {children}
      <ToastWrapper>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </ToastWrapper>
    </ToastContext.Provider>
  );
}; 