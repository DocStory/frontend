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
    headerTitle: '무아호',
    headerTime: '2025/03/20 14:30',
    modalTitle: 'PP 상세',
    isEditing: false,
    canEdit: false,
    contentTitle: 'UI 컴포넌트 리팩터링',
    content: '기존 Button, Input, Modal 컴포넌트들을 현대적인 디자인으로 개선하고 접근성을 향상시키는 작업입니다.',
    items: [
      {
        Name: 'UI_리팩터링_제안서.pdf',
        date: 'PDF',
        iconType: 'diff',
      },
      {
        Name: '컴포넌트_디자인_가이드.pdf',
        date: 'PDF',
        iconType: 'download',
      },
    ],
    comments: [
      {
        id: '1',
        author: '홍길동',
        content: '디자인 개선 방향이 좋네요. 특히 모달 컴포넌트의 일관성이 많이 향상된 것 같습니다.',
        createdAt: '2025-03-20T14:15:00',
        updatedAt: '2025-03-20T14:15:00',
        isAuthor: false,
      },
      {
        id: '2',
        author: '김철수',
        content: '접근성 개선 부분도 잘 반영되었습니다. 키보드 네비게이션이 매끄럽게 작동하네요.',
        createdAt: '2025-03-20T14:20:00',
        updatedAt: '2025-03-20T14:20:00',
        isAuthor: true,
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
    headerTitle: '무아호',
    headerTime: '2025/03/20 09:45',
    modalTitle: 'PP 상세',
    isEditing: true,
    canEdit: true,
    contentTitle: 'API 성능 최적화',
    content: '데이터베이스 쿼리 최적화와 캐싱 전략을 통해 API 응답 시간을 단축하는 작업입니다.',
    items: [
      {
        Name: 'API_성능_분석_보고서.pdf',
        date: 'PDF',
        iconType: 'diff',
      },
      {
        Name: '최적화_결과_비교.xlsx',
        date: 'Excel',
        iconType: 'download',
      },
    ],
    comments: [
      {
        id: '1',
        author: '이영희',
        content: '성능 개선 결과가 인상적이네요. 응답 시간이 40% 단축된 것은 큰 성과입니다.',
        createdAt: '2025-03-20T09:30:00',
        updatedAt: '2025-03-20T09:30:00',
        isAuthor: false,
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
    headerTitle: '박민수',
    headerTime: '2025/03/19 16:20',
    modalTitle: 'PP 상세',
    isEditing: false,
    canEdit: true,
    contentTitle: '다국어 지원 시스템 구축',
    content: 'i18n을 활용한 다국어 지원 시스템을 구축합니다. 현재 한국어, 영어, 일본어를 지원하며 향후 확장 가능한 구조로 설계되었습니다.',
    items: [
      {
        Name: '다국어_지원_명세서.pdf',
        date: 'PDF',
        iconType: 'diff',
      },
      {
        Name: '번역_리소스_파일.zip',
        date: 'Archive',
        iconType: 'download',
      },
      {
        Name: '테스트_케이스_문서.docx',
        date: 'Word',
        iconType: 'download',
      },
    ],
    comments: [
      {
        id: '1',
        author: '최지영',
        content: '다국어 지원 구조가 잘 설계되었네요. 번역 품질도 높은 것 같습니다.',
        createdAt: '2025-03-19T16:00:00',
        updatedAt: '2025-03-19T16:00:00',
        isAuthor: false,
      },
      {
        id: '2',
        author: '정우성',
        content: '향후 확장성도 고려된 점이 좋습니다. 다른 언어 추가도 쉬울 것 같아요.',
        createdAt: '2025-03-19T16:10:00',
        updatedAt: '2025-03-19T16:10:00',
        isAuthor: true,
      },
    ],
    onReject: () => {},
    onAccept: () => {},
    role: 'Reviewer',
  },
};
