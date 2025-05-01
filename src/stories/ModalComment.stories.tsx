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
        content:
          'All occur 글로벌 영어 발음 전체 듣기 · 미국 발음듣기 · 영국 발음듣기 · 호주 발음듣기 · 인도 발음듣기. Listen',
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
    ],
  },
};
