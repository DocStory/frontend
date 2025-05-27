import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserInfo, getUserInfo } from '../api/user';

interface UserContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userInfo: null,
  loading: true,
  error: null,
  refetchUser: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserInfo();
      setUserInfo(data);
    } catch (err) {
      setError(err as Error);
      console.error('사용자 정보 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetchUser = async () => {
    await fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value: UserContextType = {
    userInfo,
    loading,
    error,
    refetchUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 