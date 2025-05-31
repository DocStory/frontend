import React, { useEffect } from 'react';
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 15px;
  border: 3px solid #CBD5E1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  background: white;
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick} tabIndex={-1} aria-label="모달 오버레이">
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalHeader title="Proposal 목록" onClose={onClose || (() => {})} />
        
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
        
        <ButtonRow>
          <Button
            variant="secondary"
            size="medium"
            onClick={onClose}
          >
            닫기
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={() => onProposalClick && onProposalClick('')}
          >
            새 Proposal 생성
          </Button>
        </ButtonRow>
      </Container>
    </Overlay>
  );
};

export default ModalPPList;
