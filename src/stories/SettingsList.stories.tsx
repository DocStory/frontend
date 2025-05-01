import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SettingsList from '../components/common/SettingsList.tsx';

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
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px 20px 100px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsList>;

export default meta;

type Story = StoryObj<typeof SettingsList>;

export const Default: Story = {
  args: {
    items: [
      {
        title: '알림 설정',
        value: '켜짐',
        options: ['켜짐', '꺼짐'],
      },
      {
        title: '다크 모드',
        value: '꺼짐',
        options: ['켜짐', '꺼짐'],
      },
      {
        title: '언어',
        value: '한국어',
        options: ['한국어', 'English', '日本語'],
      },
    ],
  },
};
