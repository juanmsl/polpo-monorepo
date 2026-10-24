# Helpers

Polpo v0.1.32 - generated from the source code, do not edit.

## cn

Merges class names with `clsx` and resolves Tailwind conflicts with `tailwind-merge`.

```ts
import { cn } from 'polpo/helpers';
```

```ts
cn: (...inputs: Array<ClassValue>) => string
```

## formatBytes

Formats a number of bytes, e.g. `formatBytes(1500)` -> `"1.5 KB"`.

```ts
import { formatBytes } from 'polpo/helpers';
```

```ts
formatBytes: (bytes: number, decimals?: number) => string
```

## formatDate

Formats a date string as `"Mon YYYY"`, e.g. `"Jan 2024"`.

```ts
import { formatDate } from 'polpo/helpers';
```

```ts
formatDate: (date: string) => string
```

## timeBetween

Human readable time between two dates, e.g. `"2 years"` (end defaults to now).

```ts
import { timeBetween } from 'polpo/helpers';
```

```ts
timeBetween: (date_start: string, date_end: string) => string
```

## getModalPosition

```ts
import { getModalPosition } from 'polpo/helpers';
```

```ts
getModalPosition: ({ c, m, offset, position }: GetModalPositionParams) => ModalPosition
```

## getOppositePosition

```ts
import { getOppositePosition } from 'polpo/helpers';
```

```ts
getOppositePosition: ({ top, left }: ModalPosition, position: PositionContainer, windowOffset: number, m: PositionObject) => PositionContainer
```

## fixModalPosition

```ts
import { fixModalPosition } from 'polpo/helpers';
```

```ts
fixModalPosition: ({ top, left }: ModalPosition, m: PositionObject, windowOffset: number) => { top: number; left: number; }
```

## getModalPositionRelativeToContainer

Computes the position of a modal relative to a container element.

```ts
import { getModalPositionRelativeToContainer } from 'polpo/helpers';
```

```ts
getModalPositionRelativeToContainer: ({ c, m, offset, windowOffset, position, }: getModalPositionRelativeToContainerParams) => Record<string, string>
```

## getModalPositionRelativeToScreen

Computes the position styles of a modal relative to the screen.

```ts
import { getModalPositionRelativeToScreen } from 'polpo/helpers';
```

```ts
getModalPositionRelativeToScreen: ({ position, windowOffset, }: GetModalPositionRelativeToScreenParams) => Record<string, string>
```

## toCapitalize

Capitalizes the first word or each word of a text.

```ts
import { toCapitalize } from 'polpo/helpers';
```

```ts
toCapitalize: (text: string, options?: ToCapitalizeOptions) => string
```

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'center'`.

### PositionContainer

Positions for modals, tooltips and menus.

`import { PositionContainer } from 'polpo/helpers';`

| Member | Value |
| --- | --- |
| `CENTER` | `'center'` |
| `TOP` | `'top'` |
| `TOP_LEFT` | `'top left'` |
| `TOP_RIGHT` | `'top right'` |
| `TOP_CENTER` | `'top center'` |
| `LEFT` | `'left'` |
| `LEFT_TOP` | `'left top'` |
| `LEFT_BOTTOM` | `'left bottom'` |
| `LEFT_CENTER` | `'left center'` |
| `RIGHT` | `'right'` |
| `RIGHT_TOP` | `'right top'` |
| `RIGHT_BOTTOM` | `'right bottom'` |
| `RIGHT_CENTER` | `'right center'` |
| `BOTTOM` | `'bottom'` |
| `BOTTOM_LEFT` | `'bottom left'` |
| `BOTTOM_RIGHT` | `'bottom right'` |
| `BOTTOM_CENTER` | `'bottom center'` |

## Types

### PositionObject

```ts
export type PositionObject = {
  x: number;
  y: number;
  top: number;
  left: number;
  w: number;
  h: number;
};
```

### ModalPosition

```ts
export type ModalPosition = {
  left: number;
  top: number;
};
```

### GetModalPositionParams

```ts
export type GetModalPositionParams = {
  c: PositionObject;
  m: PositionObject;
  offset: number;
  position: PositionContainer;
};
```

### GetModalPositionRelativeToScreenParams

```ts
export type GetModalPositionRelativeToScreenParams = {
  position: PositionContainer;
  windowOffset: number;
};
```

### ToCapitalizeOptions

```ts
export type ToCapitalizeOptions = Partial<{
  separator: string;
  join: string;
  variant: 'first-word' | 'each-word';
}>;
```
