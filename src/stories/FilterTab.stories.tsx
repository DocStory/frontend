import type { Meta, StoryObj } from '@storybook/react';
import FilterTab from '../components/common/FilterTab';

const meta: Meta<typeof FilterTab> = {
  title: 'Common/FilterTab',
  component: FilterTab,
  argTypes: {
    label: { control: 'text' },
    isActive: { control: 'boolean' },
    showLine: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterTab>;

export const Default: Story = {
  args: {
    label: '전체보기',
    isActive: false,
    showLine: false,
  },
};

export const Active: Story = {
  args: {
    label: '전체보기',
    isActive: true,
    showLine: false,
  },
};

export const WithLine: Story = {
  args: {
    label: '전체보기',
    isActive: true,
    showLine: true,
  },
};
