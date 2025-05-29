import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
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
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
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
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  letter-spacing: 0.94%;
`;

const CreateIcon = styled.div<{ $isDark: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19px;
  height: 19px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    /* 다크모드에서 아이콘 색상 조정 */
    filter: ${({ $isDark }) => $isDark ? 'brightness(0.9) contrast(1.1)' : 'none'};
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

const RepositoryTitle: React.FC<RepositoryTileProps> = ({
  title,
  subtitle,
  onTabChange,
  onCreateClick,
}) => {
  const [selectedTab, setSelectedTab] = useState('전체보기');
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleTabClick = (tabLabel: string) => {
    setSelectedTab(tabLabel);
    if (onTabChange) {
      onTabChange(tabLabel);
    }
  };

  const tabs = ['전체보기', '히스토리', '프로포절'];

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <CreateIcon onClick={onCreateClick} $isDark={isDark}>
          <img src={createIcon} alt="생성" />
        </CreateIcon>
      </TitleContainer>
      <Subtitle>{subtitle}</Subtitle>

      <TabContainer>
        {tabs.map((tab) => (
          <TabWrapper key={tab} label={tab}>
            <Tab
              label={tab}
              isActive={selectedTab === tab}
              showLine={true}
              onClick={() => handleTabClick(tab)}
            />
          </TabWrapper>
        ))}
      </TabContainer>
    </Container>
  );
};

export default RepositoryTitle;
