import React, { useState } from 'react';
import styled from 'styled-components';
import settingIcon from '../../assets/repositorySettingIcon.svg';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
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

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FilterSelect = styled.select`
  height: 32px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  font-family: 'Pretendard';
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.borderLight};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  option {
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
  }
`;

const HomeSectionHeader: React.FC = () => {
  const [filter, setFilter] = useState('전체');

  return (
    <HeaderWrapper>
      <TitleRow>
        <Title>최근 활동</Title>
        <SettingButton>
          <SettingIcon src={settingIcon} alt="설정" />
        </SettingButton>
      </TitleRow>
      <RightArea>
        <FilterSelect value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="1번">1번</option>
          <option value="2번">2번</option>
          <option value="3번">3번</option>
        </FilterSelect>
      </RightArea>
    </HeaderWrapper>
  );
};

export default HomeSectionHeader; 