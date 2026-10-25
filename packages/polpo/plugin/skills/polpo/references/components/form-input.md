# Input

Polpo v0.2.0 - generated from the source code, do not edit.

## Input

Text input (`text`, `email`, `search`, `url`) inside a `Field`. Use `Input.Controller` in forms.

```ts
import { Input } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `pattern` | `string` |  |
| `type` | `'text' \| 'email' \| 'search' \| 'url'` | `'text'` |
| `min` | `number` |  |
| `max` | `number` |  |
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

### Input.Controller

Same props as `Input`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `string` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
