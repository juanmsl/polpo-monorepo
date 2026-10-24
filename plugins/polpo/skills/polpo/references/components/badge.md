# Badge

Polpo v0.1.32 - generated from the source code, do not edit.

## Badge

Small chip/tag for statuses, labels and counters, with theme colors, sizes, radius and a selected state.

```ts
import { Badge } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` | `ColorTypes.DEFAULT` |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | `RadiusTypes.MEDIUM` |
| `size` | `'small' \| 'large' \| 'regular'` | `SizeTypes.REGULAR` |
| `noWrap` | `boolean` | `false` |
| `ref` | `React.Ref<HTMLElement>` |  |
| `forIcon` | `boolean` | `false` |
| `selected` | `boolean` | `false` |

Also accepts the native attributes of `HTMLAttributes`.

## Examples

### Storybook: Components/Badge

Live demo: https://ui.juanmsl.com/?path=/story/components-badge--single

```tsx
import { Badge, RadiusTypes, SizeTypes } from 'polpo/components';
import { Flex } from 'polpo/layouts';
```

Default usage (`args`):

```tsx
<Badge selected={false}>Tag</Badge>
```
