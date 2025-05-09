import type { Meta, StoryObj } from '@storybook/react';
import ModalHeader from '../components/common/ModalHeader';

const meta: Meta<typeof ModalHeader> = {
  title: 'Modal/ModalHeader',
  component: ModalHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

const CenteredWrapper = (props: { children: React.ReactNode }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F1F5F9',
    }}
  >
    {props.children}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <CenteredWrapper>
      <div style={{ width: '400px' }}>
        <ModalHeader {...args} />
      </div>
    </CenteredWrapper>
  ),
  args: {
    title: 'History',
    onClose: () => {},
    backgroundColor: '#f1f5f9',
  },
};

export const Proposal: Story = {
  render: (args) => (
    <CenteredWrapper>
      <div style={{ width: '400px' }}>
        <ModalHeader {...args} />
      </div>
    </CenteredWrapper>
  ),
  args: {
    title: 'Proposal',
    onClose: () => {},
    backgroundColor: '#f1f5f9',
  },
};