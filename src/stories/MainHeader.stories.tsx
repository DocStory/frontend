import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MainHeader from '../components/layout/MainHeader';

const meta: Meta<typeof MainHeader> = {
  title: 'Layout/MainHeader',
  component: MainHeader,
};
export default meta;

type Story = StoryObj<typeof MainHeader>;

export const Default: Story = {
  render: () => <MainHeader />,
}; 