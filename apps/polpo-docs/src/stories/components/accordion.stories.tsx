import { Typography, Accordion, AccordionItem } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import { CustomContent as AccordionItemStories } from './accordion-item.stories';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
  title: 'Accordion/Accordion',
  component: Accordion,
  argTypes: {
    children: { control: false },
    className: { control: false },
    noSeparators: { control: 'boolean' },
    style: { control: false },
  },
  args: {
    noSeparators: false,
  },
  decorators: [
    Story => (
      <Grid style={{ width: '500px' }}>
        <Story />
      </Grid>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    children: Array.from(new Array(10)).map((_, key) => (
      <AccordionItem {...AccordionItemStories.args} key={key}>
        <Typography variant='header4'>Title {key + 1}</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </AccordionItem>
    )),
  },
};

export const FAQ: Story = {
  args: {
    noSeparators: true,
    style: {
      gap: '1em',
    },
    children: Array.from(new Array(10)).map((_, key) => (
      <AccordionItem
        key={key}
        title={`Is there a question #${key + 1}?`}
        style={{
          border: '1px solid',
          borderRadius: '1em',
          overflow: 'hidden',
          padding: '0 1em',
        }}
      >
        <Typography noPadding>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </AccordionItem>
    )),
  },
};
