# Switch

Polpo v0.1.33 - generated from the source code, do not edit.

## Switch

Boolean toggle switch with optional side labels/icons, theme color and size. Use `Switch.Controller` in forms.

```ts
import { Switch } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `leftLabel` | `string` |  |
| `rightLabel` | `string` |  |
| `label` | `string` |  |
| `dotHoverSize` | `number` | `1.3` |
| `padding` | `number` | `0.25` |
| `leftIcon` | `IconType` |  |
| `rightIcon` | `IconType` |  |
| `internalLeftIcon` | `IconType` |  |
| `internalRightIcon` | `IconType` |  |
| `leftIconTooltip` | `string` |  |
| `rightIconTooltip` | `string` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` |  |
| `size` | `'small' \| 'large' \| 'regular'` | `SizeTypes.REGULAR` |
| `width` | `'small' \| 'large' \| 'regular'` | `SizeTypes.REGULAR` |
| `name` **(required)** | `string` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `autoComplete` | `string` | `'off'` |
| `autoFocus` | `boolean` | `false` |
| `placeholder` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `readOnly` | `boolean` | `false` |
| `onBlur` | `(e: FocusEvent<unknown, Element>) => void` |  |
| `onFocus` | `(e: FocusEvent<unknown, Element>) => void` |  |
| `value` **(required)** | `boolean` |  |
| `setValue` **(required)** | `(value: boolean) => void` |  |
| `invalid` | `boolean` |  |
| `isTouched` | `boolean` |  |
| `isDirty` | `boolean` |  |
| `error` | `string` |  |

### Switch.Controller

Same props as `Switch`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `boolean` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
