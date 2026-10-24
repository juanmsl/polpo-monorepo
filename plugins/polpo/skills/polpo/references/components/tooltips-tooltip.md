# Tooltip

Polpo v0.1.32 - generated from the source code, do not edit.

## Tooltip

Shows `content` in a floating tooltip while hovering its single child (the child must accept a `ref`).

```ts
import { Tooltip } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom'` | `PositionContainer.TOP` |
| `offset` | `` number \| `${number}` `` | `5` |
| `disabled` | `boolean` | `false` |
| `children` **(required)** | `ReactElement<{ ref: RefObject<HTMLElement \| null>; }, string \| JSXElementConstructor<any>>` |  |
| `content` **(required)** | `ReactNode` |  |

## Types

### TooltipProps

```ts
export type TooltipProps = {
  position?:
    | `${PositionContainer.TOP}`
    | `${PositionContainer.LEFT}`
    | `${PositionContainer.RIGHT}`
    | `${PositionContainer.BOTTOM}`;
  offset?: number | `${number}`;
  disabled?: boolean;
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>;
  }>;
  content: React.ReactNode;
};
```

## Examples

### Storybook: Components/Tooltips/Tooltip

Live demo: https://ui.juanmsl.com/?path=/story/components-tooltips-tooltip--default

```tsx
import { Tooltip } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Story>
        <span>Hello world</span>
      </Story>
    ),
  ]
```

Default usage (`args`):

```tsx
<Tooltip content='Tooltip content' />
```
