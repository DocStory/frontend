import api from './axios';

export interface CreateRepositoryRequest {
  name: string;
  description: string;
}

export interface CreateRepositoryResponse {
  code: number;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    ownerNickname: string;
  };
}

export const createRepository = async (
  repositoryData: CreateRepositoryRequest
): Promise<CreateRepositoryResponse> => {
  const response = await api.post<CreateRepositoryResponse>('/api/repositories', repositoryData);
  return response.data;
};

export interface Repository {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  lastModified: string;
  isPrivate: boolean;
  tags?: string[];
}

export interface RepositoryFile {
  id: string;
  originFilename: string;
  saveFilename: string;
  filepath: string;
  fileType: string;
  level: number;
  createdAt: string;
}

export interface RepositoryOwner {
  id: string;
  nickname: string;
  email: string;
}

export interface RepositoryDetail {
  id: string;
  name: string;
  description: string;
  owner: RepositoryOwner;
  rootFiles: RepositoryFile[];
  fileTypes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RepositoryResponse {
  code: number;
  message: string;
  data: Repository[];
}

export interface RepositoryDetailResponse {
  code: number;
  message: string;
  data: RepositoryDetail;
}

export const getRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await api.get<RepositoryResponse>('/api/repositories');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    throw error;
  }
};

export const getRepositoryDetail = async (repositoryId: string): Promise<RepositoryDetail> => {
  try {
    const response = await api.get<RepositoryDetailResponse>(`/api/repositories/${repositoryId}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch repository detail:', error);
    throw error;
  }
}; 