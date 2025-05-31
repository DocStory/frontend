import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownOption } from '../common/Dropdown';
import avatarImg from '../../assets/avatar.svg';

interface HistoryCardProps {
  isMain?: boolean;
  userName: string;
  userAvatar?: string;
  title: string;
  description?: string;
  timeAgo?: string;
  historyId?: string;
  onDetailClick?: (historyId: string) => void;
  currentUserId?: string;
  historyCreatorId?: string;
  onEditClick?: (historyId: string) => void;
  onCreateClick?: (historyId?: string) => void;
  onProposalClick?: (historyId: string) => void;
}

const HistoryItem = styled.div<{ $isMain: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1.5px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  border-color: ${({ $isMain, theme }) => ($isMain ? theme.primary : theme.border)};

  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const HistoryTitle = styled.h3`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
  letter-spacing: -0.3px;
  line-height: 1.3;
`;

const HistoryMeta = styled.div`
  font-family: 'Pretendard';
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  letter-spacing: -0.2px;
`;

const TimeAgo = styled.span`
  font-family: 'Pretendard';
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.8;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.cardBackground};
  margin-top: 4px;
  background: ${({ theme }) => theme.surface};
  transition: all 0.2s ease;
`;

const UserName = styled.span`
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.2px;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid #fff;
  box-shadow: 0 1px 2px 0 rgba(107, 110, 116, 0.04);
  background: #f5f7fa;
  object-fit: cover;
`;

const HistoryCard: React.FC<HistoryCardProps> = ({
  isMain = false,
  userName,
  userAvatar,
  title,
  description,
  timeAgo,
  historyId,
  onDetailClick,
  currentUserId,
  historyCreatorId,
  onEditClick,
  onCreateClick,
  onProposalClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdown, setDropdown] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdown({ open: true, x: e.clientX, y: e.clientY });
  };

  const handleDropdownSelect = (value: string) => {
    setDropdown({ ...dropdown, open: false });
    
    if (value === 'create' && onCreateClick) {
      onCreateClick(historyId);
    } else if (value === 'detail' && historyId && onDetailClick) {
      onDetailClick(historyId);
    } else if (value === 'edit' && historyId && onEditClick) {
      onEditClick(historyId);
    } else if (value === 'pp' && historyId && onProposalClick) {
      onProposalClick(historyId);
    }
    // TODO: PP 요청 등 다른 동작들도 연결
  };

  const handleDropdownClose = () => setDropdown({ ...dropdown, open: false });

  // 현재 사용자가 작성한 히스토리인지 확인
  const canEdit = currentUserId && historyCreatorId && currentUserId === historyCreatorId;

  const dropdownOptions: DropdownOption[] = [
    { label: '생성하기', value: 'create' },
    { label: '자세히 보기', value: 'detail' },
    ...(canEdit ? [{ label: '수정하기', value: 'edit' }] : []),
    ...(onProposalClick ? [{ label: 'PP 요청', value: 'pp' }] : []),
  ];

  return (
    <>
      <HistoryItem
        ref={cardRef}
        $isMain={isMain}
        tabIndex={0}
        aria-label={isMain ? '메인 히스토리 카드' : '히스토리 카드'}
        role="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={handleContextMenu}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setIsHovered(v => !v);
        }}
      >
        <HistoryHeader>
          <HistoryInfo>
            <HistoryTitle>{title}</HistoryTitle>
            {isHovered && timeAgo && <TimeAgo>{timeAgo}</TimeAgo>}
          </HistoryInfo>
        </HistoryHeader>
        {isHovered && description && <HistoryMeta>{description}</HistoryMeta>}
        <UserSection>
          <Avatar src={avatarImg} alt="사용자 아바타" />
          <UserName>{userName}</UserName>
        </UserSection>
      </HistoryItem>
      <Dropdown
        isOpen={dropdown.open}
        options={dropdownOptions}
        position={{ x: dropdown.x, y: dropdown.y }}
        onSelect={handleDropdownSelect}
        onClose={handleDropdownClose}
      />
    </>
  );
};

export default HistoryCard; 