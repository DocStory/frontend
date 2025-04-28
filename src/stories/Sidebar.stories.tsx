import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '../components/common/SideBar';

const meta: Meta<typeof SideBar> = {
  title: 'Common/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeMenu: {
      control: 'select',
      options: ['홈', '저장소', '도움말'],
      description: '활성화된 메뉴',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    activeMenu: '홈',
  },
};

export const RepositoryActive: Story = {
  args: {
    activeMenu: '저장소',
  },
};

export const HelpActive: Story = {
  args: {
    activeMenu: '도움말',
  },
}; 