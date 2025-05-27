import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import repoIcon from '../assets/repoIcon.svg';
import favoriteIcon from '../assets/clarity_favorite-line.svg';
import { ThemeProvider } from '../contexts/ThemeContext';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  width: 100%;
  height: 400px;
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

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  showButton = false,
  buttonText = '버튼',
  onButtonClick,
}) => (
  <EmptyStateContainer>
    <EmptyIcon src={icon} alt="빈 상태" />
    <EmptyTitle>{title}</EmptyTitle>
    <EmptyDescription>{description}</EmptyDescription>
    {showButton && (
      <CreateButton onClick={onButtonClick}>
        {buttonText}
      </CreateButton>
    )}
  </EmptyStateContainer>
);

const meta = {
  title: 'Common/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '데이터가 없을 때 표시되는 빈 상태 UI 컴포넌트입니다. 아이콘, 제목, 설명, 선택적 버튼을 포함할 수 있습니다.',
      },
    },
  },
  argTypes: {
    icon: {
      description: '표시할 아이콘',
      control: 'text',
    },
    title: {
      description: '빈 상태 제목',
      control: 'text',
    },
    description: {
      control: 'text',
      description: '빈 상태 설명 (HTML 지원)',
    },
    showButton: {
      control: 'boolean',
      description: '버튼 표시 여부',
    },
    buttonText: {
      control: 'text',
      description: '버튼 텍스트',
    },
    onButtonClick: {
      action: 'button clicked',
      description: '버튼 클릭 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyRepository: Story = {
  args: {
    icon: repoIcon,
    title: '아직 저장소가 없습니다',
    description: '첫 번째 저장소를 만들어 프로젝트를 시작해보세요.<br />문서와 파일을 체계적으로 관리할 수 있습니다.',
    showButton: true,
    buttonText: '첫 저장소 만들기',
  },
};

export const EmptyFavorites: Story = {
  args: {
    icon: favoriteIcon,
    title: '즐겨찾기한 저장소가 없습니다',
    description: '자주 사용하는 저장소를 즐겨찾기에 추가하여<br />빠르게 접근할 수 있습니다.',
    showButton: false,
  },
};

export const CustomEmptyState: Story = {
  args: {
    icon: repoIcon,
    title: '사용자 정의 빈 상태',
    description: '이곳에 원하는 메시지를 입력할 수 있습니다.<br />HTML 태그도 지원됩니다.',
    showButton: true,
    buttonText: '액션 실행',
  },
}; 