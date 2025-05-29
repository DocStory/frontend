import axios from '../axios';
import { UUID, DocStoryResponseBody } from '../common/types';
import {
  ProposalCreateRequest,
  ProposalResponse,
  ProposalFilterType,
  ProposalDetailResponse,
  ProposalUpdateRequest,
  ProposalStatusUpdateRequest
} from './types';

/** Proposal 생성 */
export const createProposal = async (
  data: ProposalCreateRequest
) => {
  const res = await axios.post<DocStoryResponseBody<ProposalResponse>>(
    `/api/proposals`,
    data
  );
  return res.data;
};

/** 레포지토리 내 Proposal 목록 조회 (필터 포함) */
export const getProposalsByRepository = async (
  repositoryId: UUID,
  filter: ProposalFilterType
) => {
  const res = await axios.get<DocStoryResponseBody<ProposalResponse[]>>(
    `/api/proposals/repository/${repositoryId}`,
    {
      params: { filter },
    }
  );
  return res.data;
};

/** Proposal 단건 조회 */
export const getProposalById = async (proposalId: UUID) => {
  const res = await axios.get<DocStoryResponseBody<ProposalDetailResponse>>(
    `/api/proposals/${proposalId}`
  );
  return res.data;
};

/** Proposal 수정 */
export const updateProposal = async (
  proposalId: UUID,
  data: ProposalUpdateRequest
) => {
  const res = await axios.put<DocStoryResponseBody<ProposalResponse>>(
    `/api/proposals/${proposalId}`,
    data
  );
  return res.data;
};

/** Proposal 병합 */
export const mergeProposal = async (
  proposalId: UUID
) => {
  const res = await axios.patch<DocStoryResponseBody<ProposalResponse>>(
    `/api/proposals/${proposalId}/merge`
  );
  return res.data;
};

export const updateProposalStatus = async (
  proposalId: UUID,
  data: ProposalStatusUpdateRequest
) => {
  const res = await axios.patch<DocStoryResponseBody<ProposalResponse>>(
    `/api/proposals/${proposalId}/status`,
    data
  );
  return res.data;
};