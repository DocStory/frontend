import type { Meta, StoryObj } from '@storybook/react';
import ModalFooter from '../components/common/ModalFooter.tsx';

const meta: Meta<typeof ModalFooter> = {
  title: 'Modal/ModalFooter',
  component: ModalFooter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalFooter>;

export const Default: Story = {
  args: {
    onReject: () => console.log('Reject clicked'),
    onAccept: () => console.log('Accept clicked'),
  },
};

export const Admin: Story = {
  args: {
    onReject: () => console.log('Reject clicked'),
    onAccept: () => console.log('Accept clicked'),
    role: 'admin',
  },
};

export const Reviewer: Story = {
  args: {
    onReject: () => console.log('Reject clicked'),
    onAccept: () => console.log('Accept clicked'),
    role: 'Reviewer',
  },
};
