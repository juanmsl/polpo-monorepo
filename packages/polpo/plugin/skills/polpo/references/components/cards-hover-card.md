# HoverCard

Polpo v0.1.33 - generated from the source code, do not edit.

## HoverCard

Wrapper that tilts its content in 3D following the mouse position.

```ts
import { HoverCard } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `threshold` | `number` | `5` |
| `translationZ` | `number` | `25` |
| `width` | `'fit-content' \| '100%'` | `'fit-content'` |
| `className` | `string` | `''` |

## Examples

### Storybook: Components/Cards/HoverCard

Live demo: https://ui.juanmsl.com/?path=/story/components-cards-hovercard--default

```tsx
import { Typography, HoverCard } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Default usage (`args`):

```tsx
<HoverCard threshold={5} translationZ={25}>Hover me</HoverCard>
```
