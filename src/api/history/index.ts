import axios from '../axios';
import { UUID } from '../common/types';
import {
  HistoryCreateRequest,
  HistoryUpdateRequest,
  HistoryResponse,
  HistoryDetailResponse,
  HistoryListResponse,
  HistoryFileResponse
} from './types';
import { DocStoryResponseBody } from '../common/types';

const BASE = '/api/repositories';

export const createHistory = async (
  repositoryId: UUID,
  formData: FormData
) => {
  const res = await axios.post<DocStoryResponseBody<HistoryResponse>>(
    `${BASE}/${repositoryId}/history`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  return res.data;
};

export const getHistoryRootFiles = async (repositoryId: UUID) => {
  const res = await axios.get<DocStoryResponseBody<HistoryFileResponse[]>>(
    `${BASE}/${repositoryId}/history/files`
  );
  return res.data;
};

export const getFilteredHistories = async (
  repositoryId: UUID,
  rootIds?: UUID[],
  status: string = 'all'
) => {
  const params: any = {
    status,
  };
  if (rootIds) params.rootIds = rootIds;

  const res = await axios.get<DocStoryResponseBody<HistoryListResponse[][]>>(
    `${BASE}/${repositoryId}/history`,
    { params }
  );
  return res.data;
};

export const getHistoryDetail = async (
  repositoryId: UUID,
  historyId: UUID
) => {
  const res = await axios.get<DocStoryResponseBody<HistoryDetailResponse>>(
    `${BASE}/${repositoryId}/history/${historyId}`
  );
  return res.data;
};

export const updateHistory = async (
  repositoryId: UUID,
  historyId: UUID,
  data: HistoryUpdateRequest
) => {
  const res = await axios.put<DocStoryResponseBody<HistoryResponse>>(
    `${BASE}/${repositoryId}/history/${historyId}`,
    data
  );
  return res.data;
};
