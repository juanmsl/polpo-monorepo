# Select

Polpo v0.2.0 - generated from the source code, do not edit.

## Select

Single or multi (`multiselect`) select dropdown with search, infinite loading and custom option/value renderers. Use `Select.Controller` in forms.

```ts
import { Select } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `options` **(required)** | `T[]` |  |
| `isEqualComparator` | `(a: T, b: T) => boolean` |  |
| `searchQueryValue` | `string` |  |
| `searchQueryPlaceholder` | `string` |  |
| `onSearchQuery` | `(value: string) => void` |  |
| `loadMore` | `() => void` | `() => null` |
| `isLoading` | `boolean` | `false` |
| `hasNextPage` | `boolean` | `false` |
| `emptyMessage` | `string` | `'No options to select'` |
| `maxOptions` | `number` |  |
| `optionComponent` | `FC<OptionComponentProps<T>>` | `DefaultOption` |
| `valueComponent` | `FC<ValueComponentProps<T>>` | `DefaultValue` |
| `showClearOption` | `boolean` | `false` |
| `height` | `number` |  |
| `searchQueryClassName` | `string` |  |
| `searchQueryStyle` | `CSSProperties` |  |
| `children` | `ReactNode` |  |
| `rightIcon` | `IconType` |  |
| `leftIcon` | `IconType` |  |
| `errorIcon` | `IconType` |  |
| `onClickLeftIcon` | `() => void` |  |
| `onClickRightIcon` | `() => void` |  |
| `label` | `string` |  |
| `variant` | `'full-border' \| 'content-border' \| 'line'` |  |
| `ref` | `RefObject<HTMLElement \| null>` |  |
| `multiselect` | `true \| false` |  |
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
| `value` **(required)** | `MultiValue<T> \| null \| T` |  |
| `setValue` **(required)** | `(value: MultiValue<T>) => void \| (value: SingleValue<T>) => void` |  |
| `invalid` | `boolean` | `false` |
| `isTouched` | `boolean` | `false` |
| `isDirty` | `boolean` | `false` |
| `error` | `string` |  |

### Select.Controller

Same props as `Select`, except `value`, `setValue`, `invalid`, `isTouched`, `isDirty`, `error`.

Additional props:

| Prop | Type | Default |
| --- | --- | --- |
| `defaultValue` | `MultiValue<T> \| null \| T` |  |
| `rules` | `Omit<RegisterOptions<FieldValues, string>, 'disabled' \| 'valueAsNumber' \| 'valueAsDate' \| 'setValueAs'>` |  |

### Select.Option

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `value` **(required)** | `T` |  |

### Select.OptionLabel

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
