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
}

const ListContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 16px;
`;

const Title = styled.h3`
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.surface};

  &:last-child {
    margin-bottom: 0;
  }
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
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const MemberEmail = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Pretendard', sans-serif;
`;

const RoleText = styled.span`
  font-family: 'Pretendard';
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
`;

const RoleBadge = styled.span`
  font-family: 'Pretendard';
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const HostButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 11px 12px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
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
}) => {
  return (
    <ListContainer>
      <Title>멤버 리스트 :</Title>
      {members.map((member) => (
        <MemberItem key={member.id}>
          <MemberInfo>
            <Avatar src={avatarIcon} alt={member.name} />
            <MemberDetails>
              <MemberName>{member.name}</MemberName>
              <MemberEmail>{member.email}</MemberEmail>
            </MemberDetails>
          </MemberInfo>
          {member.role === 'admin' ? (
            <HostButton>호스트</HostButton>
          ) : (
            <ToggleButton
              currentValue={member.role}
              options={[
                { label: '편집 가능', value: 'contributor' },
                { label: '보기 가능', value: 'reviewer' },
              ]}
              onChange={(value) =>
                onRoleChange?.(
                  member.id,
                  value as 'admin' | 'reviewer' | 'contributor'
                )
              }
              onDelete={() => onDelete?.(member.id)}
            />
          )}
        </MemberItem>
      ))}
    </ListContainer>
  );
};

export default MemberList;
