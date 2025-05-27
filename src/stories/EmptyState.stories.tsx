import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import repoIcon from '../assets/repoIcon.svg';
import favoriteIcon from '../assets/clarity_favorite-line.svg';

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
  color: #666;
  margin: 0 0 12px 0;
`;

const EmptyDescription = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: #999;
  margin: 0 0 32px 0;
  line-height: 1.5;
  max-width: 400px;
`;

const CreateButton = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: #4285f4;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3367d6;
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
}) => {
  return (
    <EmptyStateContainer>
      <EmptyIcon src={icon} alt={title} />
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription dangerouslySetInnerHTML={{ __html: description }} />
      {showButton && (
        <CreateButton onClick={onButtonClick}>
          {buttonText}
        </CreateButton>
      )}
    </EmptyStateContainer>
  );
};

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: '빈 상태에 표시할 아이콘 경로',
    },
    title: {
      control: 'text',
      description: '빈 상태 제목',
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