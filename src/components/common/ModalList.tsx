import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import downloadIcon from '../../assets/downloadIcon.svg';
import uploadIcon from '../../assets/uploadIcon.svg';
import fileIcon from '../../assets/fileIcon.svg';
import diffIcon from '../../assets/diffIcon.svg';

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
  padding: 24px 33px;
  border-bottom: 1px solid #cbd5e1;
  background: #f1f5f9;
`;

const ModalItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid #d4dde7;
  border-bottom: 1px solid #d4dde7;
  border-left: none;
  border-right: none;
  border-radius: 0;
  margin-bottom: 12px;
  background: #f1f5f9;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ItemIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ItemTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemName = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 22px;
  line-height: 1em;
  letter-spacing: -0.007em;
  color: #323a48;
`;

const ItemDate = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.006em;
  color: #475569;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cbd5e1;
`;

const Icon = styled.img<{ $large?: boolean }>`
  width: ${({ $large }) => ($large ? '36px' : '24px')};
  height: ${({ $large }) => ($large ? '36px' : '24px')};
  min-width: ${({ $large }) => ($large ? '36px' : '24px')};
  min-height: ${({ $large }) => ($large ? '36px' : '24px')};
`;

const FileUploadArea = styled.div<{ $isDragOver?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed ${({ $isDragOver }) => $isDragOver ? '#4078FF' : '#cbd5e1'};
  border-radius: 8px;
  background: ${({ $isDragOver }) => $isDragOver ? '#e8f1ff' : '#f8fafc'};
  cursor: pointer;
  margin-bottom: 16px;
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: #6c9eff;
    background: #f0f7ff;
  }
`;

const FileUploadText = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: #64748b;
  margin-left: 8px;
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

  const renderIcons = (iconType?: 'download' | 'upload' | 'diff', index?: number) => {
    if (iconType === 'upload') {
      return (
        <IconContainer>
          <IconCircle>
            <Icon src={uploadIcon} alt='Upload' />
          </IconCircle>
        </IconContainer>
      );
    }
    if (iconType === 'diff') {
      return (
        <IconContainer>
          <IconCircle>
            <Icon src={diffIcon} alt='Diff' />
          </IconCircle>
          <IconCircle>
            <Icon src={downloadIcon} alt='Download' $large />
          </IconCircle>
        </IconContainer>
      );
    }
    // default: download
    return (
      <IconContainer>
        <IconCircle>
          <Icon src={downloadIcon} alt='Download' $large />
        </IconCircle>
      </IconContainer>
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
            <Icon src={uploadIcon} alt='Upload' />
            <FileUploadText>파일을 선택하거나 여기에 드래그하세요</FileUploadText>
          </FileUploadArea>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
          />
        </>
      )}
      
      {items.map((item, index) => (
        <ModalItemContainer key={index}>
          <ItemInfo>
            <ItemIcon src={fileIcon} alt='File Icon' />
            <ItemTextInfo>
              <ItemName>{item.Name}</ItemName>
              <ItemDate>{item.date}</ItemDate>
            </ItemTextInfo>
          </ItemInfo>
          {renderIcons(item.iconType, index)}
        </ModalItemContainer>
      ))}
    </ModalListContainer>
  );
};

export default ModalList;
