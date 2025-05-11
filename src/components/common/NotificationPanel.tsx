import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import NotificationPanelItem from './NotificationPanelItem';
import memberinviteIcon from '../../assets/memberinviteIcon.svg';
import folderIcon from '../../assets/folderIcon.svg';

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
  id: number;
  title: string;
  description: string;
  time: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: '새로운 멤버',
      description: '김철수님이 새로 합류하셨습니다.',
      time: '방금 전',
    },
    {
      id: 2,
      title: '새로운 저장소/파일 생성',
      description: '공팀님의 저장소에서 새 저장소가 생성되었습니다.',
      time: '1분 전',
    },
  ]);

  const handleCloseItem = (id: number) => {
    setNotifications(notifications => notifications.filter(n => n.id !== id));
  };

  const getIcon = (title: string) => {
    if (title === '새로운 멤버') return memberinviteIcon;
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
            onClose={() => handleCloseItem(n.id)}
          />
        ))}
      </PanelWrapper>
    </>
  );
};

export default NotificationPanel; 