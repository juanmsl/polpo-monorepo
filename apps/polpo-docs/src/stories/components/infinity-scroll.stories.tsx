import { Typography, InfinityScroll } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InfinityScroll> = {
  title: 'InfinityScroll',
  component: InfinityScroll,
  argTypes: {
    isLoading: { control: 'boolean' },
    hasNextPage: { control: 'boolean' },
    loadMore: { control: false },
    customLoadMoreElement: { control: false },
    emptyMessage: { control: 'text' },
    children: { control: 'text' },
  },
  decorators: [
    Story => (
      <Grid style={{ height: '300px', width: '300px', overflow: 'auto', border: '1px solid' }}>
        <Story />
      </Grid>
    ),
  ],
  render: (args => {
    const [data, setData] = useState<Array<string>>([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = useCallback(() => {
      if (!hasNextPage) return;

      setIsLoading(true);
      setTimeout(() => {
        setData([...data, ...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']]);
        setHasNextPage(data.length < 100);
        setIsLoading(false);
      }, 1000);
    }, [data, hasNextPage]);

    return (
      <Grid gap='10px' style={{ padding: '10px' }}>
        <InfinityScroll {...args} hasNextPage={hasNextPage} isLoading={isLoading} loadMore={loadMore}>
          {data.map((v: string, key: number) => (
            <section key={key} style={{ padding: '10px', background: '#55882233' }}>
              <Typography variant='label' weight='bold' align='center' as='p'>
                {v}
              </Typography>
            </section>
          ))}
        </InfinityScroll>
      </Grid>
    );
  }) satisfies typeof InfinityScroll,
};

export default meta;
type Story = StoryObj<typeof InfinityScroll>;

export const Default: Story = {
  args: {},
  render: (args => {
    const [data, setData] = useState<Array<string>>([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = useCallback(() => {
      if (!hasNextPage) return;

      setIsLoading(true);
      setTimeout(() => {
        setData([...data, ...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']]);
        setHasNextPage(data.length < 100);
        setIsLoading(false);
      }, 1000);
    }, [data, hasNextPage]);

    return (
      <Grid gap='10px' style={{ padding: '10px' }}>
        <InfinityScroll {...args} hasNextPage={hasNextPage} isLoading={isLoading} loadMore={loadMore}>
          {data.map((v: string, key: number) => (
            <section key={key} style={{ padding: '10px', background: '#55882233' }}>
              <Typography variant='label' weight='bold' align='center' as='p'>
                {v}
              </Typography>
            </section>
          ))}
        </InfinityScroll>
      </Grid>
    );
  }) satisfies typeof InfinityScroll,
};

export const Empty: Story = {
  args: {
    emptyMessage: 'No data',
  },
  render: (args => {
    const [data] = useState<Array<string>>([]);

    return (
      <Grid gap='10px' style={{ padding: '10px' }}>
        <InfinityScroll {...args} hasNextPage={false} isLoading={false} loadMore={() => null}>
          {data.map((v: string, key: number) => (
            <section key={key} style={{ padding: '10px', background: '#55882233' }}>
              <Typography variant='label' weight='bold' align='center' as='p'>
                {v}
              </Typography>
            </section>
          ))}
        </InfinityScroll>
      </Grid>
    );
  }) satisfies typeof InfinityScroll,
};
