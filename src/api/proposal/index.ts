import axios from '../axios';
import { UUID, DocStoryResponseBody } from '../common/types';
import {
  ProposalCreateRequest,
  ProposalResponse,
  ProposalFilterType
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
  const res = await axios.get<DocStoryResponseBody<ProposalResponse>>(
    `/api/proposals/${proposalId}`
  );
  return res.data;
};