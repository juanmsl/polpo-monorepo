# Textarea

Polpo v0.1.33 - generated from the source code, do not edit.

## Textarea

Multi-line text input inside a `Field`. Use `Textarea.Controller` in forms.

```ts
import { Textarea } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `rows` | `number` | `4` |
| `resize` | `React.CSSProperties['resize']` | `'vertical'` |
| `leftIcon` | `undefined` |  |
| `rightIcon` | `undefined` |  |
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

### Textarea.Controller

Same props as `Textarea`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `string` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
