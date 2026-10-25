# Checkbox

Polpo v0.1.33 - generated from the source code, do not edit.

## Checkbox

Boolean checkbox with label, theme color and size. Use `Checkbox.Controller` inside a react-hook-form `FormProvider`.

```ts
import { Checkbox } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `ReactNode` |  |
| `placeholder` | `undefined` |  |
| `icon` | `IconType` | `IoCheckmarkOutline` |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` | `ColorTypes.PRIMARY` |
| `size` | `'small' \| 'large' \| 'regular'` | `SizeTypes.REGULAR` |
| `name` **(required)** | `string` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `autoComplete` | `string` | `'off'` |
| `autoFocus` | `boolean` | `false` |
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

### Checkbox.Controller

Same props as `Checkbox`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `boolean` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
