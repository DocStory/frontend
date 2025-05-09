import React from 'react';
import RepoTreeGraph from '../components/common/RepoTreeGraph';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RepoTreeGraph> = {
  title: 'Graph/RepoTreeGraph',
  component: RepoTreeGraph,
};
export default meta;

type Story = StoryObj<typeof RepoTreeGraph>;

export const Default: Story = {
  render: () => <div style={{ width: '100vw', height: '80vh' }}><RepoTreeGraph /></div>,
}; 