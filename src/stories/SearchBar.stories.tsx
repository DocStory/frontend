import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/common/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Common/SearchBar',
  component: SearchBar,
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => <SearchBar />,
}; 