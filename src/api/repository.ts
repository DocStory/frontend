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