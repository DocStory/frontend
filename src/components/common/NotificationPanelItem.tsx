import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 20px 24px;
  margin-bottom: 16px;
  min-width: 320px;
  max-width: 420px;
  position: relative;
`;

const IconImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-family: 'Pretendard';
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #6d6d6d;
  margin-bottom: 4px;
`;

const Time = styled.div`
  font-size: 13px;
  color: #94a3b8;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: #b0b0b0;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  right: 16px;
  bottom: 8px;
`;

const ActionButton = styled.button<{ $variant: 'accept' | 'reject' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: none;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: ${props => props.$variant === 'accept' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  }

  &:active {
    background: ${props => props.$variant === 'accept' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  }

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: ${props => props.$variant === 'accept' 
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234CAF50'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f44336'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E")`};
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

interface NotificationPanelItemProps {
  icon: string;
  title: string;
  description: string;
  time: string;
  onClose: () => void;
  type?: 'team_invite' | 'team_join';
  onAccept?: () => void;
  onReject?: () => void;
}

const NotificationPanelItem: React.FC<NotificationPanelItemProps> = ({
  icon,
  title,
  description,
  time,
  onClose,
  type,
  onAccept,
  onReject,
}) => (
  <ItemWrapper>
    <IconImg src={icon} alt="알림 아이콘" />
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Time>{time}</Time>
    </Content>
    {type === 'team_invite' ? (
      <ActionButtons>
        <ActionButton $variant="accept" onClick={onAccept} aria-label="수락" />
        <ActionButton $variant="reject" onClick={onReject} aria-label="거절" />
      </ActionButtons>
    ) : (
      <CloseButton onClick={onClose} aria-label="닫기">×</CloseButton>
    )}
  </ItemWrapper>
);

export default NotificationPanelItem; 