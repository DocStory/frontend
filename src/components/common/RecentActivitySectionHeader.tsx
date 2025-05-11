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

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FilterSelect = styled.select`
  height: 32px;
  padding: 0 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #fff;
  font-family: 'Pretendard';
  font-size: 14px;
  color: #292929;
  outline: none;
  cursor: pointer;
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