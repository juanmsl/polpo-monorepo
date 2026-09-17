import { Typography, HoverCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof HoverCard> = {
  title: 'Cards/HoverCard',
  component: HoverCard,
  argTypes: {
    className: { control: false },
    width: { control: 'inline-radio', options: ['fit-content', '100%'] },
    translationZ: { control: { type: 'range', min: 1, max: 60 } },
    threshold: { control: { type: 'range', min: 1, max: 60 } },
    children: { control: false },
  },
  render: ({ children, ...args }) => (
    <HoverCard {...args}>
      <Grid
        pc='center'
        style={{
          background: 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
          width: '300px',
          height: '300px',
          borderRadius: '10px',
        }}
      >
        <Typography variant='header4'>{children}</Typography>
      </Grid>
    </HoverCard>
  ),
  args: {
    children: 'Hover me',
    threshold: 5,
    translationZ: 25,
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {},
};
