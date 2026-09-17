import { Tooltip } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltips/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: [PositionContainer.TOP, PositionContainer.LEFT, PositionContainer.RIGHT, PositionContainer.BOTTOM],
    },
    offset: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    disabled: { control: 'boolean' },
    content: { control: 'text' },
    children: { control: false },
  },
  args: {
    content: 'Tooltip content',
  },
  render: (args, { children }) => <Tooltip {...args}>{children}</Tooltip>,
  decorators: [
    Story => (
      <Story>
        <span>Hello world</span>
      </Story>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {},
};
