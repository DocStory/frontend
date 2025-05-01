import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserInfoModal from '../components/layout/UserInfoModal.tsx';
import styled from 'styled-components';

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const meta = {
  title: 'Layout/UserInfoModal',
  component: UserInfoModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사용자의 프로필 정보를 보여주는 모달 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: '모달의 열림/닫힘 상태',
      control: 'boolean',
    },
    onClose: {
      description: '모달을 닫는 함수',
    },
    userName: {
      description: '사용자 이름',
      control: 'text',
    },
    userEmail: {
      description: '사용자 이메일',
      control: 'text',
    },
    phoneNumber: {
      description: '휴대폰 번호',
      control: 'text',
    },
    address: {
      description: '주소',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof UserInfoModal>;

export default meta;

type Story = StoryObj<typeof UserInfoModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    userName: '홍길동',
    userEmail: 'hong@example.com',
    phoneNumber: '010-1234-5678',
    address: 'Korea',
  },
};
