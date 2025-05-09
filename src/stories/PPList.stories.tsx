import type { Meta, StoryObj } from '@storybook/react';
import PPList, { PPItem } from '../components/common/PPList.tsx';

const meta: Meta<typeof PPList> = {
  title: 'Common/PPList',
  component: PPList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PPList>;

const progressItem: PPItem = {
  Name: '프로젝트 A',
  content: '프로젝트 A는 현재 진행 중인 프로젝트입니다. 주요 기능 개발이 완료되었으며, 현재 테스트 단계에 있습니다.',
  status: 'progress',
};

const mergeItem: PPItem = {
  Name: '프로젝트 B',
  content: '프로젝트 B는 개발이 완료되어 머지된 프로젝트입니다. 모든 기능이 구현되었으며, 코드 리뷰를 통과했습니다.',
  status: 'merge',
};

const closeItem: PPItem = {
  Name: '프로젝트 C',
  content: '프로젝트 C는 종료된 프로젝트입니다. 모든 작업이 완료되었으며, 프로덕션 환경에 배포되었습니다.',
  status: 'close',
};

export const Progress: Story = {
  args: {
    items: [progressItem],
  },
};

export const Merge: Story = {
  args: {
    items: [mergeItem],
  },
};

export const Close: Story = {
  args: {
    items: [closeItem],
  },
};

export const AllStates: Story = {
  args: {
    items: [progressItem, mergeItem, closeItem],
  },
}; 