import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  height: 48px;
  padding: 0 15px;
  width: 100%;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.cardBackground};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.borderLight};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  ${SearchBarContainer}:focus-within & {
    opacity: 1;
  }
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
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