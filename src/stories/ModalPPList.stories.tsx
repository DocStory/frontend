import type { Meta, StoryObj } from '@storybook/react';
import ModalPPList from '../components/layout/ModalPPList';
import type { PPItem } from '../components/layout/ModalPPList';

const meta: Meta<typeof ModalPPList> = {
  title: 'Layout/ModalPPList',
  component: ModalPPList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalPPList>;

const mockItems: PPItem[] = [
  {
    Name: 'Document1.pdf',
    date: '2025/03/20',
    iconType: 'download',
    status: 'inProgress',
  },
  {
    Name: 'Presentation.pptx',
    date: '2025/03/19',
    iconType: 'download',
    status: 'completed',
  },
  {
    Name: 'Report.docx',
    date: '2025/03/18',
    iconType: 'download',
    status: 'inProgress',
  },
  {
    Name: 'Spreadsheet.xlsx',
    date: '2025/03/17',
    iconType: 'download',
    status: 'completed',
  },
  {
    Name: 'Notes.txt',
    date: '2025/03/16',
    iconType: 'download',
    status: 'inProgress',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleFile: Story = {
  args: {
    items: [mockItems[0]],
  },
};

export const ManyFiles: Story = {
  args: {
    items: [...mockItems, ...mockItems, ...mockItems],
  },
};
