# InfinityScroll

Polpo v0.1.33 - generated from the source code, do not edit.

## InfinityScroll

Renders `children` and calls `loadMore` when the end of the list enters the viewport while `hasNextPage` is true.

```ts
import { InfinityScroll } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `isLoading` **(required)** | `boolean` | `false` |
| `hasNextPage` **(required)** | `boolean` | `false` |
| `loadMore` **(required)** | `() => void` |  |
| `customLoadMoreElement` | `(ref: RefObject<HTMLElement \| null>) => ReactNode` |  |
| `emptyMessage` | `string` |  |
| `children` | `ReactNode` |  |

Also accepts the native attributes of `HTMLAttributes`.

## Examples

### Storybook: Components/InfinityScroll

Live demo: https://ui.juanmsl.com/?path=/story/components-infinityscroll--default

```tsx
import { Typography, InfinityScroll } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useCallback, useState } from 'react';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Grid style={{ height: '300px', width: '300px', overflow: 'auto', border: '1px solid' }}>
        <Story />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<InfinityScroll />
```

**Default** (args: `{}`)

```tsx
(args => {
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
  }) satisfies typeof InfinityScroll
```

**Empty** (args: `{ emptyMessage: 'No data', }`)

```tsx
(args => {
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
  }) satisfies typeof InfinityScroll
```
