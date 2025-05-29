import React from 'react';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import NotificationIcon from '../../assets/notificationIcon.svg';
import NotiIcon from '../../assets/notiIcon.svg';

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 32px;
  height: 64px;
  transition: all 0.3s ease;
`;

const SearchBarWrapper = styled.div`
  width: 480px;
`;

const Right = styled.div`
  position: absolute;
  right: 32px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 8px;
  padding: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
    transform: scale(1.05);
  }
`;

interface MainHeaderProps {
  hasNewNotification?: boolean;
  onNotificationClick?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ hasNewNotification = false, onNotificationClick }) => (
  <HeaderContainer>
    <SearchBarWrapper>
      <SearchBar />
    </SearchBarWrapper>
    <Right>
      <Icon
        src={hasNewNotification ? NotiIcon : NotificationIcon}
        alt="알림"
        onClick={onNotificationClick}
      />
    </Right>
  </HeaderContainer>
);

export default MainHeader; 