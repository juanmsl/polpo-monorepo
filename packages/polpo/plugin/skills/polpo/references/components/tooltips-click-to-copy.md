# ClickToCopy

Polpo v0.1.33 - generated from the source code, do not edit.

## ClickToCopy

Copies `value` to the clipboard when its children are clicked, showing a tooltip.

```ts
import { ClickToCopy } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` |  |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom'` |  |
| `offset` | `` number \| `${number}` `` |  |
| `value` **(required)** | `string` |  |
| `tooltipText` **(required)** | `string` |  |
| `tooltipCopiedText` | `string` |  |
| `copiedTextTimeout` | `number` | `500` |

## Examples

### Storybook: Components/Tooltips/ClickToCopy

Live demo: https://ui.juanmsl.com/?path=/story/components-tooltips-clicktocopy--default

```tsx
import { ClickToCopy } from 'polpo/components';
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
<ClickToCopy tooltipText='Copy to clipboard' tooltipCopiedText='Copied!' value='Hello world' />
```
