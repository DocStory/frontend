import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HistoryAddButton from '../components/common/HistoryAddButton';

const meta: Meta<typeof HistoryAddButton> = {
  title: 'Common/HistoryAddButton',
  component: HistoryAddButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HistoryAddButton>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}; 