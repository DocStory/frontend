import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TeamInviteModal from '../components/layout/TeamInviteModal';

const meta: Meta<typeof TeamInviteModal> = {
  title: 'Layout/TeamInviteModal',
  component: TeamInviteModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8F8F8' },
        { name: 'dark', value: '#1F2937' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamInviteModal>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [invitedMembers, setInvitedMembers] = React.useState([
    {
      Name: '홍길동',
      date: 'Marvin McKinney@gmail.com',
      role: {
        currentValue: '호스트',
        options: [
          { label: '호스트', value: 'host' },
          { label: '편집하기', value: 'edit' },
        ],
        onChange: (value: string) => console.log('Role changed:', value),
        onDelete: () => console.log('Delete'),
      },
    },
    {
      Name: '홍길동',
      date: 'Marvin McKinney@gmail.com',
      role: {
        currentValue: '편집하기',
        options: [
          { label: '호스트', value: 'host' },
          { label: '편집하기', value: 'edit' },
        ],
        onChange: (value: string) => console.log('Role changed:', value),
        onDelete: () => console.log('Delete'),
      },
    },
  ]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TeamInviteModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onInvite={(email) => {
          console.log('Invite:', email);
          setInvitedMembers([
            ...invitedMembers,
            {
              Name: email.split('@')[0],
              date: email,
              role: {
                currentValue: '편집하기',
                options: [
                  { label: '호스트', value: 'host' },
                  { label: '편집하기', value: 'edit' },
                ],
                onChange: (value: string) =>
                  console.log('Role changed:', value),
                onDelete: () => console.log('Delete'),
              },
            },
          ]);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    isOpen: true,
  },
};
