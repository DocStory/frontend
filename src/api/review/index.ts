import api from '../axios';
import {
  Review,
  ReviewCreateRequest,
  ReviewListResponse,
  ReviewResponse,
  ReviewUpdateRequest,
} from './types';

export const createReview = async (
  proposalId: string,
  request: ReviewCreateRequest
): Promise<ReviewResponse> => {
  const { data } = await api.post<ReviewResponse>(
    `/api/proposals/${proposalId}/reviews`,
    request
  );
  return data;
};

export const getReviewsByProposal = async (
  proposalId: string
): Promise<ReviewListResponse> => {
  const { data } = await api.get<ReviewListResponse>(
    `/api/proposals/${proposalId}/reviews`
  );
  return data;
};

export const updateReview = async (
  proposalId: string,
  reviewId: string,
  request: ReviewUpdateRequest
): Promise<ReviewResponse> => {
  const { data } = await api.put<ReviewResponse>(
    `/api/proposals/${proposalId}/reviews/${reviewId}`,
    request
  );
  return data;
};

export const deleteReview = async (
  proposalId: string,
  reviewId: string
): Promise<void> => {
  await api.delete(`/api/proposals/${proposalId}/reviews/${reviewId}`);
}; 