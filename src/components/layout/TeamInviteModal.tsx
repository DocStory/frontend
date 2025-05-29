import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sendIcon from '../../assets/sendIcon.svg';
import MemberList from '../common/MemberList';
import ModalHeader from '../common/ModalHeader';
import { getTeamMembers, updateTeamMemberRole, removeTeamMember } from '../../api/team';
import { UUID } from '../../api/common/types';
import { inviteUserToTeam } from '../../api/teaminvite';
import Button from '../common/Button';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
  repositoryId: UUID;
}

const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  width: 95%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 15px;
  border: 3px solid #CBD5E1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  color: #1f2937;
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
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
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        await inviteUserToTeam({
          repositoryId,
          email: email.trim(),
        });
        setEmail('');
        await fetchTeamMembers();
      } catch (error) {
        console.error('Failed to invite user:', error);
      } finally {
        setIsLoading(false);
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
            </InputContainer>
          </InputSection>

          <MemberList
            members={members}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
          />

          <ButtonRow>
            <Button
              variant="secondary"
              size="medium"
              onClick={onClose}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleInvite}
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? '초대 중...' : '초대하기'}
            </Button>
          </ButtonRow>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default TeamInviteModal;
