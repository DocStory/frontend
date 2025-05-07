import type { Meta, StoryObj } from '@storybook/react';
import ProfileList from '../components/common/ProfileList.tsx';

const meta: Meta<typeof ProfileList> = {
  title: 'Common/ProfileList',
  component: ProfileList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfileList>;

export const Default: Story = {
  args: {
    title: 'AI 프로젝트',
    time: '7시간 전',
    isEditing: false,
    canEdit: false,
  },
};

export const Save: Story = {
  args: {
    title: 'AI 프로젝트',
    time: '7시간 전',
    isEditing: true,
    canEdit: true,
  },
};

export const Pencil: Story = {
  args: {
    title: 'AI 프로젝트',
    time: '7시간 전',
    isEditing: false,
    canEdit: true,
  },
};
