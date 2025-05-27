export interface TeamInviteRequest {
  repositoryId: string;
  email: string;
}

export interface TeamInviteResponse {
  inviteId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
