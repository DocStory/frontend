import type { Meta, StoryObj } from '@storybook/react';
import ContentArea from "../components/common/ContentArea.tsx";

const meta: Meta<typeof ContentArea> = {
  title: 'Common/ContentArea',
  component: ContentArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentArea>;

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
