# ConfirmationModal

Polpo v0.1.32 - generated from the source code, do not edit.

## ConfirmationModal

Ready-made accept/reject dialog built on `ActionModal`.

```ts
import { ConfirmationModal } from 'polpo/components';
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
| `lineOnTop` | `boolean` |  |
| `backCard` | `boolean` |  |
| `noPadding` | `boolean` |  |
| `className` | `string` |  |
| `style` | `CSSProperties` |  |
| `title` **(required)** | `string` |  |
| `onAccept` **(required)** | `() => Promise<void> \| () => void` |  |
| `onReject` | `() => Promise<void> \| () => void` | `() => null` |
| `acceptText` **(required)** | `string` |  |
| `rejectText` **(required)** | `string` |  |
| `isLoading` | `boolean` |  |

## Examples

### Storybook: Components/Modals/ConfirmationModal

Live demo: https://ui.juanmsl.com/?path=/story/components-modals-confirmationmodal--default

```tsx
import { Button, ConfirmationModal } from 'polpo/components';
import { useModal } from 'polpo/hooks';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    (Story, { args }) => {
      const { isOpen, openModal, closeModal } = useModal();

      return (
        <>
          <Button onClick={openModal}>Open modal</Button>
          <Story
            args={{
              ...args,
              isOpen,
              onClose: closeModal,
              onAccept: () =>
                new Promise(resolve => {
                  setTimeout(resolve, 1000);
                }),

              onReject: () =>
                new Promise(resolve => {
                  setTimeout(resolve, 1000);
                }),
            }}
          />
        </>
      );
    },
  ]
```

Default usage (`args`):

```tsx
<ConfirmationModal title='Are you sure?' acceptText='Accept' rejectText='Reject'>Are you sure want to execute an action?</ConfirmationModal>
```
