import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import ModalHeader from './ModalHeader';
import { FiPlus, FiX } from 'react-icons/fi';
import { createRepository, CreateRepositoryRequest } from '../../api/repository';
import { useRepositories } from '../../contexts/RepositoryContext';
import { useToastContext } from '../../contexts/ToastContext';

interface NewRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RepositoryFormData) => void;
}

interface RepositoryFormData {
  title: string;
  description: string;
  files: File[];
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 95%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 15px;
  border: 3px solid #CBD5E1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-size: 16px;
  color: #292929;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Required = styled.span`
  color: #ff5a5a;
  font-size: 16px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  font-family: 'Pretendard';
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  font-family: 'Pretendard';
  resize: none;
  min-height: 200px;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: #f6f7fb;
  border: 1.5px solid #f0f1f6;
  border-radius: 7px;
  font-size: 14px;
  color: #7c7c7c;
  cursor: pointer;
  font-family: 'Pretendard';
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f6f7fb;
  border-radius: 6px;
  font-size: 14px;
  color: #4a4a4a;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #ff5a5a;
  }
`;

const NewRepositoryModal: React.FC<NewRepositoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshRepositories } = useRepositories();
  const toast = useToastContext();

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.warning('제목을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const repositoryData: CreateRepositoryRequest = {
        name: title.trim(),
        description: description.trim()
      };

      const response = await createRepository(repositoryData);

      if (response.code === 100) {
        toast.success(`프로젝트 "${response.data.name}"가 성공적으로 생성되었습니다!`);
        
        // 레포지토리 목록 새로고침
        await refreshRepositories();
        
        // 기존 onSubmit 콜백도 호출 (필요한 경우)
        if (onSubmit) {
          const formData: RepositoryFormData = {
            title: title.trim(),
            description: description.trim(),
            files: selectedFiles,
          };
          onSubmit(formData);
        }

        // 폼 초기화 및 모달 닫기
        setTitle('');
        setDescription('');
        setSelectedFiles([]);
        onClose();
      } else {
        toast.error(`프로젝트 생성 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('Repository creation error:', error);
      toast.error('프로젝트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // 폼 초기화
    setTitle('');
    setDescription('');
    setSelectedFiles([]);
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader 
          title="프로젝트 생성" 
          onClose={handleClose}
        />
        
        <ContentWrapper>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormColumn>
                <FieldGroup>
                  <LabelRow>
                    <Label htmlFor="modal-repo-name">제목</Label>
                    <Required>*</Required>
                  </LabelRow>
                  <Input 
                    id="modal-repo-name" 
                    placeholder="제목을 입력해주세요." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                  />
                </FieldGroup>
              </FormColumn>

              <FormColumn>
                <FieldGroup>
                  <LabelRow>
                    <Label htmlFor="modal-repo-file">첨부파일</Label>
                    <Required>*</Required>
                  </LabelRow>
                  <FileLabel htmlFor="modal-repo-file">
                    <FiPlus /> 파일 첨부하기
                  </FileLabel>
                  <FileInput 
                    id="modal-repo-file" 
                    type="file" 
                    multiple 
                    onChange={handleFileChange}
                  />
                  <FileList>
                    {selectedFiles.map((file, index) => (
                      <FileItem key={index}>
                        {file.name}
                        <DeleteButton onClick={() => removeFile(index)}>
                          <FiX />
                        </DeleteButton>
                      </FileItem>
                    ))}
                  </FileList>
                </FieldGroup>
              </FormColumn>
            </FormRow>

            <FieldGroup>
              <Label htmlFor="modal-repo-desc">설명</Label>
              <TextArea 
                id="modal-repo-desc" 
                placeholder="설명을 입력해주세요." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FieldGroup>

            <ButtonRow>
              <Button variant="secondary" size="medium" onClick={handleClose} disabled={isLoading}>
                취소하기
              </Button>
              <Button variant="primary" size="medium" type="submit" disabled={isLoading}>
                {isLoading ? '생성 중...' : '생성하기'}
              </Button>
            </ButtonRow>
          </Form>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewRepositoryModal; 