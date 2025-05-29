import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CanvasRepoGraph from '../components/common/CanvasRepoGraph';
import avatarImg from '../assets/avatar.svg';

const meta: Meta<typeof CanvasRepoGraph> = {
  title: 'Common/CanvasRepoGraph',
  component: CanvasRepoGraph,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CanvasRepoGraph>;

// 샘플 노드 데이터
const sampleNodes = [
  {
    id: '1',
    userName: '김철수',
    userAvatar: avatarImg,
    title: 'AI 프로젝트 초기 설정',
    description: 'AI 프로젝트의 기본 폴더 구조와 설정 파일들을 생성했습니다.',
    timeAgo: '10분 전',
    isMain: true,
    x: 100,
    y: 100,
    historyId: '1',
    onDetailClick: (historyId: string) => console.log('Detail clicked:', historyId),
    currentUserId: 'user1',
    historyCreatorId: 'user1',
    onEditClick: (historyId: string) => console.log('Edit clicked:', historyId),
    onCreateClick: (historyId?: string) => console.log('Create clicked:', historyId),
    onProposalClick: (historyId: string) => console.log('Proposal clicked:', historyId),
  },
  {
    id: '2',
    userName: '이영희',
    userAvatar: avatarImg,
    title: '데이터 모델 설계',
    description: '사용자 데이터와 AI 모델을 위한 데이터베이스 스키마를 설계했습니다.',
    timeAgo: '1시간 전',
    isMain: false,
    x: 500,
    y: 100,
    historyId: '2',
    onDetailClick: (historyId: string) => console.log('Detail clicked:', historyId),
    currentUserId: 'user1',
    historyCreatorId: 'user2',
    onEditClick: (historyId: string) => console.log('Edit clicked:', historyId),
    onCreateClick: (historyId?: string) => console.log('Create clicked:', historyId),
    onProposalClick: (historyId: string) => console.log('Proposal clicked:', historyId),
  },
  {
    id: '3',
    userName: '박민수',
    userAvatar: avatarImg,
    title: 'API 엔드포인트 구현',
    description: 'RESTful API 엔드포인트와 OpenAPI 스펙을 작성했습니다.',
    timeAgo: '2시간 전',
    isMain: false,
    x: 300,
    y: 350,
    historyId: '3',
    onDetailClick: (historyId: string) => console.log('Detail clicked:', historyId),
    currentUserId: 'user1',
    historyCreatorId: 'user3',
    onEditClick: (historyId: string) => console.log('Edit clicked:', historyId),
    onCreateClick: (historyId?: string) => console.log('Create clicked:', historyId),
    onProposalClick: (historyId: string) => console.log('Proposal clicked:', historyId),
  },
  {
    id: '4',
    userName: '정수진',
    userAvatar: avatarImg,
    title: '프론트엔드 UI 구현',
    description: 'React 컴포넌트와 styled-components를 사용한 UI를 구현했습니다.',
    timeAgo: '3시간 전',
    isMain: true,
    x: 700,
    y: 350,
    historyId: '4',
    onDetailClick: (historyId: string) => console.log('Detail clicked:', historyId),
    currentUserId: 'user1',
    historyCreatorId: 'user4',
    onEditClick: (historyId: string) => console.log('Edit clicked:', historyId),
    onCreateClick: (historyId?: string) => console.log('Create clicked:', historyId),
    onProposalClick: (historyId: string) => console.log('Proposal clicked:', historyId),
  }
];

// 샘플 엣지 데이터
const sampleEdges = [
  {
    source: '1',
    target: '2',
  },
  {
    source: '1',
    target: '3',
  },
  {
    source: '2',
    target: '4',
  },
];

export const Default: Story = {
  args: {
    nodes: sampleNodes,
    edges: sampleEdges,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoEdges: Story = {
  args: {
    nodes: sampleNodes,
    edges: [],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const SmallGraph: Story = {
  args: {
    nodes: sampleNodes.slice(0, 2),
    edges: sampleEdges.slice(0, 1),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const LargeGraph: Story = {
  args: {
    nodes: [
      ...sampleNodes,
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `${i + 5}`,
        userName: `사용자 ${i + 5}`,
        userAvatar: avatarImg,
        title: `히스토리 ${i + 5}`,
        description: `추가 히스토리 설명 ${i + 5}`,
        timeAgo: `${i + 4}시간 전`,
        isMain: i % 3 === 0,
        x: (i + 1) * 200,
        y: (i + 1) * 150,
        historyId: `${i + 5}`,
        onDetailClick: (historyId: string) => console.log('Detail clicked:', historyId),
        currentUserId: 'user1',
        historyCreatorId: `user${i + 5}`,
        onEditClick: (historyId: string) => console.log('Edit clicked:', historyId),
        onCreateClick: (historyId?: string) => console.log('Create clicked:', historyId),
        onProposalClick: (historyId: string) => console.log('Proposal clicked:', historyId),
      }))
    ],
    edges: [
      ...sampleEdges,
      ...Array.from({ length: 4 }, (_, i) => ({
        source: `${i + 1}`,
        target: `${i + 5}`,
      }))
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}; 