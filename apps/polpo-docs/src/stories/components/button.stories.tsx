import { Button, ColorTypes, RadiusTypes, SizeTypes, VariantTypes } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    className: { control: false },
    color: {
      control: 'inline-radio',
      options: Object.values(ColorTypes),
    },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onClick: { control: false },
    size: { control: 'inline-radio', options: Object.values(SizeTypes) },
    style: { control: false },
    radius: { control: 'inline-radio', options: Object.values(RadiusTypes) },
    type: { control: false, options: ['button', 'submit', 'reset'] },
    variant: { control: 'inline-radio', options: Object.values(VariantTypes) },
  },
  args: {
    fullWidth: true,
    size: SizeTypes.REGULAR,
    radius: RadiusTypes.MEDIUM,
    color: ColorTypes.PRIMARY,
    variant: VariantTypes.SOLID,
    children: 'Button',
    disabled: false,
    isLoading: false,
  },
  decorators: [
    Story => (
      <Grid ji='center' gtc='300px'>
        <Story />
      </Grid>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

export const Variants: Story = {
  argTypes: {
    variant: { control: false },
    children: { control: false },
  },
  render: args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(VariantTypes).map(variant => (
        <Button {...args} variant={variant} key={variant}>
          {variant}
        </Button>
      ))}
    </Grid>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: { control: false },
    children: { control: false },
  },
  render: args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(SizeTypes).map(size => (
        <Button {...args} size={size} key={size}>
          {size}
        </Button>
      ))}
    </Grid>
  ),
};

export const Colors: Story = {
  argTypes: {
    color: { control: false },
    children: { control: false },
  },
  render: args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(ColorTypes).map(color => (
        <Button {...args} color={color} key={color}>
          {color}
        </Button>
      ))}
    </Grid>
  ),
};
