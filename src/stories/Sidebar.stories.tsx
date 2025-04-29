// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '../components/layout/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Common/SideBar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {},
}; 