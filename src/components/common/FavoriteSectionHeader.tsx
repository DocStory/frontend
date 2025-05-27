import React from 'react';
import styled from 'styled-components';
import settingIcon from '../../assets/repositorySettingIcon.svg';

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
  color: ${({ theme }) => theme.text};
  margin: 0;
  position: relative;
  top: 1px;
  transition: color 0.3s ease;
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
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const SettingIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FavoriteSectionHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <TitleRow>
        <Title>즐겨찾기</Title>
        <SettingButton>
          <SettingIcon src={settingIcon} alt="설정" />
        </SettingButton>
      </TitleRow>
    </HeaderWrapper>
  );
};

export default FavoriteSectionHeader; 