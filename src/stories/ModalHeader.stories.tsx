import type { Meta, StoryObj } from '@storybook/react';
import ModalHeader from '../components/common/ModalHeader.tsx';

const meta: Meta<typeof ModalHeader> = {
  title: 'Modal/ModalHeader',
  component: ModalHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

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
