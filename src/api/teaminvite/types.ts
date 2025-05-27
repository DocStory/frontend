import { UUID } from '../common/types';

export interface TeamInviteRequest {
  repositoryId: UUID;
  email: string;
}

export interface TeamInviteResponse {
  inviteId: UUID;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface UserInvitation {
  invitationId: UUID;
  inviterNickname: string;
  repositoryName: string;
}