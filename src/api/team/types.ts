import { UUID } from '../common/types';

export type Role = 'ADMIN' | 'REVIEWER' | 'CONTRIBUTOR';

export interface TeamMemberResponse {
  userId: UUID;
  nickname: string;
  profileImage: string;
  email: string;
  role: Role;
}

export interface RoleUpdateRequest {
  role: Role;
}

export interface RoleUpdateResponse {
  userId: UUID;
  nickname: string;
  role: Role;
}
