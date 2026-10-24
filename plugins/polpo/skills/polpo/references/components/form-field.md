# Field

Polpo v0.1.32 - generated from the source code, do not edit.

## Field

Low-level wrapper that renders the label, left/right icons and error message around a form control. All Polpo inputs use it; use it to build custom form controls with the same look.

```ts
import { Field } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `rightIcon` | `IconType` |  |
| `leftIcon` | `IconType` |  |
| `errorIcon` | `IconType` | `ImCross` |
| `onClickLeftIcon` | `() => void` |  |
| `onClickRightIcon` | `() => void` |  |
| `label` | `string` |  |
| `variant` | `'full-border' \| 'content-border' \| 'line'` |  |
| `ref` | `RefObject<HTMLElement \| null>` |  |
| `children` **(required)** | `ReactNode` |  |
| `id` **(required)** | `string` |  |
| `error` | `string` |  |
| `isFocus` | `boolean` | `false` |
| `fieldOrientation` | `'horizontal' \| 'vertical'` | `FieldOrientation.VERTICAL` |

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'full-border'`.

### FieldVariant

Border styles of a form `Field`.

`import { FieldVariant } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `FULL_BORDER` | `'full-border'` |
| `CONTENT_BORDER` | `'content-border'` |
| `CONTENT_LINE` | `'line'` |

### FieldOrientation

Label placement of a form `Field`.

`import { FieldOrientation } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `HORIZONTAL` | `'horizontal'` |
| `VERTICAL` | `'vertical'` |

## Types

### FieldProps

```ts
export type FieldProps = FieldSharedProps & {
  children: React.ReactNode;
  id: string;
  error?: string;
  isFocus?: boolean;
  fieldOrientation?: `${FieldOrientation}`;
};
```

### InputFieldProps

```ts
export type InputFieldProps<T> = T & FieldSharedProps;
```
