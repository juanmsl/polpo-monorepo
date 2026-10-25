# InputNumber

Polpo v0.1.33 - generated from the source code, do not edit.

## InputNumber

Numeric input with min/max, custom formatting and decimal separator. Use `InputNumber.Controller` in forms.

```ts
import { InputNumber } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `pattern` | `string` |  |
| `min` | `number` |  |
| `max` | `number` |  |
| `format` | `FormatConfig \| FormatFunction` | `{ locales: 'en-US', style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, }` |
| `decimalSeparator` | `string` |  |
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
| `value` **(required)** | `number` |  |
| `setValue` **(required)** | `(value: number) => void` |  |
| `invalid` | `boolean` | `false` |
| `isTouched` | `boolean` | `false` |
| `isDirty` | `boolean` | `false` |
| `error` | `string` |  |

### InputNumber.Controller

Same props as `InputNumber`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `number` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
