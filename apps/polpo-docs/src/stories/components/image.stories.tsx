import { Image } from 'polpo/components';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Image> = {
  title: 'Image',
  component: Image,
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
    loading: { control: 'select', options: ['eager', 'lazy'] },
  },
  args: {
    src: 'https://t4.ftcdn.net/jpg/07/28/89/61/360_F_728896171_M2pPUCPkTyFiSYWhDsJI5A45TsI6B5Gk.jpg',
    alt: 'Image',
    loading: 'eager',
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {},
};
