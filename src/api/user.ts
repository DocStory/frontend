import api from './axios';

export interface UserInfo {
  providerId: string;
  nickname: string;
  profileImage: string;
  email?: string;
}

export interface UserApiResponse {
  code: number;
  message: string;
  data: UserInfo;
}

export interface UserAuthority {
  repositoryId: string;
  authority: string;
}

export interface UserAuthorityApiResponse {
  code: number;
  message: string;
  data: UserAuthority;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await api.get<UserApiResponse>('/api/users/me');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
}; 

export const getUserAuthority = async (repositoryId: string): Promise<UserAuthority> => {
  try {
    const response = await api.get<UserAuthorityApiResponse>(`/api/users/me/repositories/${repositoryId}/authority`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch authority for repository ${repositoryId}:`, error);
    throw error;
  }
};