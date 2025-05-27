import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserInfoModal from '../components/layout/UserInfoModal';

const meta: Meta<typeof UserInfoModal> = {
  title: 'Layout/UserInfoModal',
  component: UserInfoModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자 정보를 표시하고 편집할 수 있는 모달 컴포넌트입니다. 닉네임 옆의 편집 아이콘을 클릭하여 이름을 수정할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    userName: {
      control: 'text',
      description: '사용자 이름',
    },
    userEmail: {
      control: 'text',
      description: '사용자 이메일',
    },
    phoneNumber: {
      control: 'text',
      description: '전화번호',
    },
    address: {
      control: 'text',
      description: '주소',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 핸들러',
    },
    onUserNameChange: {
      action: 'userNameChanged',
      description: '사용자 이름 변경 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserInfoModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    userName: '홍길동',
    userEmail: 'yourname@gmail.com',
    phoneNumber: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 사용자 정보 모달입니다. 닉네임 옆의 편집 아이콘을 클릭하면 이름을 수정할 수 있습니다.',
      },
    },
  },
};

export const WithLongName: Story = {
  args: {
    isOpen: true,
    userName: '김아주긴이름을가진사용자',
    userEmail: 'verylongusername@example.com',
    phoneNumber: '010-9876-5432',
    address: '부산광역시 해운대구 센텀중앙로 79',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이름을 가진 사용자의 정보 모달입니다. 레이아웃이 적절히 조정되는지 확인할 수 있습니다.',
      },
    },
  },
};

export const WithShortName: Story = {
  args: {
    isOpen: true,
    userName: '김철수',
    userEmail: 'kim@test.com',
    phoneNumber: '010-1111-2222',
    address: '대구광역시 중구 동성로',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 이름을 가진 사용자의 정보 모달입니다.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    userName: '홍길동',
    userEmail: 'yourname@gmail.com',
    phoneNumber: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
  },
  parameters: {
    docs: {
      description: {
        story: '닫힌 상태의 모달입니다. 실제로는 보이지 않습니다.',
      },
    },
  },
};
