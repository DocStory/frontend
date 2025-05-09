import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SettingsModal from '../components/layout/SettingsModal.tsx';
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
  title: 'Layout/SettingsModal',
  component: SettingsModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '앱의 설정을 관리하는 모달 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: '모달의 열림/닫힘 상태',
      control: 'boolean',
      defaultValue: true,
    },
    onClose: {
      description: '모달을 닫는 함수',
      action: 'clicked',
    },
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof SettingsModal>;

export default meta;

type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
