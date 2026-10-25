# Ripple

Polpo v0.2.0 - generated from the source code, do not edit.

## Ripple

Material-like ripple effect on click. Place it as the last child of the clickable element.

```ts
import { Ripple } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `color` | `string` |  |
| `disabled` | `boolean` |  |
| `duration` | `number` | `1000` |
| `timingFunction` | `React.CSSProperties['animationTimingFunction']` | `'ease-out'` |
| `times` | `number` | `1` |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `zIndex` | `React.CSSProperties['zIndex']` | `1` |

## Examples

### Storybook: Components/Ripple

Live demo: https://ui.juanmsl.com/?path=/story/components-ripple--default

```tsx
import { Ripple } from 'polpo/components';
```

Default usage (`args`):

```tsx
<Ripple color='#FFFFFF' />
```
