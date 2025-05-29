import React from 'react';
import styled from 'styled-components';
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
  background: #fff;
  border-bottom: 3px solid #F0F0F0;
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

const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
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
}) => (
  <HeaderContainer>
    <SearchBarWrapper>
      <SearchBar />
    </SearchBarWrapper>
    <Right>
      <Icon src={RepoIcon} alt="레포" onClick={onRepoIconClick} />
      <Icon src={TeamIcon} alt="팀" onClick={onTeamIconClick} />
      <Icon
        src={hasNewNotification ? NotiIcon : NotificationIcon}
        alt="알림"
      />
    </Right>
  </HeaderContainer>
);

export default RepoHeader; 