import React, { useState } from 'react';
import styled from 'styled-components';
import createIcon from '../../assets/pencilIcon.svg';
import Tab from '../common/FilterTab.tsx';
import { useTheme } from 'styled-components';

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
  background: ${({ theme }) => theme.background};
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
  margin: 0 0 16px 0;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
  }
`;

const CreateIcon = styled.img`
  width: 16px;
  height: 16px;
  ${({ theme }) => theme.mode === 'dark' ? 'filter: invert(1);' : ''}
`;

const RepositoryTitle: React.FC<RepositoryTileProps> = ({
  title,
  subtitle,
  onTabChange,
  onCreateClick,
}) => {
  const [activeTab, setActiveTab] = useState('전체');
  const theme = useTheme();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Subtitle>{subtitle}</Subtitle>
      <BottomRow>
        <TabContainer>
          <Tab
            label="전체"
            isActive={activeTab === '전체'}
            onClick={() => handleTabChange('전체')}
            showLine={true}
          />
          <Tab
            label="주요"
            isActive={activeTab === '주요'}
            onClick={() => handleTabChange('주요')}
            showLine={true}
          />
          <Tab
            label="하위"
            isActive={activeTab === '하위'}
            onClick={() => handleTabChange('하위')}
            showLine={true}
          />
          <Tab
            label="폐기"
            isActive={activeTab === '폐기'}
            onClick={() => handleTabChange('폐기')}
            showLine={true}
          />
          <Tab
            label="필터"
            isActive={activeTab === '필터'}
            onClick={() => handleTabChange('필터')}
            showLine={true}
          />
        </TabContainer>
        <CreateButton onClick={onCreateClick}>
          <CreateIcon src={createIcon} alt="생성" />
          프로포절
        </CreateButton>
      </BottomRow>
    </Container>
  );
};

export default RepositoryTitle;
