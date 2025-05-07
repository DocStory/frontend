import type { Meta, StoryObj } from '@storybook/react';
import RecentActivityCard from '../components/common/RecentActivityCard.tsx';
import styled from 'styled-components';

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;

const meta: Meta<typeof RecentActivityCard> = {
  title: 'Common/RecentActivityCard',
  component: RecentActivityCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecentActivityCard>;

export const Default: Story = {
  render: (args) => (
    <CenteredWrapper>
      <RecentActivityCard {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: '서영진',
    headerTime: '1시간전',
    contentTitle: '문서 내용',
    content:
      '문서 내용입니다. 이것은 예시 텍스트입니다. 문서의 내용이 길어질 수 있으므로 여러 줄의 텍스트를 표시해봅니다. 모달의 크기가 내용에 맞춰 자동으로 조절되는 것을 확인할 수 있습니다.',
  },
};

export const Editing: Story = {
  render: (args) => (
    <CenteredWrapper>
      <RecentActivityCard {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: '문서 제목',
    headerTime: '2025/03/20',
    contentTitle: '문서 내용',
    content:
      '문서 내용입니다. 이것은 예시 텍스트입니다. 문서의 내용이 길어질 수 있으므로 여러 줄의 텍스트를 표시해봅니다. 모달의 크기가 내용에 맞춰 자동으로 조절되는 것을 확인할 수 있습니다.',
    isEditing: true,
    canEdit: true,
  },
};
