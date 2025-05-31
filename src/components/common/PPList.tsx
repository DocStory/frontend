import React from 'react';
import styled from 'styled-components';

export interface PPItem {
  id: string;
  Name: string;
  content: string;
  status?: 'close' | 'merge' | 'progress';
}

interface PPListProps {
  items: PPItem[];
  onItemClick?: (id: string) => void;
}

const PPListContainer = styled.div`
  padding: 24px 32px;
  background: ${({ theme }) => theme.background};
`;

const PPItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
  margin: 0;
  word-break: break-word;
`;

const ItemContent = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  flex-shrink: 0;
`;

const StatusCircle = styled.div<{ $status?: 'close' | 'merge' | 'progress' }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $status }) => {
    switch ($status) {
      case 'close':
        return '#ef4444';
      case 'merge':
        return '#8b5cf6';
      case 'progress':
        return '#22c55e';
      default:
        return '#94a3b8';
    }
  }};
  transition: transform 0.2s ease;

  ${PPItemContainer}:hover & {
    transform: scale(1.2);
  }
`;

const StatusLabel = styled.span<{ $status?: 'close' | 'merge' | 'progress' }>`
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 500;
  color: ${({ $status }) => {
    switch ($status) {
      case 'close':
        return '#ef4444';
      case 'merge':
        return '#8b5cf6';
      case 'progress':
        return '#22c55e';
      default:
        return '#94a3b8';
    }
  }};
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ $status }) => {
    switch ($status) {
      case 'close':
        return '#fef2f2';
      case 'merge':
        return '#f3f4f6';
      case 'progress':
        return '#f0fdf4';
      default:
        return '#f8fafc';
    }
  }};
  text-align: center;
  min-width: 50px;
`;

const getStatusText = (status?: 'close' | 'merge' | 'progress') => {
  switch (status) {
    case 'close':
      return '종료';
    case 'merge':
      return '병합';
    case 'progress':
      return '진행중';
    default:
      return '대기';
  }
};

const PPList: React.FC<PPListProps> = ({ items, onItemClick }) => {
  return (
    <PPListContainer>
      {items.map((item) => (
        <PPItemContainer 
          key={item.id} 
          onClick={() => {
            if (onItemClick) onItemClick(item.id);
          }}
        >
          <ItemTextInfo>
            <ItemName>{item.Name}</ItemName>
            {item.content && <ItemContent>{item.content}</ItemContent>}
          </ItemTextInfo>
          <StatusContainer>
            <StatusCircle $status={item.status} />
            <StatusLabel $status={item.status}>
              {getStatusText(item.status)}
            </StatusLabel>
          </StatusContainer>
        </PPItemContainer>
      ))}
    </PPListContainer>
  );
};

export default PPList; 