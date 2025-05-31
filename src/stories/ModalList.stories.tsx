import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ModalList from '../components/common/ModalList';
import type { ModalItem } from '../components/common/ModalList';

const meta: Meta<typeof ModalList> = {
  title: 'Common/ModalList',
  component: ModalList,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalList>;

const mockItems: ModalItem[] = [
  {
    Name: 'UI_리팩터링_제안서.pdf',
    date: 'PDF',
    iconType: 'diff',
  },
  {
    Name: '컴포넌트_디자인_가이드.pdf',
    date: 'PDF',
    iconType: 'download',
  },
  {
    Name: '업로드된_파일.docx',
    date: 'Word',
    iconType: 'upload',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    isCreating: false,
    onFileSelect: (files) => console.log('Files selected:', files),
    onFileRemove: (index) => console.log('File removed:', index),
  },
};

export const WithUpload: Story = {
  args: {
    items: mockItems,
    isCreating: true,
    onFileSelect: (files) => console.log('Files selected:', files),
    onFileRemove: (index) => console.log('File removed:', index),
  },
};

export const EmptyList: Story = {
  args: {
    items: [],
    isCreating: false,
    onFileSelect: (files) => console.log('Files selected:', files),
    onFileRemove: (index) => console.log('File removed:', index),
  },
};

export const UploadOnly: Story = {
  args: {
    items: [],
    isCreating: true,
    onFileSelect: (files) => console.log('Files selected:', files),
    onFileRemove: (index) => console.log('File removed:', index),
  },
};

export const DifferentFileTypes: Story = {
  args: {
    items: [
      {
        Name: 'API_성능_분석_보고서.pdf',
        date: 'PDF',
        iconType: 'diff',
      },
      {
        Name: '최적화_결과_비교.xlsx',
        date: 'Excel',
        iconType: 'download',
      },
      {
        Name: '번역_리소스_파일.zip',
        date: 'Archive',
        iconType: 'download',
      },
      {
        Name: '테스트_케이스_문서.docx',
        date: 'Word',
        iconType: 'download',
      },
      {
        Name: '업로드한_이미지.png',
        date: 'Image',
        iconType: 'upload',
      },
    ],
    isCreating: false,
    onFileSelect: (files) => console.log('Files selected:', files),
    onFileRemove: (index) => console.log('File removed:', index),
  },
};
