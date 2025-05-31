import React from 'react';
import styled from 'styled-components';
import Button from './Button.tsx';

interface ModalFooterProps {
  onReject: () => void;
  onAccept: () => void;
  role?: string; // 'Reviewer' | 'admin'
  isEditing?: boolean;
}

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 20px 32px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
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
    <FooterWrapper>
      <FigmaButton variant='secondary' onClick={onReject}>
        거절하기
      </FigmaButton>
      <FigmaButton variant='primary' onClick={onAccept}>
        수락하기
      </FigmaButton>
    </FooterWrapper>
  );
};

export default ModalFooter;
