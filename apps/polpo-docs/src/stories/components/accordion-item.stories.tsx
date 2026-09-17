import { Line, Typography, Accordion, AccordionItem } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { PiAirplaneInFlight } from 'react-icons/pi';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AccordionItem> = {
  title: 'Accordion/AccordionItem',
  component: AccordionItem,
  argTypes: {
    children: { control: false },
    className: { control: false },
    classNames: { control: false },
    style: { control: false },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    startContent: { control: false },
    endContent: { control: false },
    content: { control: false },
  },
  args: {},
  render: args => (
    <Accordion>
      <AccordionItem {...args}>
        <Typography variant='header4'>Title</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </AccordionItem>
    </Accordion>
  ),
  decorators: [
    Story => (
      <Grid style={{ width: '500px' }}>
        <Story />
      </Grid>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Default: Story = {
  args: {
    title: 'Accordion Item',
    subtitle: 'Default with Title and Subtitle',
  },
};

export const LeftContent: Story = {
  args: {
    title: 'Accordion Item',
    subtitle: 'Custom left content',
    startContent: isOpen => (
      <Grid
        pc='center'
        style={{
          borderRadius: '8px',
          color: `${isOpen ? 'tomato' : 'currentColor'}`,
          border: '1px solid',
          filter: `grayscale(${isOpen ? 0 : 1})`,
          width: '40px',
          height: '40px',
        }}
      >
        <PiAirplaneInFlight />
      </Grid>
    ),
  },
};

export const CustomContent: Story = {
  argTypes: {
    title: { control: false },
    subtitle: { control: false },
  },
  args: {
    content: isOpen => (
      <Grid flow='column' gap='1em' ai='center' gtc='auto 1fr auto'>
        <section>
          <Typography variant='body' weight='bold' noPadding style={{ color: `${isOpen ? 'tomato' : 'currentColor'}` }}>
            Accordion item
          </Typography>
          <Typography variant='small'>Custom content</Typography>
        </section>
        <Line />
        <Grid
          pc='center'
          style={{
            borderRadius: '8px',
            color: `${isOpen ? 'tomato' : 'currentColor'}`,
            border: '1px solid',
            filter: `grayscale(${isOpen ? 0 : 1})`,
            width: '40px',
            height: '40px',
          }}
        >
          {isOpen ? <FaRegEye /> : <FaRegEyeSlash />}
        </Grid>
      </Grid>
    ),
  },
};

export const RightContent: Story = {
  args: {
    title: 'Item',
    subtitle: 'Subtitle',
    endContent: isOpen => (
      <section>
        <Typography variant='small'>{isOpen ? 'Close' : 'Open'}</Typography>
      </section>
    ),
  },
};
