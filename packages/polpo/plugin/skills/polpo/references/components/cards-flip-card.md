# FlipCard

Polpo v0.2.0 - generated from the source code, do not edit.

## FlipCard

Card that flips between exactly two children (front and back) when `isFlipped` changes.

```ts
import { FlipCard } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `cardZIndex` | `CSSProperties['zIndex']` | `'auto'` |
| `isFlipped` | `boolean` | `false` |
| `flipSpeed` | `number` | `500` |
| `flipDirection` | `'horizontal' \| 'vertical'` | `'vertical'` |
| `children` **(required)** | `[ReactNode, ReactNode]` |  |

## Examples

### Storybook: Components/Cards/FlipCard

Live demo: https://ui.juanmsl.com/?path=/story/components-cards-flipcard--default

```tsx
import { Typography, FlipCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Default usage (`args`):

```tsx
<FlipCard flipDirection='vertical' flipSpeed={500} isFlipped={false} />
```
