import { ColorTypes, Typography, TypographyVariant, TypographyWeight } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  argTypes: {
    variant: { control: 'inline-radio', options: Object.values(TypographyVariant) },
    weight: { control: 'inline-radio', options: Object.values(TypographyWeight) },
    color: { control: 'inline-radio', options: [...Object.values(ColorTypes), undefined] },
    nowrap: { control: 'boolean' },
    recommendedWidth: { control: 'boolean' },
    as: { control: false },
    children: { control: 'text' },
    noPadding: { control: 'boolean' },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    family: { control: 'inline-radio', options: ['primary', 'code'] },
    className: { control: false },
    style: { control: false },
    htmlFor: { control: false },
  },
  args: {
    children: 'Hello world',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <Grid gap={16} gtc='500px'>
        <Story />
        <Typography>
          Sample text to compare, lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cumque dolores
          doloribus, eaque earum eligendi est excepturi explicabo inventore, perferendis, quisquam recusandae ullam
          voluptatum. Dolores?
        </Typography>
      </Grid>
    ),
  ],
};

export const Paragraph: Story = {
  args: {
    weight: 'light',
  },
  argTypes: {
    children: { control: false },
    variant: { control: false },
  },
  decorators: [],
  render: args => (
    <Grid gtc='500px'>
      <Typography {...args} variant='body'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at deserunt, dolorum eum necessitatibus, nihil
        nobis placeat qui quidem repellat, temporibus totam voluptates. Accusamus amet aspernatur atque dolorum eligendi
        est fugiat, illum labore, nam nobis obcaecati perferendis quod recusandae sed?
      </Typography>
    </Grid>
  ),
};

export const Variants: Story = {
  args: {
    weight: 'light',
  },
  argTypes: {
    children: { control: false },
    variant: { control: false },
  },
  decorators: [],
  render: args => (
    <Grid>
      <Typography {...args} variant='hero'>
        Hero
      </Typography>
      <Typography {...args} variant='header1'>
        Header1
      </Typography>
      <Typography {...args} variant='header2'>
        Header2
      </Typography>
      <Typography {...args} variant='header3'>
        Header3
      </Typography>
      <Typography {...args} variant='header4'>
        Header4
      </Typography>
      <Typography {...args} variant='body'>
        Body
      </Typography>
      <Typography {...args} variant='label'>
        Label
      </Typography>
      <Typography {...args} variant='small'>
        Small
      </Typography>
    </Grid>
  ),
};
