import { Typography, SlideCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SlideCard> = {
  title: 'Cards/SlideCard',
  component: SlideCard,
  argTypes: {
    children: { control: false },
    className: { control: false },
    style: { control: false },
    isOpen: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <Grid gap='1em' style={{ width: '500px' }}>
        <section>
          <Typography variant='header4'>Slide Card</Typography>
          <Typography variant='label'>Toggle the card on the controls</Typography>
        </section>
        <Story />
      </Grid>
    ),
  ],
  args: {
    isOpen: true,
    children: (
      <section style={{ border: '1px solid', padding: '1em', borderRadius: '1em' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </section>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof SlideCard>;

export const Default: Story = {
  args: {},
};
