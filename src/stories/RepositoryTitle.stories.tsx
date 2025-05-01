import type { Meta, StoryObj } from '@storybook/react';
import RepositoryTile from '../components/layout/RepositoryTitle.tsx';

const meta: Meta<typeof RepositoryTile> = {
  title: 'Layout/RepositoryTitle',
  component: RepositoryTile,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RepositoryTile>;

export const Default: Story = {
  args: {
    title: 'AI 프로젝트 생성',
    subtitle: '2025 상반기 프로젝트',
    onTabChange: (tab) => console.log('Tab changed:', tab),
    onCreateClick: () => console.log('Create clicked'),
  },
};
