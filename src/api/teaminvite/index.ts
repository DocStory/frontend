import axios from '../axios';
import { UUID } from '../common/types.ts';
import { DocStoryResponseBody } from '../common/types.ts';
import {
  TeamInviteRequest,
  TeamInviteResponse,
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
