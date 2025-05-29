import React from 'react';
import styled from 'styled-components';
import ToggleButton from './ToggleButton';
import avatarIcon from '../../assets/avatar.svg';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'contributor';
}

interface MemberListProps {
  members: Member[];
  onRoleChange?: (
    id: string,
    role: 'admin' | 'reviewer' | 'contributor'
  ) => void;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}

const ListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
`;

const ListTitle = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #0a171f;
  margin: 0 0 24px 0;
  font-family: 'Pretendard', sans-serif;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #ededec;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MemberDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MemberName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Pretendard', sans-serif;
`;

const MemberEmail = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-family: 'Pretendard', sans-serif;
`;

const HostButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 11px 12px;
  background: #f8f3f1;
  color: #161414;
  border: 1px solid #ededec;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.144em;
  font-family: 'Pretendard', sans-serif;
  box-shadow: 0px 4px 40px 0px rgba(255, 133, 95, 0.04);
`;

const RoleText = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 11px 12px;
  background: #f8f3f1;
  color: #161414;
  border: 1px solid #ededec;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.144em;
  font-family: 'Pretendard', sans-serif;
  box-shadow: 0px 4px 40px 0px rgba(255, 133, 95, 0.04);
`;

const MemberList: React.FC<MemberListProps> = ({
  members,
  onRoleChange,
  onDelete,
  isAdmin,
}) => {
  return (
    <ListContainer>
      <ListTitle>멤버 리스트 :</ListTitle>
      {members.map((member) => (
        <ListItem key={member.id}>
          <MemberInfo>
            <Avatar src={avatarIcon} alt={member.name} />
            <MemberDetails>
              <MemberName>{member.name}</MemberName>
              <MemberEmail>{member.email}</MemberEmail>
            </MemberDetails>
          </MemberInfo>
          {member.role === 'admin' ? (
            <HostButton>호스트</HostButton>
          ) : isAdmin ? (
            <ToggleButton
              currentValue={member.role}
              options={[
                { label: '편집 가능', value: 'reviewer' },
                { label: '보기 가능', value: 'contributor' },
              ]}
              onChange={(value) =>
                onRoleChange?.(
                  member.id,
                  value as 'admin' | 'reviewer' | 'contributor'
                )
              }
              onDelete={() => onDelete?.(member.id)}
            />
          ) : (
            <RoleText>
              {member.role === 'reviewer' ? '편집 가능' : '보기 가능'}
            </RoleText>
          )}
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default MemberList;
