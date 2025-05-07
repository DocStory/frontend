import React from 'react';
import styled from 'styled-components';
import Checkbox from './Checkbox';

interface SearchFilterProps {
  items: {
    id: string;
    name: string;
  }[];
  selectedItems: string[];
  onItemSelect: (id: string) => void;
  onItemsChange?: (selectedItems: string[]) => void;
}

const Container = styled.div`
  background: #fdfdfd;
  border: 1.5px solid #dcdcdc;
  border-radius: 8px;
  padding: 20px;
  width: 624px;
  box-shadow:
    0px 4px 6px -2px rgba(36, 36, 36, 0.03),
    0px 12px 16px -4px rgba(36, 36, 36, 0.08);
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemName = styled.span<{ isSelected: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isSelected ? '#6C9EFF' : '#909090')};
  transition: color 0.2s ease;
`;

const SearchFilter: React.FC<SearchFilterProps> = ({
  items,
  selectedItems,
  onItemSelect,
  onItemsChange,
}) => {
  const handleItemClick = (id: string) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];

    onItemSelect(id);
    if (onItemsChange) {
      onItemsChange(newSelectedItems);
    }
  };

  return (
    <Container>
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <ItemContainer key={item.id} onClick={() => handleItemClick(item.id)}>
            <ItemName isSelected={isSelected}>{item.name}</ItemName>
            <Checkbox
              checked={isSelected}
              onChange={() => handleItemClick(item.id)}
            />
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default SearchFilter;
