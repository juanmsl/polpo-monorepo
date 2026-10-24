# SlideCard

Polpo v0.1.32 - generated from the source code, do not edit.

## SlideCard

Container that expands/collapses its height with an animation, controlled by `isOpen`.

```ts
import { SlideCard } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `isOpen` **(required)** | `boolean` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |

## Examples

### Storybook: Components/Cards/SlideCard

Live demo: https://ui.juanmsl.com/?path=/story/components-cards-slidecard--default

```tsx
import { Typography, SlideCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Grid gap='1em' style={{ width: '500px' }}>
        <section>
          <Typography variant='header4'>Slide Card</Typography>
          <Typography variant='label'>Toggle the card on the controls</Typography>
        </section>
        <Story />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<SlideCard isOpen>{(
      <section style={{ border: '1px solid', padding: '1em', borderRadius: '1em' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </section>
    )}</SlideCard>
```
