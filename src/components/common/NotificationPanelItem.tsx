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

interface NotificationPanelItemProps {
  icon: string;
  title: string;
  description: string;
  time: string;
  onClose: () => void;
}

const NotificationPanelItem: React.FC<NotificationPanelItemProps> = ({
  icon,
  title,
  description,
  time,
  onClose,
}) => (
  <ItemWrapper>
    <IconImg src={icon} alt="알림 아이콘" />
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Time>{time}</Time>
    </Content>
    <CloseButton onClick={onClose} aria-label="닫기">×</CloseButton>
  </ItemWrapper>
);

export default NotificationPanelItem; 