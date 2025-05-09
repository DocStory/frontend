import React from 'react';
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

const ModalList: React.FC<ModalListProps> = ({ items }) => {
  const renderIcons = (iconType?: 'download' | 'upload' | 'diff') => {
    if (iconType === 'upload') {
      return (
        <IconCircle>
          <Icon src={uploadIcon} alt='Upload' />
        </IconCircle>
      );
    }
    if (iconType === 'diff') {
      return (
        <>
          <IconCircle>
            <Icon src={diffIcon} alt='Diff' />
          </IconCircle>
          <IconCircle>
            <Icon src={downloadIcon} alt='Download' $large />
          </IconCircle>
        </>
      );
    }
    // default: download
    return (
      <IconCircle>
        <Icon src={downloadIcon} alt='Download' $large />
      </IconCircle>
    );
  };

  return (
    <ModalListContainer>
      {items.map((item, index) => (
        <ModalItemContainer key={index}>
          <ItemInfo>
            <ItemIcon src={fileIcon} alt='File Icon' />
            <ItemTextInfo>
              <ItemName>{item.Name}</ItemName>
              <ItemDate>{item.date}</ItemDate>
            </ItemTextInfo>
          </ItemInfo>
          <IconContainer>{renderIcons(item.iconType)}</IconContainer>
        </ModalItemContainer>
      ))}
    </ModalListContainer>
  );
};

export default ModalList;
