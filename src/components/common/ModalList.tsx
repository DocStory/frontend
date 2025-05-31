import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import downloadIcon from '../../assets/downloadIcon.svg';
import uploadIcon from '../../assets/uploadIcon.svg';
import fileIcon from '../../assets/fileIcon.svg';
import diffIcon from '../../assets/diffIcon.svg';
import trashIcon from '../../assets/trashIcon.svg';

export interface ModalItem {
  Name: string;
  date: string;
  iconType?: 'download' | 'upload' | 'diff';
}

interface ModalListProps {
  items: ModalItem[];
  onFileSelect?: (files: FileList | null) => void;
  onFileRemove?: (index: number) => void;
  isCreating?: boolean;
}

const ModalListContainer = styled.div`
  padding: 16px 32px 32px 32px;
  background: ${({ theme }) => theme.background};
`;

const FileItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}30;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const FileIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FileIconImage = styled.img`
  width: 22px;
  height: 22px;
  opacity: 0.8;
`;

const FileTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const FileName = styled.span`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
  word-break: break-word;
`;

const FileDate = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.8;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 18px;
    height: 18px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  &:hover img {
    opacity: 1;
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    background: #fee2e2;
    border-color: #fca5a5;
  }
`;

const FileUploadArea = styled.div<{ $isDragOver?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  border: 2px dashed ${({ $isDragOver, theme }) => 
    $isDragOver ? theme.primary : theme.border
  };
  border-radius: 12px;
  background: ${({ $isDragOver, theme }) => 
    $isDragOver ? `${theme.primary}10` : theme.cardBackground
  };
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}08`};
  }
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const UploadIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    opacity: 0.6;
  }
`;

const UploadText = styled.div`
  text-align: center;
`;

const UploadTitle = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const UploadSubtext = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ModalList: React.FC<ModalListProps> = ({ 
  items, 
  onFileSelect, 
  onFileRemove, 
  isCreating = false 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (onFileSelect && files.length > 0) {
      onFileSelect(files);
    }
  };

  const renderActionButtons = (iconType?: 'download' | 'upload' | 'diff', index?: number) => {
    if (iconType === 'upload') {
      return (
        <ActionButtons>
          <DeleteButton 
            onClick={() => onFileRemove && index !== undefined && onFileRemove(index)}
            title="파일 삭제"
          >
            <img src={trashIcon} alt="삭제" />
          </DeleteButton>
        </ActionButtons>
      );
    }
    
    if (iconType === 'diff') {
      return (
        <ActionButtons>
          <ActionButton title="변경사항 비교">
            <img src={diffIcon} alt="비교" />
          </ActionButton>
          <ActionButton title="파일 다운로드">
            <img src={downloadIcon} alt="다운로드" />
          </ActionButton>
        </ActionButtons>
      );
    }
    
    // default: download
    return (
      <ActionButtons>
        <ActionButton title="파일 다운로드">
          <img src={downloadIcon} alt="다운로드" />
        </ActionButton>
      </ActionButtons>
    );
  };

  return (
    <ModalListContainer>
      {isCreating && onFileSelect && (
        <>
          <FileUploadArea 
            onClick={handleFileUploadClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            $isDragOver={isDragOver}
          >
            <UploadContent>
              <UploadIcon>
                <img src={uploadIcon} alt="업로드" />
              </UploadIcon>
              <UploadText>
                <UploadTitle>파일을 드래그하거나 클릭하여 업로드</UploadTitle>
                <UploadSubtext>PDF, 이미지, 문서 파일을 지원합니다</UploadSubtext>
              </UploadText>
            </UploadContent>
          </FileUploadArea>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          />
        </>
      )}
      
      {items.map((item, index) => (
        <FileItemCard key={index}>
          <FileInfo>
            <FileIconWrapper>
              <FileIconImage src={fileIcon} alt="파일" />
            </FileIconWrapper>
            <FileTextInfo>
              <FileName>{item.Name}</FileName>
              <FileDate>{item.date}</FileDate>
            </FileTextInfo>
          </FileInfo>
          {renderActionButtons(item.iconType, index)}
        </FileItemCard>
      ))}
    </ModalListContainer>
  );
};

export default ModalList;
