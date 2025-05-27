import axios from '../axios';
import { UUID } from '../common/types.ts';
import { DocStoryResponseBody } from '../common/types.ts';
import {
  TeamInviteRequest,
  TeamInviteResponse,
  UserInvitation,
} from './types';

/** 팀원 초대 */
export const inviteUserToTeam = async (data: TeamInviteRequest) => {
  const res = await axios.post<DocStoryResponseBody<TeamInviteResponse>>(
    `/api/team-invites`,
    data
  );
  return res.data;
};

/** 초대 수락 */
export const acceptTeamInvite = async (inviteId: UUID) => {
  const res = await axios.post<DocStoryResponseBody<TeamInviteResponse>>(
    `/api/team-invites/${inviteId}/accept`
  );
  return res.data;
};

/** 초대 거절 */
export const rejectTeamInvite = async (inviteId: UUID) => {
  const res = await axios.post<DocStoryResponseBody<TeamInviteResponse>>(
    `/api/team-invites/${inviteId}/reject`
  );
  return res.data;
};

/** 받은 초대 목록 조회 */
export const getMyInvitations = async () => {
  const res = await axios.get<DocStoryResponseBody<UserInvitation[]>>(
    `/api/users/me/invitations`
  );
  return res.data;
};