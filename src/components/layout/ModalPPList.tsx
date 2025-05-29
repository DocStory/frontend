import React from 'react';
import styled from 'styled-components';
import PPList from '../common/PPList';
import FilterTab from '../common/FilterTab';
import Button from '../common/Button';
import ModalHeader from '../common/ModalHeader';

export interface PPItem {
  id: string;
  Name: string;
  content: string;
  status: 'progress' | 'merge' | 'close';
}

interface ModalPPListProps {
  items: PPItem[];
  onClose?: () => void;
  onProposalClick?: (id: string) => void;
}

const ModalPPListContainer = styled.div`
  width: 790px;
  height: 750px;
  background: #ffffff;
  border-radius: 15px;
  border: 3px solid #cbd5e1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #f1f5f9;
  min-height: 0;
`;

const FilterSection = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #cbd5e1;
  background: #f1f5f9;
  display: flex;
  gap: 0;
  justify-content: center;
  flex-shrink: 0;
`;

const ButtonSection = styled.div`
  padding: 24px 33px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  background: #f1f5f9;
`;

const StyledFilterTab = styled(FilterTab)`
  font-size: 22px;
  line-height: 0.909em;
  letter-spacing: -0.006em;
  padding: 8px 12px;
  width: 263px;
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #cbd5e1;

  &:last-child {
    border-right: none;
  }
`;

const StyledButton = styled(Button)`
  width: 686px;
  height: 54px;
  font-size: 22px;
  line-height: 0.909em;
  letter-spacing: -0.6%;
`;

const ModalPPList: React.FC<ModalPPListProps> = ({ items, onClose, onProposalClick }) => {
  const [currentFilter, setCurrentFilter] = React.useState<'all' | 'progress' | 'completed'>('all');

  const handleFilterChange = (filter: 'all' | 'progress' | 'completed') => {
    setCurrentFilter(filter);
  };

  const filteredItems = React.useMemo(() => {
    if (currentFilter === 'all') return items;
    if (currentFilter === 'progress') return items.filter(item => item.status === 'progress');
    return items.filter(item => item.status === 'merge' || item.status === 'close');
  }, [items, currentFilter]);

  return (
    <ModalPPListContainer>
      <ModalHeader title="Proposal 목록" onClose={onClose || (() => {})} backgroundColor="#f1f5f9"/>
      <FilterSection>
        <StyledFilterTab
          label='전체'
          isActive={currentFilter === 'all'}
          showLine={true}
          onClick={() => handleFilterChange('all')}
        />
        <StyledFilterTab
          label='진행중'
          isActive={currentFilter === 'progress'}
          showLine={true}
          onClick={() => handleFilterChange('progress')}
        />
        <StyledFilterTab
          label='완료'
          isActive={currentFilter === 'completed'}
          showLine={true}
          onClick={() => handleFilterChange('completed')}
        />
      </FilterSection>
      <ContentWrapper>
        <PPList items={filteredItems} onItemClick={onProposalClick} />
      </ContentWrapper>
      <ButtonSection>
        <StyledButton variant='primary' size='large'>
          새로운 반영 저장하기
        </StyledButton>
      </ButtonSection>
    </ModalPPListContainer>
  );
};

export default ModalPPList;
