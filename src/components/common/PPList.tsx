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
  padding: 24px 33px;
  border-bottom: 1px solid #cbd5e1;
  background: #f1f5f9;
`;

const PPItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid #d4dde7;
  border-bottom: 1px solid #d4dde7;
  border-left: none;
  border-right: none;
  border-radius: 0;
  margin-bottom: 12px;
  background: #f1f5f9;
`;

const ItemTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 90%;
`;

const ItemName = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.007em;
  color: #323a48;
`;

const ItemContent = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.006em;
  color: #475569;
  white-space: pre-wrap;
`;

const StatusCircle = styled.div<{ $status?: 'close' | 'merge' | 'progress' }>`
  width: 12px;
  height: 12px;
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
`;

const PPList: React.FC<PPListProps> = ({ items, onItemClick }) => {
  return (
    <PPListContainer>
      {items.map((item, index) => (
        <PPItemContainer key={item.id} onClick={() => {
          console.log('PPList item clicked:', item.id);
          if (onItemClick) onItemClick(item.id);
        }} style={{ cursor: onItemClick ? 'pointer' : undefined }}>
          <ItemTextInfo>
            <ItemName>{item.Name}</ItemName>
            <ItemContent>{item.content}</ItemContent>
          </ItemTextInfo>
          <StatusCircle $status={item.status} />
        </PPItemContainer>
      ))}
    </PPListContainer>
  );
};

export default PPList; 