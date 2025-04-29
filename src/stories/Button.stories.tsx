// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;

// 스토리 템플릿
const Template = (args: any) => <Button {...args} />;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: Template,
  args: {
    children: '생성하기',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    children: '거절하기',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Outline: Story = {
  render: Template,
  args: {
    children: '취소하기',
    variant: 'outline',
    size: 'medium',
  },
};

export const Danger: Story = {
  render: Template,
  args: {
    children: '거절하기',
    variant: 'danger',
    size: 'medium',
  },
};

export const Large: Story = {
  render: Template,
  args: {
    children: '새로운 반영 생성하기',
    variant: 'primary',
    size: 'large',
  },
};

export const Small: Story = {
  render: Template,
  args: {
    children: '새 레포지토리',
    variant: 'primary',
    size: 'small',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    children: '비활성화',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
}; 