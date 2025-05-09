import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.svg';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  backgroundColor?: string;
}

const Header = styled.div<{ backgroundColor?: string }>`
  padding: 24px 33px;
  border-bottom: 1px solid #cbd5e1;
  background: ${props => props.backgroundColor || 'white'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
`;

const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 26px;
  line-height: 0.85em;
  letter-spacing: -0.007em;
  color: #1e293b;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, backgroundColor }) => {
  return (
    <Header backgroundColor={backgroundColor}>
      <Title>{title}</Title>
      <CloseButton onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </CloseButton>
    </Header>
  );
};

export default ModalHeader; 