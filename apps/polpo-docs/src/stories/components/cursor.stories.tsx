import { Cursor, Typography } from 'polpo/components';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Cursor> = {
  title: 'Cursor',
  component: Cursor,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  args: {},
  render: () => (
    <section>
      <Cursor />
      <section>
        <Typography align='center' variant='header4'>
          Hello world
        </Typography>
        <Typography align='center'>
          <a href=''>Link, hover me!</a>
        </Typography>
      </section>
    </section>
  ),
};

export default meta;
type Story = StoryObj<typeof Cursor>;

export const Default: Story = {
  args: {},
};
