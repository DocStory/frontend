import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MemberList from '../components/common/MemberList';

const meta: Meta<typeof MemberList> = {
  title: 'Common/MemberList',
  component: MemberList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MemberList>;

const Template: Story = {
  render: (args) => <MemberList {...args} />,
};

export const HostList: Story = {
  ...Template,
  args: {
    members: [
      {
        id: '1',
        name: '홍길동',
        email: 'hong@example.com',
        role: 'admin',
      },
      {
        id: '2',
        name: '김철수',
        email: 'kim@example.com',
        role: 'admin',
      },
      {
        id: '3',
        name: '이영희',
        email: 'lee@example.com',
        role: 'admin',
      },
    ],
    onRoleChange: (id, role) =>
      console.log(`Role changed for ${id} to ${role}`),
    onDelete: (id) => console.log(`Delete member ${id}`),
  },
};

export const ToggleList: Story = {
  ...Template,
  args: {
    members: [
      {
        id: '1',
        name: '홍길동',
        email: 'hong@example.com',
        role: 'reviewer',
      },
      {
        id: '2',
        name: '김철수',
        email: 'kim@example.com',
        role: 'reviewer',
      },
      {
        id: '3',
        name: '이영희',
        email: 'lee@example.com',
        role: 'reviewer',
      },
    ],
    onRoleChange: (id, role) =>
      console.log(`Role changed for ${id} to ${role}`),
    onDelete: (id) => console.log(`Delete member ${id}`),
  },
};
