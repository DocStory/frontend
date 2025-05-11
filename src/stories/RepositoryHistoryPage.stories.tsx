import type { Meta, StoryObj } from '@storybook/react';
import RepositoryHistoryPage from '../components/pages/RepositoryHistoryPage';

const meta = {
  title: 'Pages/RepositoryHistoryPage',
  component: RepositoryHistoryPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RepositoryHistoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 