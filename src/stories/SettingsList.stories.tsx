import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SettingsList from '../components/common/SettingsList.tsx';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta = {
  title: 'Common/SettingsList',
  component: SettingsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '설정 메뉴를 표시하고 관리하는 컴포넌트입니다. 각 설정 항목은 클릭하여 옵션을 선택할 수 있습니다.',
      },
    },
  },
  argTypes: {
    items: {
      description: '설정 항목들의 배열',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px 20px 100px 20px',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof SettingsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: '알림 설정',
        value: '켜짐',
        options: ['켜짐', '꺼짐'],
      },
      {
        title: '테마 설정',
        value: '라이트',
        options: ['라이트', '다크'],
        onChange: (value: string) => console.log('테마 변경:', value),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 설정 목록입니다. 알림 설정과 테마 설정을 포함합니다.',
      },
    },
  },
};

export const WithCustomSettings: Story = {
  args: {
    items: [
      {
        title: '알림 설정',
        value: '꺼짐',
        options: ['켜짐', '꺼짐'],
      },
      {
        title: '테마 설정',
        value: '다크',
        options: ['라이트', '다크'],
        onChange: (value: string) => console.log('테마 변경:', value),
      },
      {
        title: '자동 저장',
        value: '활성화',
        options: ['활성화', '비활성화'],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '추가 설정 항목이 포함된 설정 목록입니다.',
      },
    },
  },
};
