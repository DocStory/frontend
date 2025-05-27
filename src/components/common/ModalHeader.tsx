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
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme, backgroundColor }) => backgroundColor || theme.modalBackground};
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
  color: ${({ theme }) => theme.text};
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
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }

  img {
    width: 24px;
    height: 24px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  &:hover img {
    opacity: 1;
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