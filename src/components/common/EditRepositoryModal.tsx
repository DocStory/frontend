import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToastContext } from '../../contexts/ToastContext';

interface EditRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => Promise<void>;
  initialName: string;
  initialDescription: string;
  loading?: boolean;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.modalBackground};
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
`;

const ModalHeaderComponent = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const TextArea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant, theme }) =>
    variant === 'primary'
      ? `
        background: ${theme.primary};
        color: ${theme.background};
        
        &:hover:not(:disabled) {
          background: ${theme.primaryHover};
        }
        
        &:disabled {
          background: ${theme.textSecondary};
          cursor: not-allowed;
        }
      `
      : `
        background: ${theme.surface};
        color: ${theme.text};
        
        &:hover {
          background: ${theme.hoverBackground};
        }
      `}
`;

const EditRepositoryModal: React.FC<EditRepositoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialName,
  initialDescription,
  loading = false,
}) => {
  const toast = useToastContext();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setDescription(initialDescription);
    }
  }, [isOpen, initialName, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.warning('프로젝트 이름을 입력해주세요.');
      return;
    }
    
    try {
      await onSubmit(name.trim(), description.trim());
      onClose();
    } catch (error: any) {
      console.error('Repository update error:', error);
      const errorMessage = error.response?.data?.message || '저장소 정보 수정 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeaderComponent>
          <ModalTitle>레포지토리 수정</ModalTitle>
          <ModalSubtitle>레포지토리의 이름과 설명을 수정할 수 있습니다.</ModalSubtitle>
        </ModalHeaderComponent>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="repo-name">레포지토리 이름 *</Label>
            <Input
              id="repo-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="레포지토리 이름을 입력하세요"
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="repo-description">설명</Label>
            <TextArea
              id="repo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="레포지토리에 대한 설명을 입력하세요 (선택사항)"
              disabled={loading}
            />
          </FormGroup>

          <ButtonGroup>
            <StyledButton type="button" variant="secondary" onClick={onClose} disabled={loading}>
              취소
            </StyledButton>
            <StyledButton type="submit" variant="primary" disabled={loading || !name.trim()}>
              {loading ? '수정 중...' : '수정하기'}
            </StyledButton>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditRepositoryModal; 