import { UUID } from '../common/types';

export type ProposalStatus = 'OPEN' | 'CLOSED' | 'MERGED';

export type ProposalFilterType = 'ALL' | 'OPEN' | 'CLOSED';

export type FileType = 'HWP' | 'DOCX' | 'PDF' | 'HWPX';

export interface ProposalCreateRequest {
  historyId: UUID;
  title: string;
  description?: string;
}

export interface ProposalResponse {
  id: UUID;
  title: string;
  description: string;
  status: ProposalStatus;
}

export interface ProposalDetailResponse {
  id: UUID;
  title: string;
  description: string;
  createdBy: {
    providerId: string;
    nickname: string;
    profileImage: string;
    email: string;
  },
  CreatedAt: string;
  file: {
    id: UUID;
    name: string;
    fileType: FileType;
  };
}

export interface ProposalUpdateRequest {
  title: string;
  description?: string;
}

export interface ProposalStatusUpdateRequest {
  status: ProposalStatus;
}
