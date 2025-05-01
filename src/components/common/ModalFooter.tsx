import React from 'react';
import styled from 'styled-components';
import Button from './Button.tsx';

interface ModalFooterProps {
  onReject: () => void;
  onAccept: () => void;
  role?: string; // 'Reviewer' | 'admin'
  isEditing?: boolean;
}

const FooterContainer = styled.div`
  padding: 24px 33px;
  display: flex;
  justify-content: center;
  gap: 12px;
  background: #f1f5f9;
`;

const FigmaButton = styled(Button)`
  width: 440px;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
`;

const ModalFooter: React.FC<ModalFooterProps> = ({
  onReject,
  onAccept,
  role,
  isEditing,
}) => {
  if (isEditing || (role !== 'Reviewer' && role !== 'admin')) return null;
  return (
    <FooterContainer>
      <FigmaButton variant='secondary' onClick={onReject}>
        거절하기
      </FigmaButton>
      <FigmaButton variant='primary' onClick={onAccept}>
        수락하기
      </FigmaButton>
    </FooterContainer>
  );
};

export default ModalFooter;
