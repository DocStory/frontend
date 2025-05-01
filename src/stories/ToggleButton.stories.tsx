import { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '../components/common/ToggleButton';
import { useState } from 'react';

const meta: Meta<typeof ToggleButton> = {
  title: 'Common/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

const options = [
  { label: '보기 가능', value: 'view' },
  { label: '편집 가능', value: 'edit' },
];

const Template = (args: any) => {
  const [value, setValue] = useState(args.currentValue);
  return (
    <ToggleButton
      {...args}
      currentValue={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const View: Story = {
  render: Template,
  args: {
    currentValue: 'view',
    options,
    onDelete: () => console.log('Delete clicked'),
  },
};

export const Edit: Story = {
  render: Template,
  args: {
    currentValue: 'edit',
    options,
    onDelete: () => console.log('Delete clicked'),
  },
};

export const WithoutDelete: Story = {
  render: Template,
  args: {
    currentValue: 'view',
    options,
  },
};
