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

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await api.get<UserApiResponse>('/api/users/me');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
}; 