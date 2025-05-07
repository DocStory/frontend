import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InfoList from '../components/common/InfoList.tsx';

const meta = {
  title: 'Common/InfoList',
  component: InfoList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자의 기본 정보를 표시하는 리스트 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    name: {
      description: '사용자 이름',
      control: 'text',
    },
    email: {
      description: '사용자 이메일',
      control: 'text',
    },
    phoneNumber: {
      description: '전화번호',
      control: 'text',
    },
    address: {
      description: '주소',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoList>;

export default meta;

type Story = StoryObj<typeof InfoList>;

export const Default: Story = {
  args: {
    name: '홍길동',
    email: 'hong@example.com',
    phoneNumber: '010-xxxx-xxxx',
    address: 'korea',
  },
};

export const LongText: Story = {
  args: {
    name: '매우 긴 이름을 가진 사용자의 예시입니다',
    email: 'very.long.email.address.example@very-long-domain-name.com',
    phoneNumber: '010-xxxx-xxxx',
    address: 'korea',
  },
};
