# DatePicker

Polpo v0.1.33 - generated from the source code, do not edit.

## DatePicker

Native date/time input (`date`, `datetime-local`, `month`, `time`, `week`) inside a `Field`. Value is a string. Use `DatePicker.Controller` in forms.

```ts
import { DatePicker } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `type` | `'date' \| 'datetime-local' \| 'month' \| 'time' \| 'week'` | `'date'` |
| `rightIcon` | `IconType` |  |
| `leftIcon` | `IconType` |  |
| `errorIcon` | `IconType` |  |
| `onClickLeftIcon` | `() => void` |  |
| `onClickRightIcon` | `() => void` |  |
| `label` | `string` |  |
| `variant` | `'full-border' \| 'content-border' \| 'line'` |  |
| `ref` | `RefObject<HTMLElement \| null>` |  |
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
| `value` **(required)** | `string` |  |
| `setValue` **(required)** | `(value: string) => void` |  |
| `invalid` | `boolean` | `false` |
| `isTouched` | `boolean` | `false` |
| `isDirty` | `boolean` | `false` |
| `error` | `string` |  |

### DatePicker.Controller

Same props as `DatePicker`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `string` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
