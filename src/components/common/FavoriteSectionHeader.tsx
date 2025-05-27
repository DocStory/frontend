import React from 'react';
import styled from 'styled-components';

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

const FavoriteSectionHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <TitleRow>
        <Title>즐겨찾기</Title>
      </TitleRow>
    </HeaderWrapper>
  );
};

export default FavoriteSectionHeader; 