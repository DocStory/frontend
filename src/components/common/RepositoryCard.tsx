import React from 'react';
import styled from 'styled-components';
import folderIcon from '../../assets/folderIcon.svg';
import dotIcon from '../../assets/dot.svg';

export type FileType = 'hwp' | 'docx' | 'pdf';

interface RepositoryCardProps {
  fileTypes: FileType[];
  title: string;
  description?: string;
  onDragHandleClick?: () => void;
  className?: string;
}

const fileTypeBadgeColorMap: Record<FileType, { bg: string; text: string }> = {
  hwp: { bg: '#FFF7B2', text: '#A89B3C' },
  docx: { bg: '#D6E8FF', text: '#4A7EBB' },
  pdf: { bg: '#FFD6D6', text: '#C96A6A' },
};

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 15px;
  border: 2px solid #F0F0F0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 20px 24px;
  min-width: 340px;
  gap: 18px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Title = styled.div`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #6C9EFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #7C7C7C;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
`;

const FileTypeBadge = styled.div<{ $fileType: FileType }>`
  display: flex;
  align-items: center;
  height: 16px;
`;

const BadgeCircle = styled.span<{ $fileType: FileType }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $fileType }) => fileTypeBadgeColorMap[$fileType].bg};
  display: inline-block;
  margin-right: 4px;
`;

const BadgeText = styled.span<{ $fileType: FileType }>`
  font-family: Pretendard, 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: ${({ $fileType }) => fileTypeBadgeColorMap[$fileType].text};
  text-transform: uppercase;
  letter-spacing: -0.009em;
`;

const DragHandle = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 16px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 24px;
  outline: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  &:focus {
    outline: 2px solid #4078FF;
    outline-offset: 2px;
  }
`;

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  fileTypes,
  title,
  description,
  onDragHandleClick,
  className = '',
}) => {
  return (
    <Card className={className} tabIndex={0} aria-label={`저장소 카드: ${title}`}> 
      <IconWrapper>
        <img src={folderIcon} alt="폴더 아이콘" width={32} height={32} />
      </IconWrapper>
      <ContentSection>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <BadgeGroup>
          {fileTypes.map((type) => (
            <FileTypeBadge $fileType={type} key={type} aria-label={`파일 형식: ${type}`}>
              <BadgeCircle $fileType={type} />
              <BadgeText $fileType={type}>{type}</BadgeText>
            </FileTypeBadge>
          ))}
        </BadgeGroup>
      </ContentSection>
      <DragHandle
        aria-label="드래그 핸들"
        tabIndex={0}
        onClick={onDragHandleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onDragHandleClick?.();
          }
        }}
      >
        <img src={dotIcon} alt="드래그 핸들 점" width={20} height={20} />
      </DragHandle>
    </Card>
  );
};

export default RepositoryCard; 