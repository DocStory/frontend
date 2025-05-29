import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/common/ToastContainer';

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { success, error, warning, toasts, hideToast } = useToast();

  const value: ToastContextValue = {
    success,
    error,
    warning,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* 토스트들을 렌더링 */}
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              position: 'fixed',
              top: `${80 + (toasts.indexOf(toast) * 80)}px`,
              right: '24px',
            }}
          >
            <div
              style={{
                minWidth: '320px',
                maxWidth: '400px',
                padding: '16px 20px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                borderLeft: `4px solid ${
                  toast.type === 'success' ? '#10B981' : 
                  toast.type === 'error' ? '#EF4444' : '#F59E0B'
                }`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'Pretendard',
                animation: toast.isVisible ? 
                  'slideIn 0.3s ease-out' : 
                  'slideOut 0.3s ease-out',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: toast.type === 'success' ? '#DCFCE7' : 
                    toast.type === 'error' ? '#FEE2E2' : '#FEF3C7',
                  color: toast.type === 'success' ? '#10B981' : 
                    toast.type === 'error' ? '#EF4444' : '#F59E0B',
                }}
              >
                {toast.type === 'success' ? '✓' : 
                 toast.type === 'error' ? '✕' : '⚠'}
              </div>
              <span
                style={{
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  lineHeight: 1.4,
                }}
              >
                {toast.message}
              </span>
              <button
                onClick={() => hideToast(toast.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}; 