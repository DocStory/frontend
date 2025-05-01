import type { Meta, StoryObj } from '@storybook/react';
import ModalSimple from '../components/layout/ModalSimple';

const meta: Meta<typeof ModalSimple> = {
  title: 'LAYOUT/ModalSimple',
  component: ModalSimple,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalSimple>;

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

export const History_조회: Story = {
  render: (args) => (
    <CenteredWrapper>
      <ModalSimple {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: '문서 제목',
    headerTime: '2025/03/20',
    modalTitle: 'History',
    contentTitle: '문서 내용',
    content: '문서 내용입니다.',
    items: [
      {
        Name: 'File.pdf',
        date: '2025/03/20',
        iconType: 'download',
      },
    ],
  },
};

export const History_PP_생성: Story = {
  render: (args) => (
    <CenteredWrapper>
      <ModalSimple {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: 'AI 프로젝트',
    headerTime: '7시간 전',
    modalTitle: 'History/PP',
    isEditing: true,
    canEdit: true,
    contentTitle: '서식 제목',
    content: '저장 아이콘이 보이는 상태',
    items: [
      {
        Name: '파일을 추가해주세요.',
        date: '',
        iconType: 'upload',
      },
    ],
  },
};

export const History_PP_수정: Story = {
  render: (args) => (
    <CenteredWrapper>
      <ModalSimple {...args} />
    </CenteredWrapper>
  ),
  args: {
    headerTitle: 'AI 프로젝트',
    headerTime: '7시간 전',
    modalTitle: 'History/PP',
    isEditing: true,
    canEdit: true,
    contentTitle: '서식 제목',
    content: '저장 아이콘이 보이는 상태',
    items: [
      {
        Name: 'File.pdf',
        date: '2025/03/20',
        iconType: 'upload',
      },
    ],
  },
};
