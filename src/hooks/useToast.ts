import { useState, useCallback } from 'react';

interface ToastState {
  type: 'success' | 'error' | 'warning';
  message: string;
  isVisible: boolean;
  id: number;
}

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    const id = ++toastId;
    const newToast: ToastState = {
      type,
      message,
      isVisible: true,
      id,
    };

    setToasts(prev => [...prev, newToast]);

    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3300); // 애니메이션 시간 고려
  }, []);

  const hideToast = useCallback((id: number) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, isVisible: false } : toast
    ));

    // 애니메이션 후 완전 제거
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const success = useCallback((message: string) => {
    showToast('success', message);
  }, [showToast]);

  const error = useCallback((message: string) => {
    showToast('error', message);
  }, [showToast]);

  const warning = useCallback((message: string) => {
    showToast('warning', message);
  }, [showToast]);

  return {
    toasts,
    success,
    error,
    warning,
    hideToast,
  };
}; 