import React, { useEffect } from 'react';
import styled from 'styled-components';
import PPList from '../common/PPList';
import FilterTab from '../common/FilterTab';
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
  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  background: ${({ theme }) => theme.modalBackground};
  width: 95%;
  max-width: 700px;
  max-height: 85vh;
  border-radius: 18px;
  box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.background};
  min-height: 0;
`;

const FilterSection = styled.div`
  padding: 16px 0;
  background: ${({ theme }) => theme.background};
  display: flex;
  gap: 0;
  justify-content: center;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const StyledFilterTab = styled(FilterTab)<{ isActive: boolean }>`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.006em;
  padding: 12px 24px;
  width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.border};
  color: ${({ isActive, theme }) => isActive ? 'white' : theme.textSecondary};
  background: ${({ isActive, theme }) => isActive ? theme.primary : theme.surface};
  font-weight: ${({ isActive }) => isActive ? 600 : 500};
  transition: all 0.2s ease;

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-right: none;
    border-radius: 0 8px 8px 0;
  }

  &:hover {
    background: ${({ isActive, theme }) => isActive ? theme.primary : theme.hoverBackground};
    color: ${({ isActive, theme }) => isActive ? 'white' : theme.text};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  opacity: 0.7;
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
        <ModalHeader title="PP 목록" onClose={onClose || (() => {})} />
        
        <FilterSection>
          <StyledFilterTab
            label='전체'
            isActive={currentFilter === 'all'}
            showLine={false}
            onClick={() => handleFilterChange('all')}
          />
          <StyledFilterTab
            label='진행중'
            isActive={currentFilter === 'progress'}
            showLine={false}
            onClick={() => handleFilterChange('progress')}
          />
          <StyledFilterTab
            label='완료'
            isActive={currentFilter === 'completed'}
            showLine={false}
            onClick={() => handleFilterChange('completed')}
          />
        </FilterSection>
        
        <ContentWrapper>
          {filteredItems.length === 0 ? (
            <EmptyState>
              <EmptyTitle>표시할 PP가 없습니다</EmptyTitle>
              <EmptyDescription>
                {currentFilter === 'all' && '아직 생성된 PP가 없습니다.'}
                {currentFilter === 'progress' && '진행 중인 PP가 없습니다.'}
                {currentFilter === 'completed' && '완료된 PP가 없습니다.'}
              </EmptyDescription>
            </EmptyState>
          ) : (
            <PPList items={filteredItems} onItemClick={onProposalClick} />
          )}
        </ContentWrapper>
      </Container>
    </Overlay>
  );
};

export default ModalPPList;