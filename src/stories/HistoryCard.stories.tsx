// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HistoryCard from '../components/history/HistoryCard';
import avatarImg from '../assets/avatar.svg';

const meta: Meta<typeof HistoryCard> = {
  title: 'History/HistoryCard',
  component: HistoryCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HistoryCard>;

export const MainSmall: Story = {
  args: {
    isMain: true,
    userName: '홍길동',
    userAvatar: avatarImg,
    title: 'AI 프로젝트 생성',
    description: 'AI 프로젝트 초기 생성 파일에서 필요한 부분과 수정, 추가 해야 할 부분들을 추가했습니다.',
    timeAgo: '10분전',
  },
  parameters: {
    pseudo: { hover: false },
  },
};

export const MainExpanded: Story = {
  args: {
    isMain: true,
    userName: '홍길동',
    userAvatar: avatarImg,
    title: 'AI 프로젝트 생성',
    description: 'AI 프로젝트 초기 생성 파일에서 필요한 부분과 수정, 추가 해야 할 부분들을 추가했습니다.',
    timeAgo: '10분전',
  },
  render: (args) => <HistoryCard {...args} />, // 실제로는 hover 상태를 강제로 보여주려면 내부 코드 수정 필요
};

export const NotMainSmall: Story = {
  args: {
    isMain: false,
    userName: '홍길동',
    userAvatar: avatarImg,
    title: 'AI 프로젝트 생성(2) - 수정',
    description: '간단 설명',
    timeAgo: '1시간전',
  },
};

export const NotMainExpanded: Story = {
  args: {
    isMain: false,
    userName: '홍길동',
    userAvatar: avatarImg,
    title: 'AI 프로젝트 생성(2) - 2차수정',
    description: 'AI 프로젝트 초기 생성 파일에서 필요한 부분과 수정, 추가 해야 할 부분들을 추가했습니다.',
    timeAgo: '2시간전',
  },
  render: (args) => <HistoryCard {...args} />, // hover 상태 강제 필요시 내부 코드 수정
}; 