import React, { useState } from 'react';
import styled from 'styled-components';
import chevronDownIcon from '../../assets/chevronDownIcon.svg';

interface SettingsListProps {
  items: Array<{
    title: string;
    value: string;
    options?: string[];
    onClick?: () => void;
  }>;
}

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: visible;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Title = styled.span`
  font-size: 16px;
  color: #333333;
`;

const ValueContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Value = styled.span`
  font-size: 16px;
  color: #666666;
`;

const ChevronIcon = styled.img<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s ease;
`;

const SelectionBox = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 120px;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1;
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#F5F5F5' : 'white')};
  color: ${(props) => (props.isSelected ? '#333333' : '#666666')};

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const ListItemWrapper = styled.div`
  position: relative;
`;

const SettingsList: React.FC<SettingsListProps> = ({ items }) => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleItemClick = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  const handleOptionSelect = (index: number, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }));
    setOpenItemIndex(null);
  };

  return (
    <Container>
      {items.map((item, index) => (
        <ListItemWrapper key={index}>
          <ListItem onClick={() => handleItemClick(index)}>
            <Title>{item.title}</Title>
            <ValueContainer>
              <Value>{selectedOptions[index] || item.value}</Value>
              <ChevronIcon
                src={chevronDownIcon}
                alt='chevron down'
                isOpen={openItemIndex === index}
              />
              {item.options && (
                <SelectionBox isOpen={openItemIndex === index}>
                  {item.options.map((option) => (
                    <Option
                      key={option}
                      isSelected={selectedOptions[index] === option}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(index, option);
                      }}
                    >
                      {option}
                    </Option>
                  ))}
                </SelectionBox>
              )}
            </ValueContainer>
          </ListItem>
        </ListItemWrapper>
      ))}
    </Container>
  );
};

export default SettingsList;
