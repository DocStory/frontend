import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '../components/common/ModalList.tsx';

const meta: Meta<typeof ModalList> = {
  title: 'Modal/ModalList',
  component: ModalList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalList>;

const Template: Story = {
  render: (args) => <ModalList {...args} />,
};

export const DownloadList: Story = {
  ...Template,
  args: {
    items: [
      {
        Name: '문서1.pdf',
        date: '2024-03-20',
        iconType: 'download',
      },
      {
        Name: '문서2.pdf',
        date: '2024-03-19',
        iconType: 'download',
      },
      {
        Name: '문서3.pdf',
        date: '2024-03-18',
        iconType: 'download',
      },
    ],
  },
};

export const UploadList: Story = {
  ...Template,
  args: {
    items: [
      {
        Name: '문서1.pdf',
        date: '2024-03-20',
        iconType: 'upload',
      },
      {
        Name: '문서2.pdf',
        date: '2024-03-19',
        iconType: 'upload',
      },
      {
        Name: '문서3.pdf',
        date: '2024-03-18',
        iconType: 'upload',
      },
    ],
  },
};

export const DiffList: Story = {
  ...Template,
  args: {
    items: [
      {
        Name: '문서1.pdf',
        date: '2024-03-20',
        iconType: 'diff',
      },
      {
        Name: '문서2.pdf',
        date: '2024-03-19',
        iconType: 'diff',
      },
      {
        Name: '문서3.pdf',
        date: '2024-03-18',
        iconType: 'diff',
      },
    ],
  },
};
