import type { Meta, StoryObj } from '@storybook/react';
import ModalContent from '../components/common/ModalContent.tsx';

const meta: Meta<typeof ModalContent> = {
  title: 'Modal/ModalContent',
  component: ModalContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalContent>;

export const Default: Story = {
  args: {
    title: '서식 제목',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isEditing: false,
  },
};

export const Editing: Story = {
  args: {
    title: '서식 제목',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isEditing: true,
  },
};
