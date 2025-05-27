import React from 'react';
import styled from 'styled-components';
import settingIcon from '../../assets/repositorySettingIcon.svg';
import Button from './Button';

interface RepositorySectionHeaderProps {
  onNewRepositoryClick?: () => void;
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px auto 16px auto;
  padding: 0 16px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 20px;
  color: #292929;
  margin: 0;
  position: relative;
  top: 1px;
`;

const SettingButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  justify-content: center;
`;

const SettingIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SectionActions = styled.div`  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 8px
`;

const NewRepositoryButton = styled(Button)`
  font-size: 12px !important;
  font-weight: 600;
  padding: 8px 12px !important;
  border-radius: 7px !important;
  height: 29px;
  min-width: 92px;
  line-height: 1.2;
`;

const RepositorySectionHeader: React.FC<RepositorySectionHeaderProps> = ({ 
  onNewRepositoryClick 
}) => {
  return (
    <HeaderWrapper>
      <TitleRow>
        <Title>저장소</Title>
        <SettingButton>
          <SettingIcon src={settingIcon} alt="설정" />
        </SettingButton>
      </TitleRow>
      <SectionActions>
        <NewRepositoryButton
          variant="primary"
          size="small"
          onClick={onNewRepositoryClick}
        >
          New Repository
        </NewRepositoryButton>
      </SectionActions>
    </HeaderWrapper>
  );
};

export default RepositorySectionHeader; 
