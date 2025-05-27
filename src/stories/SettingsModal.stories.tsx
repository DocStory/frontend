import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SettingsModal from '../components/layout/SettingsModal.tsx';
import { ThemeProvider } from '../contexts/ThemeContext';
import styled from 'styled-components';

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.surface};
`;

const meta = {
  title: 'Layout/SettingsModal',
  component: SettingsModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '앱의 설정을 관리하는 모달 컴포넌트입니다. 알림 설정과 테마 설정(라이트/다크 모드)을 제공합니다.',
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
      <ThemeProvider>
        <StoryContainer>
          <Story />
        </StoryContainer>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof SettingsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('모달 닫기'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 설정 모달입니다. 알림 설정과 테마 설정을 포함합니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('모달 닫기'),
  },
  parameters: {
    docs: {
      description: {
        story: '라이트 테마가 적용된 설정 모달입니다.',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('모달 닫기'),
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#0f172a'
        }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '다크 테마가 적용된 설정 모달입니다.',
      },
    },
  },
};
