import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RepositoryCard, { FileType } from './RepositoryCard';
import { useRepositories } from '../../contexts/RepositoryContext';
import { useToastContext } from '../../contexts/ToastContext';
import api from '../../api/axios';
import repoIcon from '../../assets/repoIcon.svg';

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 0 auto;
  padding: 0 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  grid-column: 1 / -1;
`;

const EmptyIcon = styled.img`
  width: 80px;
  height: 80px;
  opacity: 0.3;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 12px 0;
  transition: color 0.3s ease;
`;

const EmptyDescription = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 32px 0;
  line-height: 1.5;
  max-width: 400px;
  opacity: 0.8;
  transition: color 0.3s ease;
`;

const CreateButton = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface Repository {
  id: string;
  name: string;
  description: string;
  ownerNickname: string;
  myRole: string;
  isFavorite: boolean;
  fileTypes?: string[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: Repository[];
}

const RepositorySectionCard: React.FC = () => {
  const { repositories, loading, error, fetchRepositories } = useRepositories();
  const toast = useToastContext();
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  useEffect(() => {
    const initialFavoriteStates = repositories.reduce((acc, repo) => {
      acc[repo.id] = repo.isFavorite;
      return acc;
    }, {} as Record<string, boolean>);
    setFavoriteStates(initialFavoriteStates);
  }, [repositories]);

  const handleFavoriteToggle = async (repositoryId: string, isFavorite: boolean) => {
    try {
      // 낙관적 업데이트
      setFavoriteStates(prev => ({
        ...prev,
        [repositoryId]: isFavorite
      }));

      // API 호출
      if (isFavorite) {
        await api.post(`/api/repositories/${repositoryId}/favorite`);
        toast.success('즐겨찾기에 추가되었습니다.');
      } else {
        await api.delete(`/api/repositories/${repositoryId}/favorite`);
        toast.success('즐겨찾기에서 제거되었습니다.');
      }
    } catch (error) {
      // 실패시 되돌리기
      setFavoriteStates(prev => ({
        ...prev,
        [repositoryId]: !isFavorite
      }));
      console.error('즐겨찾기 상태 변경 실패:', error);
      toast.error('즐겨찾기 상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 백엔드 파일타입을 허용된 FileType으로 필터링하는 함수
  const filterValidFileTypes = (fileTypes: string[]): ('hwp' | 'docx' | 'pdf')[] => {
    const typeMapping: Record<string, 'hwp' | 'docx' | 'pdf'> = {
      'HWP': 'hwp',
      'HWPX': 'hwp',  // HWPX도 HWP로 처리
      'DOC': 'docx',
      'DOCX': 'docx',
      'PDF': 'pdf',
    };

    const mappedTypes = fileTypes
      .map(type => type.toUpperCase()) // 대문자로 변환
      .map(type => typeMapping[type])  // 매핑 테이블에서 변환
      .filter((type): type is 'hwp' | 'docx' | 'pdf' => type !== undefined); // undefined 제거

    // 중복 제거하여 반환
    return [...new Set(mappedTypes)];
  };

  if (loading) {
    return (
      <EmptyStateContainer>
        <LoadingText>레포지토리를 불러오는 중...</LoadingText>
      </EmptyStateContainer>
    );
  }

  if (error) {
    return (
      <EmptyStateContainer>
        <EmptyTitle>오류가 발생했습니다</EmptyTitle>
        <EmptyDescription>{error}</EmptyDescription>
      </EmptyStateContainer>
    );
  }

  if (repositories.length === 0) {
    return (
      <EmptyStateContainer>
        <EmptyIcon src={repoIcon} alt="레포지토리 없음" />
        <EmptyTitle>아직 생성된 레포지토리가 없어요</EmptyTitle>
        <EmptyDescription>
          새로운 레포지토리를 생성하여 문서 관리를 시작해보세요.
        </EmptyDescription>
        <CreateButton onClick={() => window.location.href = '/new-repository'}>
          레포지토리 생성하기
        </CreateButton>
      </EmptyStateContainer>
    );
  }

  return (
    <CardGrid>
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          id={repo.id}
          title={repo.name}
          description={repo.description}
          fileTypes={repo.fileTypes ? filterValidFileTypes(repo.fileTypes) : []}
          isFavorite={favoriteStates[repo.id] || false}
          onFavoriteClick={(isFavorite) => handleFavoriteToggle(repo.id, isFavorite)}
        />
      ))}
    </CardGrid>
  );
};

const LoadingText = styled.div`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
`;

export default RepositorySectionCard; 