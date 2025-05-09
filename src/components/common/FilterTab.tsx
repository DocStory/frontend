import React from 'react';
import styled from 'styled-components';

export interface FilterTabProps {
  label: string;
  isActive?: boolean;
  showLine?: boolean;
  onClick?: () => void;
}

const TabContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const TabButton = styled.button<{ isActive: boolean; label: string }>`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.7142857142857142em;
  letter-spacing: 0.4px;
  text-transform: ${(props) =>
    props.label === '필터' ? 'capitalize' : 'uppercase'};
  color: ${(props) => (props.isActive ? '#6C9EFF' : 'rgba(0, 0, 0, 0.6)')};
  background: none;
  border: none;
  padding: 9px 16px;
  width: 100%;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #6c9eff;
  }
`;

const ActiveLine = styled.div`
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background-color: #6c9eff;
`;

const FilterTab: React.FC<FilterTabProps> = ({
  label,
  isActive = false,
  showLine = false,
  onClick,
}) => {
  return (
    <TabContainer>
      <TabButton onClick={onClick} isActive={isActive} label={label}>
        {label}
      </TabButton>
      {showLine && isActive && <ActiveLine />}
    </TabContainer>
  );
};

export default FilterTab;
