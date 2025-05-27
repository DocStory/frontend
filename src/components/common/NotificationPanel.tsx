import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import NotificationPanelItem from './NotificationPanelItem';
import memberinviteIcon from '../../assets/memberinviteIcon.svg';
import folderIcon from '../../assets/folderIcon.svg';
import { getMyInvitations, acceptTeamInvite, rejectTeamInvite } from '../../api/teaminvite';
import { UserInvitation } from '../../api/teaminvite/types';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.15);
  z-index: 2000;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const PanelWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #f8f8f8;
  padding: 32px 24px 0 24px;
  display: flex;
  flex-direction: column;
  z-index: 2100;
  box-shadow: -2px 0 16px rgba(0,0,0,0.08);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  ${props => props.isOpen && css`
    transform: translateX(0);
  `}
`;

const PanelTitle = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin-bottom: 24px;
`;

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type?: 'team_invite' | 'team_join';
  inviteId?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchInvitations();
    }
  }, [isOpen]);

  const fetchInvitations = async () => {
    try {
      const response = await getMyInvitations();
      const invitations = response.data || [];
      
      const inviteNotifications: Notification[] = invitations.map(invite => ({
        id: invite.invitationId,
        title: '팀 초대',
        description: `${invite.inviterNickname}님이 ${invite.repositoryName} 저장소에 초대했습니다.`,
        time: '방금 전',
        type: 'team_invite',
        inviteId: invite.invitationId
      }));

      setNotifications(inviteNotifications);
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
    }
  };

  const handleCloseItem = (id: string) => {
    setNotifications(notifications => notifications.filter(n => n.id !== id));
  };

  const handleAcceptInvite = async (id: string) => {
    try {
      await acceptTeamInvite(id);
      handleCloseItem(id);
    } catch (error) {
      console.error('Failed to accept invitation:', error);
    }
  };

  const handleRejectInvite = async (id: string) => {
    try {
      await rejectTeamInvite(id);
      handleCloseItem(id);
    } catch (error) {
      console.error('Failed to reject invitation:', error);
    }
  };

  const getIcon = (title: string) => {
    if (title === '팀 초대' || title === '새로운 멤버') return memberinviteIcon;
    if (title === '새로운 저장소/파일 생성') return folderIcon;
    return memberinviteIcon;
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <PanelWrapper isOpen={isOpen}>
        <PanelTitle>알림</PanelTitle>
        {notifications.map(n => (
          <NotificationPanelItem
            key={n.id}
            icon={getIcon(n.title)}
            title={n.title}
            description={n.description}
            time={n.time}
            type={n.type}
            onClose={() => handleCloseItem(n.id)}
            onAccept={n.type === 'team_invite' ? () => handleAcceptInvite(n.inviteId!) : undefined}
            onReject={n.type === 'team_invite' ? () => handleRejectInvite(n.inviteId!) : undefined}
          />
        ))}
      </PanelWrapper>
    </>
  );
};

export default NotificationPanel; 