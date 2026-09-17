import { Line, LineOrientation, LineStyle, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Line> = {
  title: 'Line',
  component: Line,
  argTypes: {
    orientation: { control: false },
    className: { control: false },
    style: { control: false },
    color: { control: 'color' },
    lineStyle: { control: false },
    size: { control: { type: 'range', min: 1, max: 10 }, if: { arg: 'lineStyle', neq: LineStyle.DOTTED } },
    dashedSize: { control: { type: 'range', min: 1, max: 100 }, if: { arg: 'lineStyle', eq: LineStyle.DASHED } },
    spacing: { control: { type: 'range', min: 1, max: 100 }, if: { arg: 'lineStyle', neq: LineStyle.SOLID } },
  },
  args: {
    color: 'currentColor',
  },
  decorators: [
    (Story, { args }) => (
      <Grid ac='start' gtr='auto 1fr auto auto' gap='0.5em' style={{ width: '300px', height: '300px' }}>
        <Typography variant='small' noPadding>
          Vertical
        </Typography>
        <Story args={{ ...args, orientation: LineOrientation.VERTICAL }} />
        <Typography variant='small' noPadding>
          Horizontal
        </Typography>
        <Story args={{ ...args, orientation: LineOrientation.HORIZONTAL }} />
      </Grid>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Line>;

export const Solid: Story = {
  args: {
    lineStyle: LineStyle.SOLID,
    size: 1,
  },
};

export const Dotted: Story = {
  args: {
    lineStyle: LineStyle.DOTTED,
    size: 2,
    spacing: 5,
  },
};

export const Dashed: Story = {
  args: {
    lineStyle: LineStyle.DASHED,
    size: 2,
    dashedSize: 10,
    spacing: 15,
  },
};
