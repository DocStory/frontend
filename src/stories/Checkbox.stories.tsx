import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../components/common/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => console.log('Checkbox clicked'),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => console.log('Checkbox clicked'),
  },
};
