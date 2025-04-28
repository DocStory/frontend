import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RepoHeader from '../components/layout/RepoHeader';

const meta: Meta<typeof RepoHeader> = {
  title: 'Layout/RepoHeader',
  component: RepoHeader,
};
export default meta;

type Story = StoryObj<typeof RepoHeader>;

export const Default: Story = {
  render: () => <RepoHeader />,
}; 