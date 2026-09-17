import { Button, Tabs, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs> = {
  title: 'Tabs/Custom Tabs',
  component: Tabs,
  argTypes: {},
  args: {},
  render: (args => {
    const [selected, setSelected] = useState('');

    const getButtonVariant = (id: string) => {
      return selected === id ? 'solid' : 'outlined';
    };

    return (
      <Tabs {...args} defaultOpenTab='tab-1' onChange={setSelected}>
        <Grid flow='column' gap='1em' ai='center'>
          <Tabs.Tab id='tab-1'>
            <Button color='primary' variant={getButtonVariant('tab-1')}>
              Tab 1
            </Button>
          </Tabs.Tab>
          <Tabs.Tab id='tab-2'>
            <Button color='primary' variant={getButtonVariant('tab-2')}>
              Tab 2
            </Button>
          </Tabs.Tab>
          <Tabs.Tab id='tab-3'>
            <Button color='primary' variant={getButtonVariant('tab-3')}>
              Tab 3
            </Button>
          </Tabs.Tab>
        </Grid>

        <Tabs.TabPanel id='tab-1'>
          <Typography variant='header4' align='center'>
            Tab 1 content
          </Typography>
        </Tabs.TabPanel>
        <Tabs.TabPanel id='tab-2'>
          <Typography variant='header4' align='center'>
            Tab 2 content
          </Typography>
        </Tabs.TabPanel>
        <Tabs.TabPanel id='tab-3'>
          <Typography variant='header4' align='center'>
            Tab 3 content
          </Typography>
        </Tabs.TabPanel>
      </Tabs>
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }) satisfies typeof Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {},
};
