// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RepositoryCard from '../components/common/RepositoryCard';

const meta = {
  title: 'Components/RepositoryCard',
  component: RepositoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '프로젝트 문서',
    description: '프로젝트 관련 문서들이 있는 저장소입니다.',
    fileTypes: ['pdf', 'hwp'],
    isFavorite: false,
  },
};

export const WithFavorite: Story = {
  args: {
    title: '즐겨찾기된 저장소',
    description: '즐겨찾기 상태의 저장소입니다.',
    fileTypes: ['pdf', 'hwp'],
    isFavorite: true,
  },
};

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