import type { Meta, StoryObj } from '@storybook/react';
import ModalComment from '../components/common/ModalComment.tsx';

const meta: Meta<typeof ModalComment> = {
  title: 'Modal/ModalComment',
  component: ModalComment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalComment>;

export const Empty: Story = {
  args: {
    comments: [],
  },
};

export const Default: Story = {
  args: {
    comments: [
      {
        author: '홍길동',
        content: '첫 번째 댓글입니다. 문서 내용에 대한 피드백을 남깁니다.',
      },
      {
        author: '김철수',
        content: '두 번째 댓글입니다. 추가적인 의견을 남깁니다.',
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    comments: [
      {
        author: '홍길동',
        content: '첫 번째 댓글입니다. 문서 내용에 대한 피드백을 남깁니다.',
      },
      {
        author: '김철수',
        content: '두 번째 댓글입니다. 추가적인 의견을 남깁니다.',
      },
      {
        author: '이영희',
        content: '세 번째 댓글입니다. 다른 관점에서의 의견을 남깁니다.',
      },
    ],
  },
};
