import React from 'react';
import styled from 'styled-components';

interface InfoListProps {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  flex: 1;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.text};
  text-align: right;
  flex: 2;
`;

const InfoList: React.FC<InfoListProps> = ({
  name,
  email,
  phoneNumber,
  address,
}) => {
  return (
    <ListContainer>
      <ListItem>
        <Label>이름</Label>
        <Value>{name}</Value>
      </ListItem>
      <ListItem>
        <Label>이메일 주소</Label>
        <Value>{email}</Value>
      </ListItem>
      <ListItem>
        <Label>휴대폰 번호</Label>
        <Value>{phoneNumber}</Value>
      </ListItem>
      <ListItem>
        <Label>주소</Label>
        <Value>{address}</Value>
      </ListItem>
    </ListContainer>
  );
};

export default InfoList;
