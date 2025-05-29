import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import SearchBar from '../common/SearchBar';
import NotificationIcon from '../../assets/notificationIcon.svg';
import NotiIcon from '../../assets/notiIcon.svg';
import TeamIcon from '../../assets/teamIcon.svg';
import RepoIcon from '../../assets/proposalIcon.svg';

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 32px;
  height: 64px;
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

const Icon = styled.img<{ $isDark: boolean }>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  /* 다크모드에서 아이콘 색상 조정 */
  filter: ${({ $isDark }) => $isDark ? 'brightness(0.9) contrast(1.1)' : 'none'};
`;

interface RepoHeaderProps {
  hasNewNotification?: boolean;
  onTeamIconClick?: () => void;
  onRepoIconClick?: () => void;
}

const RepoHeader: React.FC<RepoHeaderProps> = ({ 
  hasNewNotification = false, 
  onTeamIconClick,
  onRepoIconClick,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <HeaderContainer>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>
      <Right>
        <Icon src={RepoIcon} alt="레포" onClick={onRepoIconClick} $isDark={isDark} />
        <Icon src={TeamIcon} alt="팀" onClick={onTeamIconClick} $isDark={isDark} />
        <Icon
          src={hasNewNotification ? NotiIcon : NotificationIcon}
          alt="알림"
          $isDark={isDark}
        />
      </Right>
    </HeaderContainer>
  );
};

export default RepoHeader; 