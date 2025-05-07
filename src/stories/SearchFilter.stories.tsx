import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchFilter from '../components/common/SearchFilter';

const meta: Meta<typeof SearchFilter> = {
  title: 'Common/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const SearchFilterWithState = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const items = [
    { id: '1', name: '대본.pdf' },
    { id: '2', name: '대본수정본.pptx' },
    { id: '3', name: '대본수정본_최종.pptx' },
    { id: '4', name: '대본수정본_최종_진짜최종.pptx' },
    { id: '5', name: '대본수정본_최종_진짜최종_마지막.pptx' },
  ];

  return (
    <SearchFilter
      items={items}
      selectedItems={selectedItems}
      onItemSelect={handleItemSelect}
      onItemsChange={setSelectedItems}
    />
  );
};

type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  render: () => <SearchFilterWithState />,
};
