# AsideModal

Polpo v0.1.33 - generated from the source code, do not edit.

## AsideModal

Drawer / side panel attached to the top, left, right or bottom edge of the screen.

```ts
import { AsideModal } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `isOpen` **(required)** | `boolean` |  |
| `zIndex` | `React.CSSProperties['zIndex']` |  |
| `opacity` | `number` |  |
| `backdrop` | `'none' \| 'opaque' \| 'transparent' \| 'blur'` |  |
| `backdropOnClick` | `() => void` |  |
| `backdropBackground` | `string` |  |
| `modalRef` | `RefObject<HTMLElement \| null>` |  |
| `windowOffset` | `number` |  |
| `offset` | `number` |  |
| `containerRef` | `RefObject<HTMLElement \| null>` |  |
| `transitionDuration` | `number` |  |
| `onClose` **(required)** | `() => void` |  |
| `closeOnClickOutside` | `boolean` |  |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom'` | `PositionContainer.LEFT` |
| `size` | `` number \| `${number}px` \| `${number}em` `` |  |
| `className` | `string` | `''` |
| `contentClassName` | `string` | `''` |
| `style` | `CSSProperties` |  |
| `noCloseButton` | `boolean` | `false` |

## Examples

### Storybook: Components/Modals/AsideModal

Live demo: https://ui.juanmsl.com/?path=/story/components-modals-asidemodal--aside

```tsx
import { AsideModal, Button, Image, Typography } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
import { useState } from 'react';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    (Story, { args }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open modal</Button>
          <Story args={{ ...args, isOpen, onClose: () => setIsOpen(false) }} />
        </>
      );
    },
  ]
```

Default usage (`args`):

```tsx
<AsideModal />
```

**Aside** (args: `{ size: 500, }`)

```tsx
args => {
    return (
      <AsideModal {...args}>
        <Typography variant='header4'>Aside modal</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet at cupiditate dolorum eaque eligendi
          error est fugit harum illo incidunt ipsum itaque labore nulla quaerat quam recusandae repellat sequi
          similique, sit unde vel veniam? Aliquam dicta ipsum voluptates voluptatum.
        </Typography>
        <Image src='https://picsum.photos/500/300' />
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque illum quas recusandae? Adipisci alias
          corporis, cumque doloribus ducimus ea enim, et hic id non nulla quae quis sed temporibus vero.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloribus error excepturi minima quae, quia
          quod voluptatem? Consectetur, enim exercitationem hic illo iusto obcaecati odio?
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus necessitatibus officiis optio
          quaerat qui, reiciendis tempora totam ut veniam. At blanditiis cupiditate dolor dolorum ipsum laboriosam natus
          quisquam quo soluta ut? Accusamus aspernatur at beatae neque nisi possimus rerum!
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aspernatur at debitis delectus
          error excepturi fuga, harum in laboriosam laudantium minus, neque omnis, optio praesentium quidem recusandae
          reiciendis reprehenderit rerum sunt voluptatem.
        </Typography>
      </AsideModal>
    );
  }
```
