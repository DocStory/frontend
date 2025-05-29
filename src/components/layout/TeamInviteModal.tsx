import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sendIcon from '../../assets/sendIcon.svg';
import MemberList from '../common/MemberList';
import ModalHeader from '../common/ModalHeader';
import { getTeamMembers, updateTeamMemberRole, removeTeamMember } from '../../api/team';
import { UUID } from '../../api/common/types';
import { inviteUserToTeam } from '../../api/teaminvite';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
  repositoryId: UUID;
}

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 444px;
  height: 660px;
  background: white;
  border-radius: 24px;
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  background: #f8f8f8;
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  border-radius: 0 0 24px 24px;
`;

const InputSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const EmailInput = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  transition: border-color 0.2s ease;
  flex: 1;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #4078FF;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #6c9eff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.144em;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  box-shadow: 0px 4px 40px 0px rgba(255, 133, 95, 0.04);

  &:hover {
    background: #5b8def;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
`;

const SendIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const TeamInviteModal: React.FC<TeamInviteModalProps> = ({
  isOpen,
  onClose,
  repositoryId = "1a728c51-4cca-43b5-a41e-08c1edcc33f6",
}) => {
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState<Array<{
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'reviewer' | 'contributor';
  }>>([]);

  const fetchTeamMembers = async () => {
    try {
      const response = await getTeamMembers(repositoryId);

      if (response.data) {
        const formattedMembers = response.data
          .map((member) => ({
          id: member.userId,
          name: member.nickname,
          email: member.email,
          role: member.role.toLowerCase() as 'admin' | 'reviewer' | 'contributor',
        }))

        const sortedMembers = formattedMembers.sort((a, b) => {
          if (a.role === 'admin' && b.role !== 'admin') return -1;
          if (b.role === 'admin' && a.role !== 'admin') return 1;

          return a.name.localeCompare(b.name, 'ko');
        });

        setMembers(sortedMembers);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTeamMembers();
    }
  }, [isOpen, repositoryId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInvite = async () => {
    if (email.trim()) {
      try {
        await inviteUserToTeam({
          repositoryId,
          email: email.trim(),
        });
        setEmail('');
        await fetchTeamMembers();
      } catch (error) {
        console.error('Failed to invite user:', error);
      }
    }
  };

  const handleRoleChange = async (id: string, role: 'admin' | 'reviewer' | 'contributor') => {
    try {
      await updateTeamMemberRole(repositoryId, id, { role: role.toUpperCase() });
      await fetchTeamMembers();
    } catch (error) {
      console.error('Failed to update member role:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeTeamMember(repositoryId, id);
      await fetchTeamMembers();
    } catch (error) {
      console.error('Failed to remove team member:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer isOpen={isOpen} onClick={handleOverlayClick} tabIndex={-1} aria-label="모달 오버레이">
      <ModalContent onClick={e => e.stopPropagation()} tabIndex={0} aria-label="모달 내용">
        <ModalHeader title="멤버 초대" onClose={onClose}/>
        <ModalBody>
          <InputSection>
            <InputContainer>
              <EmailInput
                type='email'
                placeholder='이메일을 입력해주세요'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SendButton onClick={handleInvite} disabled={!email.trim()}>
                <SendIcon src={sendIcon} alt='send' />
                초대하기
              </SendButton>
            </InputContainer>
          </InputSection>

          <MemberList
            members={members}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
          />
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default TeamInviteModal;
