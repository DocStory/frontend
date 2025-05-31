import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import chevronDownIcon from '../../assets/chevronDownIcon.svg';
import checkIcon from '../../assets/checkIcon.svg';
import trashIcon from '../../assets/trashIcon.svg';

interface ToggleButtonProps {
  currentValue: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  onDelete?: () => void;
}

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled(Button)`
  width: 85px;
  height: 40px;
  padding: 11px 12px;
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.text};
  border-color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 4px;
  width: 100px;
  z-index: 1;
  box-shadow: 0px 4px 40px rgba(22, 20, 20, 0.24);
`;

const DropdownItem = styled.button<{ isActive: boolean }>`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 11px;
  line-height: 1.4em;
  letter-spacing: 0.026em;
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  padding: 4px 8px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${({ theme }) => theme.surface};
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 8px 0;
`;

const DeleteSection = styled.div`
  padding: 0px 8px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  color: #ec4458;
  width: 85px;
  height: 24px;

  &:hover {
    background: ${({ theme }) => theme.surface};
  }
`;

const DeleteText = styled.span`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 11px;
  line-height: 1.4em;
  letter-spacing: 0.24%;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  currentValue,
  options,
  onChange,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const currentLabel =
    options.find((option) => option.value === currentValue)?.label ||
    currentValue;

  return (
    <ToggleContainer>
      <StyledButton
        variant='outline'
        size='small'
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <Icon src={chevronDownIcon} alt='Dropdown' />
      </StyledButton>
      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              isActive={currentValue === option.value}
              onClick={() => handleValueChange(option.value)}
            >
              <Icon
                src={checkIcon}
                alt='Selected'
                style={{
                  opacity: currentValue === option.value ? 1 : 0,
                  width: '16px',
                  height: '16px',
                }}
              />
              {option.label}
            </DropdownItem>
          ))}
          {onDelete && (
            <>
              <Divider />
              <DeleteSection onClick={onDelete}>
                <Icon src={trashIcon} alt='Delete' />
                <DeleteText>폐기하기</DeleteText>
              </DeleteSection>
            </>
          )}
        </Dropdown>
      )}
    </ToggleContainer>
  );
};

export default ToggleButton;
