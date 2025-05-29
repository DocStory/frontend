import axios from '../axios';
import { UUID, DocStoryResponseBody } from '../common/types';
import {
  TeamMemberResponse,
  RoleUpdateRequest,
  RoleUpdateResponse,
} from './types';

/** 팀원 목록 조회 */
export const getTeamMembers = async (repositoryId: UUID) => {
  const res = await axios.get<DocStoryResponseBody<TeamMemberResponse[]>>(
    `/api/repositories/${repositoryId}/team-members`
  );
  return res.data;
};

/** 팀원 권한 변경 */
export const updateTeamMemberRole = async (
  repositoryId: UUID,
  memberId: UUID,
  data: RoleUpdateRequest
) => {
  const res = await axios.put<DocStoryResponseBody<RoleUpdateResponse>>(
    `/api/repositories/${repositoryId}/team-members/${memberId}/role`,
    data
  );
  return res.data;
};

/** 팀원 추방 */
export const removeTeamMember = async (
  repositoryId: UUID,
  memberId: UUID
) => {
  const res = await axios.delete<DocStoryResponseBody<null>>(
    `/api/repositories/${repositoryId}/team-members/${memberId}`
  );
  return res.data;
};