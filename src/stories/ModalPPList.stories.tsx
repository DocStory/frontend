import type { Meta, StoryObj } from '@storybook/react';
import ModalPPList from '../components/layout/ModalPPList';
import type { PPItem } from '../components/layout/ModalPPList';

const meta: Meta<typeof ModalPPList> = {
  title: 'Layout/ModalPPList',
  component: ModalPPList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalPPList>;

const mockItems: PPItem[] = [
  {
    Name: '프로젝트 A',
    content: '프로젝트 A는 현재 진행 중인 프로젝트입니다. 주요 기능 개발이 완료되었으며, 현재 테스트 단계에 있습니다.',
    status: 'progress',
  },
  {
    Name: '프로젝트 B',
    content: '프로젝트 B는 개발이 완료되어 머지된 프로젝트입니다. 모든 기능이 구현되었으며, 코드 리뷰를 통과했습니다.',
    status: 'merge',
  },
  {
    Name: '프로젝트 C',
    content: '프로젝트 C는 종료된 프로젝트입니다. 모든 작업이 완료되었으며, 프로덕션 환경에 배포되었습니다.',
    status: 'close',
  },
  {
    Name: '프로젝트 D',
    content: '프로젝트 D는 새로운 기능을 개발 중인 프로젝트입니다. 현재 초기 단계이며, 기본 구조 설계가 진행 중입니다.',
    status: 'progress',
  },
  {
    Name: '프로젝트 E',
    content: '프로젝트 E는 최근에 머지된 프로젝트입니다. 성능 최적화 작업이 포함되어 있으며, 모든 테스트를 통과했습니다.',
    status: 'merge',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleItem: Story = {
  args: {
    items: [mockItems[0]],
  },
};

export const ManyItems: Story = {
  args: {
    items: [...mockItems, ...mockItems, ...mockItems],
  },
};

export const ProgressOnly: Story = {
  args: {
    items: mockItems.filter(item => item.status === 'progress'),
  },
};

export const MergeOnly: Story = {
  args: {
    items: mockItems.filter(item => item.status === 'merge'),
  },
};

export const CloseOnly: Story = {
  args: {
    items: mockItems.filter(item => item.status === 'close'),
  },
};
