import React, { useState } from 'react';
import styled from 'styled-components';
import chevronDownIcon from '../../assets/chevronDownIcon.svg';

interface SettingsListProps {
  items: Array<{
    title: string;
    value: string;
    options?: string[];
    onClick?: () => void;
    onChange?: (value: string) => void;
  }>;
}

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: visible;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.span`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ValueContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Value = styled.span`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
`;

const ChevronIcon = styled.img<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s ease;
  opacity: 0.6;
`;

const SelectionBox = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 120px;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 10;
  overflow: hidden;
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  background-color: ${(props) => props.isSelected ? 
    ({ theme }) => theme.activeBackground : 
    ({ theme }) => theme.cardBackground};
  color: ${(props) => props.isSelected ? 
    ({ theme }) => theme.primary : 
    ({ theme }) => theme.text};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
    color: ${({ theme }) => theme.primary};
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
    
    // onChange 핸들러 호출
    const item = items[index];
    if (item.onChange) {
      item.onChange(option);
    }
  };

  return (
    <Container>
      {items.map((item, index) => (
        <ListItemWrapper key={index}>
          <ListItem onClick={() => handleItemClick(index)}>
            <Title>{item.title}</Title>
            <ValueContainer>
              <Value>{selectedOptions[index] || item.value}</Value>
              {item.options && (
                <>
                  <ChevronIcon
                    src={chevronDownIcon}
                    alt='chevron down'
                    isOpen={openItemIndex === index}
                  />
                  <SelectionBox isOpen={openItemIndex === index}>
                    {item.options.map((option) => (
                      <Option
                        key={option}
                        isSelected={(selectedOptions[index] || item.value) === option}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect(index, option);
                        }}
                      >
                        {option}
                      </Option>
                    ))}
                  </SelectionBox>
                </>
              )}
            </ValueContainer>
          </ListItem>
        </ListItemWrapper>
      ))}
    </Container>
  );
};

export default SettingsList;
