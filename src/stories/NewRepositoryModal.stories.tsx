import type { Meta, StoryObj } from '@storybook/react';
import NewRepositoryModal from '../components/common/NewRepositoryModal';

const meta: Meta<typeof NewRepositoryModal> = {
  title: 'Components/Common/NewRepositoryModal',
  component: NewRepositoryModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '새로운 저장소를 생성하는 모달 컴포넌트입니다. 제목, 설명, 파일 첨부 기능을 제공합니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    onClose: {
      action: 'close',
      description: '모달 닫기 핸들러',
    },
    onSubmit: {
      action: 'submit',
      description: '폼 제출 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const WithSubmitAction: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => {
      console.log('Repository created with data:', data);
      alert(`프로젝트 "${data.title}"가 생성되었습니다!`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: '실제 제출 동작을 확인할 수 있는 스토리입니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => {
      console.log('Repository data:', data);
      alert(`
프로젝트가 생성되었습니다!
제목: ${data.title}
설명: ${data.description || '없음'}
첨부파일: ${data.files.length}개
      `);
    },
  },
  parameters: {
    docs: {
      description: {
        story: '실제 모달 동작을 테스트할 수 있는 인터랙티브 스토리입니다. 폼을 작성하고 제출해보세요.',
      },
    },
  },
}; 