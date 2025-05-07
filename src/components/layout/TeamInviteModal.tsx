import React, { useState } from 'react';
import styled from 'styled-components';
import sendIcon from '../../assets/sendIcon.svg';
import MemberList from '../common/MemberList';
import ModalHeader from '../common/ModalHeader';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
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
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e0dad9;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  font-family: 'Pretendard', sans-serif;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    outline: none;
    border-color: #6c9eff;
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
  onInvite,
}) => {
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([
    {
      id: '1',
      name: '홍길동',
      email: 'Marvin McKinney@gmail.com',
      role: 'admin' as const,
    },
    {
      id: '2',
      name: '홍길동',
      email: 'Marvin McKinney@gmail.com',
      role: 'reviewer' as const,
    },
    {
      id: '3',
      name: '홍길동',
      email: 'Marvin McKinney@gmail.com',
      role: 'contributor' as const,
    },
  ]);

  const handleInvite = () => {
    if (email.trim()) {
      onInvite(email);
      setEmail('');
    }
  };

  const handleRoleChange = (
    id: string,
    role: 'admin' | 'reviewer' | 'contributor'
  ) => {
    setMembers(
      members.map((member) => (member.id === id ? { ...member, role } : member))
    );
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
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
