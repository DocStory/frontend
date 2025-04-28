import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  height: 48px;
  padding: 0 15px;
  width: 100%;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #6B7280;
  flex: 1;

  &::placeholder {
    color: #6B7280;
    opacity: 1;
  }
`;

const SearchBar: React.FC = () => (
  <SearchBarContainer>
    <Icon src={SearchIcon} alt="검색" />
    <Input placeholder="검색" />
  </SearchBarContainer>
);

export default SearchBar; 