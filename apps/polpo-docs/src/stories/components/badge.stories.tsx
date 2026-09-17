import { Badge, RadiusTypes, SizeTypes } from 'polpo/components';
import { Flex } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    selected: { control: 'boolean' },
    children: { control: 'text' },
    size: { control: 'inline-radio', options: Object.values(SizeTypes) },
    radius: { control: 'inline-radio', options: Object.values(RadiusTypes) },
  },
  args: {
    children: 'Tag',
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Single: Story = {
  args: {},
};

export const Many: Story = {
  args: {},
  decorators: [
    (Story, { args }) => (
      <Flex wrap='wrap' gap='1em'>
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
        <Story {...args} />
      </Flex>
    ),
  ],
};
