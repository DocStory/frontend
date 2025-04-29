// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RepositoryCard from '../components/common/RepositoryCard';

const meta: Meta<typeof RepositoryCard> = {
  title: 'Common/RepositoryCard',
  component: RepositoryCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RepositoryCard>;

export const Hwp: Story = {
  args: {
    fileTypes: ['hwp'],
    title: '한글 문서 저장소',
    description: '2024년 6월 최신 한글 문서',
  },
};

export const Docx: Story = {
  args: {
    fileTypes: ['docx'],
    title: '워드 문서 저장소',
    description: '업무용 DOCX 파일 모음',
  },
};

export const Pdf: Story = {
  args: {
    fileTypes: ['pdf'],
    title: 'PDF 자료실',
    description: '스캔본 PDF 파일',
  },
};

export const MultiTypes: Story = {
  args: {
    fileTypes: ['pdf', 'docx', 'hwp'],
    title: '다중 확장자 저장소',
    description: '여러 파일 형식이 있는 저장소',
  },
}; 