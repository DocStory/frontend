import React, { useState } from 'react';
import styled from 'styled-components';
import createIcon from '../../assets/pencilIcon.svg';
import Tab from '../common/FilterTab.tsx';

interface RepositoryTileProps {
  title: string;
  subtitle: string;
  onTabChange?: (tab: string) => void;
  onCreateClick?: () => void;
}

const Container = styled.div`
  width: 1622px;
  height: 148px;
  padding: 0 24px 0 58px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  padding-top: 20px;
`;

const Title = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 26px;
  color: #292929;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.62);
  margin: 0;
  letter-spacing: 0.94%;
`;

const CreateIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19px;
  height: 19px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 22px;
  width: 479px;
`;

const TabWrapper = styled.div<{ label: string }>`
  width: ${(props) => (props.label === '전체보기' ? '120px' : '89.75px')};
  display: flex;
  justify-content: center;
`;

const RepositoryTile: React.FC<RepositoryTileProps> = ({
  title,
  subtitle,
  onTabChange,
  onCreateClick,
}) => {
  const tabs = ['전체보기', '주요', '하위', '폐기', '필터'];
  const [activeTab, setActiveTab] = useState('전체보기');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <CreateIcon onClick={onCreateClick}>
          <img src={createIcon} alt='레포지토리 생성' />
        </CreateIcon>
      </TitleContainer>
      <Subtitle>{subtitle}</Subtitle>
      <TabContainer>
        {tabs.map((tab) => (
          <TabWrapper key={tab} label={tab}>
            <Tab
              label={tab}
              isActive={activeTab === tab}
              showLine={true}
              onClick={() => handleTabClick(tab)}
            />
          </TabWrapper>
        ))}
      </TabContainer>
    </Container>
  );
};

export default RepositoryTile;
