import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserInfoModal from '../components/layout/UserInfoModal';

const meta = {
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
} satisfies Meta<typeof UserInfoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

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
        story: '기본 사용자 정보 모달입니다. 이름 편집 기능과 하단에 회원 탈퇴 버튼이 포함되어 있습니다.',
      },
    },
  },
};

export const LongUserName: Story = {
  args: {
    isOpen: true,
    userName: '매우긴사용자이름입니다',
    userEmail: 'verylongusername@gmail.com',
    phoneNumber: '010-9876-5432',
    address: '부산광역시 해운대구 센텀중앙로 48',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 사용자 이름이 표시된 경우의 모달입니다.',
      },
    },
  },
};

export const ShortUserName: Story = {
  args: {
    isOpen: true,
    userName: '김',
    userEmail: 'kim@example.com',
    phoneNumber: '010-1111-2222',
    address: '대구광역시 중구 국채보상로 102',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 사용자 이름이 표시된 경우의 모달입니다.',
      },
    },
  },
};

export const WithdrawAction: Story = {
  args: {
    isOpen: true,
    userName: '탈퇴예정자',
    userEmail: 'withdraw@example.com',
    phoneNumber: '010-0000-0000',
    address: '서울특별시 종로구 종로 1',
  },
  parameters: {
    docs: {
      description: {
        story: '회원 탈퇴 버튼을 클릭하면 확인 다이얼로그가 나타나며, 확인 시 탈퇴 처리됩니다.',
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
        story: '닫힌 상태의 모달입니다.',
      },
    },
  },
};
