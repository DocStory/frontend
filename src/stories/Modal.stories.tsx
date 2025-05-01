import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/layout/Modal';

const meta: Meta<typeof Modal> = {
  title: 'LAYOUT/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const CenteredWrapper = (props: { children: React.ReactNode }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F1F5F9',
    }}
  >
    {props.children}
  </div>
);

export const PP_조회: Story = {
  render: (args) => (
    <CenteredWrapper>
      <Modal {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: '문서 제목',
    headerTime: '2025/03/20',
    isEditing: false,
    canEdit: false,
    contentTitle: '문서 내용',
    content: '문서 내용입니다.',
    items: [
      {
        Name: 'File.pdf',
        date: '2025/03/20',
        iconType: 'download',
      },
      {
        Name: 'Changes.pdf',
        date: '2025/03/20',
        iconType: 'diff',
      },
    ],
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
    onReject: () => {},
    onAccept: () => {},
    role: 'user',
  },
};

export const PP_수정: Story = {
  render: (args) => (
    <CenteredWrapper>
      <Modal {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: 'AI 프로젝트',
    headerTime: '7시간 전',
    isEditing: true,
    canEdit: true,
    contentTitle: '서식 제목',
    content: '저장 아이콘이 보이는 수정 중인 상태',
    items: [
      {
        Name: 'File.pdf',
        date: '2025/03/20',
        iconType: 'download',
      },
      {
        Name: 'Changes.pdf',
        date: '2025/03/20',
        iconType: 'diff',
      },
    ],
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
    onReject: () => {},
    onAccept: () => {},
    role: 'Reviewer',
  },
};

export const PP_조회_병합_권한: Story = {
  render: (args) => (
    <CenteredWrapper>
      <Modal {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: 'AI 프로젝트',
    headerTime: '7시간 전',
    isEditing: false,
    canEdit: true,
    contentTitle: '서식 제목',
    content: '병합 권한이 있는 경우',
    items: [
      {
        Name: 'File.pdf',
        date: '2025/03/20',
        iconType: 'download',
      },
      {
        Name: 'Changes.pdf',
        date: '2025/03/20',
        iconType: 'diff',
      },
    ],
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
    onReject: () => {},
    onAccept: () => {},
    role: 'Reviewer',
  },
};
