import { UUID } from '../common/types';

export type ProposalStatus = 'OPEN' | 'IN_REVIEW' | 'CLOSED';

export type ProposalFilterType = 'ALL' | 'OPEN' | 'CLOSED';

export interface ProposalCreateRequest {
  historyId: UUID;
  title: string;
  description?: string;
}

export interface ProposalResponse {
  proposalId: UUID;
  title: string;
  description: string;
  status: ProposalStatus;
}
