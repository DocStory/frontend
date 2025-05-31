import type { Meta, StoryObj } from '@storybook/react';
import ModalPPList from '../components/layout/ModalPPList';
import type { PPItem } from '../components/layout/ModalPPList';

const meta: Meta<typeof ModalPPList> = {
  title: 'Layout/ModalPPList',
  component: ModalPPList,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalPPList>;

const mockItems: PPItem[] = [
  {
    id: '1',
    Name: '사용자 인증 시스템 개선',
    content: '기존 로그인 시스템의 보안을 강화하고 2FA 인증을 추가하는 작업입니다. JWT 토큰 관리 방식도 개선합니다.',
    status: 'progress',
  },
  {
    id: '2',
    Name: 'API 성능 최적화',
    content: '데이터베이스 쿼리 최적화와 캐싱 전략을 통해 API 응답 시간을 30% 단축했습니다.',
    status: 'merge',
  },
  {
    id: '3',
    Name: 'UI/UX 리디자인',
    content: '모바일 반응형 디자인을 적용하고 사용자 경험을 개선했습니다.',
    status: 'close',
  },
  {
    id: '4',
    Name: '다국어 지원 기능',
    content: 'i18n을 활용한 다국어 지원 시스템을 구축 중입니다. 현재 한국어, 영어, 일본어를 지원합니다.',
    status: 'progress',
  },
  {
    id: '5',
    Name: '데이터 백업 시스템',
    content: '자동 백업 시스템을 구축하여 데이터 안정성을 확보했습니다.',
    status: 'merge',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    onClose: () => console.log('Modal closed'),
    onProposalClick: (id) => console.log('Proposal clicked:', id),
  },
};

export const ProgressOnly: Story = {
  args: {
    items: mockItems.filter(item => item.status === 'progress'),
    onClose: () => console.log('Modal closed'),
    onProposalClick: (id) => console.log('Proposal clicked:', id),
  },
};

export const CompletedOnly: Story = {
  args: {
    items: mockItems.filter(item => item.status === 'merge' || item.status === 'close'),
    onClose: () => console.log('Modal closed'),
    onProposalClick: (id) => console.log('Proposal clicked:', id),
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    onClose: () => console.log('Modal closed'),
    onProposalClick: (id) => console.log('Proposal clicked:', id),
  },
};
