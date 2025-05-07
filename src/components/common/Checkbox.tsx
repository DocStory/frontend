import React from 'react';
import styled from 'styled-components';
import checkbox from '../../assets/checkbox.svg';
import uncheckbox from '../../assets/uncheckbox.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: number;
}

const CheckboxIcon = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  cursor: pointer;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  size = 16,
}) => {
  return (
    <CheckboxIcon
      src={checked ? checkbox : uncheckbox}
      alt={checked ? 'checked' : 'unchecked'}
      onClick={onChange}
      size={size}
    />
  );
};

export default Checkbox;
