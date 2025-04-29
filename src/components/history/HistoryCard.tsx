import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Dropdown, DropdownOption } from '../common/Dropdown';
import avatarImg from '../../assets/avatar.svg';

interface HistoryCardProps {
  isMain?: boolean;
  userName: string;
  userAvatar?: string;
  title: string;
  description?: string;
  timeAgo?: string;
}

const Card = styled.div<{ $isMain: boolean; $isExpanded: boolean }>`
  width: 335px;
  background: #fff;
  border-radius: 15px;
  font-family: 'Pretendard', sans-serif;
  border: 2px solid;
  border-color: ${({ $isMain }) => ($isMain ? '#6C9EFF' : '#F0F0F0')};
  box-shadow: ${({ $isMain, $isExpanded }) =>
    $isMain && $isExpanded
      ? '0 4px 16px 0 rgba(108, 158, 255, 0.10)'
      : $isMain
      ? '0 2px 8px 0 rgba(108, 158, 255, 0.06)'
      : 'none'};
  padding: ${({ $isExpanded }) =>
    $isExpanded ? '24px 18px 24px 28px' : '24px 28px'};
  min-height: ${({ $isExpanded }) => ($isExpanded ? '150px' : '105px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.18s, border-color 0.18s, padding 0.18s, min-height 0.18s;
  cursor: pointer;
  position: relative;
  outline: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  letter-spacing: -0.5px;
  line-height: 1.1;
`;

const TimeAgo = styled.div`
  font-size: 12px;
  color: #7C7C7C;
  margin-left: 6px;
  font-weight: 400;
`;

const Description = styled.div`
  font-size: 13px;
  color: #909090;
  margin-top: 2px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: -0.2px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
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

const UserName = styled.div`
  font-size: 14px;
  color: #292929;
  font-weight: 400;
  margin-left: 2px;
  letter-spacing: -0.2px;
`;

const HistoryCard: React.FC<HistoryCardProps> = ({
  isMain = false,
  userName,
  userAvatar,
  title,
  description,
  timeAgo,
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
    // TODO: 실제 동작 연결
    // alert(value);
  };

  const handleDropdownClose = () => setDropdown({ ...dropdown, open: false });

  const dropdownOptions: DropdownOption[] = [
    { label: '자세히 보기', value: 'detail' },
    { label: '수정하기', value: 'edit' },
    { label: 'PP 요청', value: 'pp' },
  ];

  return (
    <>
      <Card
        ref={cardRef}
        $isMain={isMain}
        $isExpanded={isHovered}
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
        <Content>
          <TitleRow>
            <Title>{title}</Title>
            {isHovered && timeAgo && <TimeAgo>{timeAgo}</TimeAgo>}
          </TitleRow>
          {isHovered && description && <Description>{description}</Description>}
        </Content>
        <BottomRow>
          <Avatar src={userAvatar || avatarImg} alt="사용자 아바타" />
          <UserName>{userName}</UserName>
        </BottomRow>
      </Card>
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