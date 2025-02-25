import { Meta, StoryObj } from "@storybook/react";
import NewButton from "./newButton";

const meta: Meta<typeof NewButton> = {
  title: "Components/NewButton",
  component: NewButton,
  argTypes: {
    size: { control: "radio", options: ["small", "large"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof NewButton>;

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};