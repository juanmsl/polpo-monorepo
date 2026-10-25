# ActionModal

Polpo v0.1.33 - generated from the source code, do not edit.

## ActionModal

Centered dialog for actions. `ActionModal.ActionButton` runs a (possibly async) action with a loading state and closes the modal when it finishes. With `actionRequired` the user cannot dismiss it.

```ts
import { ActionModal } from 'polpo/components';
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
| `actionRequired` | `boolean` |  |
| `icon` | `IconType` |  |
| `noCloseButton` | `boolean` |  |
| `lineOnTop` | `boolean` | `false` |
| `backCard` | `boolean` | `false` |
| `noPadding` | `boolean` | `false` |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |

### ActionModal.ActionButton

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` |  |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` |  |
| `size` | `'small' \| 'large' \| 'regular'` |  |
| `noWrap` | `boolean` |  |
| `forIcon` | `boolean` |  |
| `ref` | `React.Ref<HTMLButtonElement>` |  |
| `variant` | `'solid' \| 'flat' \| 'outlined' \| 'text'` |  |
| `isLoading` | `boolean` |  |
| `fullWidth` | `boolean` |  |
| `onClick` **(required)** | `() => Promise<void> \| () => void` |  |

Also accepts the native attributes of `ButtonHTMLAttributes`, `HTMLAttributes`.

## Types

### ActionModalProps

```ts
export type ActionModalProps = Omit<
  ModalProps,
  'id' | 'animation' | 'closeAnimationClassName' | 'position' | 'rootStyle' | 'className' | 'style'
> & {
  actionRequired?: boolean;
  icon?: IconType;
  noCloseButton?: boolean;
  lineOnTop?: boolean;
  backCard?: boolean;
  noPadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
};
```

## Examples

### Storybook: Components/Modals/ActionModal

Live demo: https://ui.juanmsl.com/?path=/story/components-modals-actionmodal--classic

```tsx
import { ActionModal, Button, Line, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
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
<ActionModal>Action modal content</ActionModal>
```

**Classic** (args: `{ lineOnTop: true, noPadding: true, }`)

```tsx
args => {
    return (
      <ActionModal {...args}>
        <Typography variant='header4' noPadding style={{ padding: '0 1rem' }}>
          Action modal
        </Typography>
        <Line />
        <Grid gap='1em' style={{ padding: '0 1rem 1rem' }}>
          <Typography>Are you sure want to execute an action?</Typography>
        </Grid>
        <Grid
          ai='center'
          columnSize='80px'
          ji='center'
          flow='column'
          jc='end'
          gap='1em'
          style={{ padding: '0 1rem 1rem' }}
        >
          <ActionModal.ActionButton
            size='small'
            fullWidth
            variant='outlined'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            No
          </ActionModal.ActionButton>
          <ActionModal.ActionButton
            size='small'
            fullWidth
            color='primary'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            Yes
          </ActionModal.ActionButton>
        </Grid>
      </ActionModal>
    );
  }
```

**Confirmation** (args: `{ backCard: true, lineOnTop: true, icon: FaUser, }`)

```tsx
args => {
    return (
      <ActionModal {...args}>
        <Typography variant='header4' align='center' noPadding>
          Action modal
        </Typography>
        <Typography>Are you sure want to execute an action?</Typography>
        <Grid
          ai='center'
          columnSize='minmax(100px, 1fr)'
          ji='center'
          flow='column'
          jc='center'
          gap='1em'
          style={{ margin: 'auto' }}
        >
          <ActionModal.ActionButton
            size='small'
            fullWidth
            variant='outlined'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            No
          </ActionModal.ActionButton>
          <ActionModal.ActionButton
            size='small'
            fullWidth
            color='primary'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            Yes
          </ActionModal.ActionButton>
        </Grid>
      </ActionModal>
    );
  }
```
