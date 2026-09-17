import { Ripple } from 'polpo/components';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Ripple> = {
  title: 'Ripple',
  component: Ripple,
  argTypes: {
    color: { control: 'color' },
    duration: { control: { type: 'range', min: 500, max: 5000, step: 100 } },
    timingFunction: { options: ['ease', 'ease-out', 'ease-in', 'ease-in-out', 'cubic-bezier(0.81, -0.52, 0.42, 2.5)'] },
    times: { control: { type: 'range', min: 1, max: 5 } },
    className: { control: false },
    style: { control: false },
  },
  args: {
    color: '#FFFFFF',
  },
  render: args => (
    <section
      style={{
        background: 'linear-gradient(35deg, rgba(230,96,255,1) 0%, rgba(91,170,255,1) 100%)',
        width: '300px',
        height: '300px',
        borderRadius: '10px',
      }}
    >
      <Ripple {...args} />
    </section>
  ),
};

export default meta;
type Story = StoryObj<typeof Ripple>;

export const Default: Story = {
  args: {},
};
