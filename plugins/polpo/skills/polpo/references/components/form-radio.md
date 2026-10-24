# Radio

Polpo v0.1.32 - generated from the source code, do not edit.

## Radio

Radio button; radios sharing the same `name` form a group whose value is the selected `radioValue`. Use `Radio.Controller` in forms.

```ts
import { Radio } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` |  |
| `radioValue` **(required)** | `string` |  |
| `placeholder` | `undefined` |  |
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
| `value` **(required)** | `string` |  |
| `setValue` **(required)** | `(value: string) => void` |  |
| `invalid` | `boolean` |  |
| `isTouched` | `boolean` |  |
| `isDirty` | `boolean` |  |
| `error` | `string` |  |

### Radio.Controller

Same props as `Radio`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `string` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
