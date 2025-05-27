import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '../components/common/SideBar';

const meta: Meta<typeof SideBar> = {
  title: 'Layout/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeMenu: {
      control: 'select',
      options: ['홈', '저장소', '도움말', '설정'],
      description: '현재 활성화된 메뉴',
    },
    userName: {
      control: 'text',
      description: '사용자 이름',
    },
    onMenuClick: {
      action: 'menuClicked',
      description: '메뉴 클릭 핸들러 (설정 클릭 시 모달 열림)',
    },
    onUserNameChange: {
      action: 'userNameChanged',
      description: '사용자 이름 변경 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    activeMenu: '홈',
    userName: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바 상태입니다. 하단의 사용자 프로필을 클릭하면 개인정보 모달이, 설정 메뉴를 클릭하면 설정 모달이 열립니다.',
      },
    },
  },
};

export const RepositoryActive: Story = {
  args: {
    activeMenu: '저장소',
    userName: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '저장소 메뉴가 활성화된 상태의 사이드바입니다.',
      },
    },
  },
};

export const SettingsActive: Story = {
  args: {
    activeMenu: '설정',
    userName: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '설정 메뉴가 활성화된 상태의 사이드바입니다. 설정 메뉴를 클릭하면 설정 모달이 열립니다.',
      },
    },
  },
};

export const WithDifferentUser: Story = {
  args: {
    activeMenu: '홈',
    userName: '김철수',
  },
  parameters: {
    docs: {
      description: {
        story: '다른 사용자 이름으로 표시된 사이드바입니다. 프로필 영역을 클릭하면 사용자 정보 모달이 표시됩니다.',
      },
    },
  },
}; 