import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 24px;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: #666;
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
  color: #1a1a1a;
`;

const Input = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4078FF;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4078FF;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === 'primary'
      ? `
        background: #4078FF;
        color: white;
        
        &:hover:not(:disabled) {
          background: #3366CC;
        }
        
        &:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `
      : `
        background: #f3f4f6;
        color: #374151;
        
        &:hover {
          background: #e5e7eb;
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
    if (name.trim()) {
      await onSubmit(name.trim(), description.trim());
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
        <ModalHeader>
          <ModalTitle>레포지토리 수정</ModalTitle>
          <ModalSubtitle>레포지토리의 이름과 설명을 수정할 수 있습니다.</ModalSubtitle>
        </ModalHeader>
        
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
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
              취소
            </Button>
            <Button type="submit" variant="primary" disabled={loading || !name.trim()}>
              {loading ? '수정 중...' : '수정하기'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditRepositoryModal; 