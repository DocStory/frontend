import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import api from '../api/axios';

export interface Repository {
  id: string;
  name: string;
  description: string;
  ownerNickname: string;
  myRole: string;
  isFavorite: boolean;
  fileTypes?: string[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: Repository[];
}

interface RepositoryContextValue {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  fetchRepositories: () => Promise<void>;
  addRepository: (repository: Repository) => void;
  refreshRepositories: () => Promise<void>;
}

const RepositoryContext = createContext<RepositoryContextValue | undefined>(undefined);

export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};

interface RepositoryProviderProps {
  children: ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse>('/api/repositories/my');
      setRepositories(response.data.data);
    } catch (err: any) {
      console.error('내 레포지토리 목록 조회 실패:', err);
      setError(err.response?.data?.message || err.message || '레포지토리 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addRepository = useCallback((repository: Repository) => {
    setRepositories(prev => [repository, ...prev]);
  }, []);

  const refreshRepositories = useCallback(async () => {
    await fetchRepositories();
  }, [fetchRepositories]);

  const value: RepositoryContextValue = {
    repositories,
    loading,
    error,
    fetchRepositories,
    addRepository,
    refreshRepositories,
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}; 