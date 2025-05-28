import { UUID } from '../common/types';

export interface HistoryCreateRequest {
  title: string;
  content?: string;
  parentFileId?: UUID;
}

export interface HistoryUpdateRequest {
  title: string;
  content?: string;
}

export interface HistoryResponse {
  id: UUID;
  title: string;
  content: string;
  fileName: string;
  parentFileName: string | null;
}

export interface HistoryDetailResponse {
  Id: string;
  title: string;
  content: string;
  files: DetailFileResponse[];
  createdBy: UserResponse;
  createAt: string;
}

export interface HistoryListResponse {
  id: UUID;
  title: string;
  content: string;
  fileLevel: number;
  createdBy: UserResponse;
  createdAt: string;
  fileId: UUID;
  parentFileId?: UUID;
  historyStatus: 'MAIN' | 'SUB' | 'ABAND';
}

export interface HistoryFileResponse {
  id: UUID;
  fileName: string;
}

export interface FileResponse {
  id: UUID;
  fileName: string;
  fileLevel: number;
}

export interface UserResponse {
  providerId: string;
  nickname: string;
  profileImage: string;
  email: string;
}

export interface DetailFileResponse {
  id: string;
  name: string;
  fileType: string;
}
