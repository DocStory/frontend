import { UserInfo } from '../user';

export interface ReviewCreateRequest {
  comment: string;
  parentId?: string;
}

export interface ReviewUpdateRequest {
  comment: string;
}

export interface Review {
  id: string;
  proposalId: string;
  reviewer: UserInfo;
  comment: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  replies: Review[];
}

export interface ReviewListResponse {
  code: number;
  message: string;
  data: Review[];
}

export interface ReviewResponse {
  code: number;
  message: string;
  data: Review;
} 