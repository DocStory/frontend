import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '../components/layout/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isCollapsed: {
      control: 'boolean',
      description: '사이드바 접힘 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    isCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
}; 