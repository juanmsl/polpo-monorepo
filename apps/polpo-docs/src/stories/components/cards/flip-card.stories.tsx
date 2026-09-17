import { Typography, FlipCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FlipCard> = {
  title: 'Cards/FlipCard',
  component: FlipCard,
  argTypes: {
    cardZIndex: { control: false },
    flipDirection: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    flipSpeed: {
      control: { type: 'range', step: 25, min: 0, max: 2000 },
    },
    isFlipped: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    flipDirection: 'vertical',
    flipSpeed: 500,
    isFlipped: false,
  },
  render: args => (
    <FlipCard {...args}>
      <Grid
        pc='center'
        style={{
          background: 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
          width: '300px',
          height: '300px',
          borderRadius: '10px',
        }}
      >
        <Typography variant='hero'>A</Typography>
      </Grid>
      <Grid
        pc='center'
        style={{
          background: 'linear-gradient(90deg, rgba(230,96,255,1) 0%, rgba(91,170,255,1) 100%)',
          width: '300px',
          height: '300px',
          borderRadius: '10px',
        }}
      >
        <Typography variant='hero'>B</Typography>
      </Grid>
    </FlipCard>
  ),
};

export default meta;
type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {
  args: {},
};
