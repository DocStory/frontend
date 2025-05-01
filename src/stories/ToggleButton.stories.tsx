import { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '../components/common/ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'Common/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

const options = [
  { label: '관리자', value: 'admin' },
  { label: '리뷰어', value: 'reviewer' },
];

export const Admin: Story = {
  args: {
    currentValue: 'admin',
    options,
    onChange: (value) => console.log('Selected:', value),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const Reviewer: Story = {
  args: {
    currentValue: 'reviewer',
    options,
    onChange: (value) => console.log('Selected:', value),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const WithoutDelete: Story = {
  args: {
    currentValue: 'admin',
    options,
    onChange: (value) => console.log('Selected:', value),
  },
};
