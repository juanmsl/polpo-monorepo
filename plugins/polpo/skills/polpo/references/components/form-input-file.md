# InputFile

Polpo v0.1.32 - generated from the source code, do not edit.

## InputFile

Drag-and-drop / click-to-upload file input with size limit and `accept` filter. Value is a `{ [fileName]: File }` object. Use `InputFile.Controller` in forms.

```ts
import { InputFile } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` |  |
| `accept` | `string` |  |
| `multiple` | `boolean` | `false` |
| `limitSize` | `number` | `5000000` |
| `errorTimeout` | `number` | `3000` |
| `name` **(required)** | `string` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `autoComplete` | `string` | `'off'` |
| `autoFocus` | `boolean` | `false` |
| `placeholder` | `string` | `'Click to upload or drag and drop'` |
| `disabled` | `boolean` | `false` |
| `readOnly` | `boolean` | `false` |
| `onBlur` | `(e: FocusEvent<unknown, Element>) => void` |  |
| `onFocus` | `(e: FocusEvent<unknown, Element>) => void` |  |
| `value` **(required)** | `InputFileValue` | `{}` |
| `setValue` **(required)** | `(value: InputFileValue) => void` |  |
| `invalid` | `boolean` |  |
| `isTouched` | `boolean` |  |
| `isDirty` | `boolean` |  |
| `error` | `string` |  |

### InputFile.Controller

Same props as `InputFile`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `InputFileValue` |  |
| `rules` | `Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs' \| 'disabled'>` |  |
