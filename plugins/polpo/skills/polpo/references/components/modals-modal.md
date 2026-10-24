# Modal, Backdrop

Polpo v0.1.32 - generated from the source code, do not edit.

## Modal

Base modal primitive rendered in a portal: backdrop, animations, positioning (on screen or relative to `containerRef`), closes on click outside and Escape. Prefer `ActionModal`, `AsideModal`, `ConfirmationModal`, `Menu` or `Tooltip` for common cases.

```ts
import { Modal } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `zIndex` | `React.CSSProperties['zIndex']` | `1000` |
| `opacity` | `number` |  |
| `backdrop` | `'none' \| 'opaque' \| 'transparent' \| 'blur'` |  |
| `backdropOnClick` | `() => void` |  |
| `backdropBackground` | `string` |  |
| `transitionDuration` | `number` | `500` |
| `isOpen` **(required)** | `boolean` |  |
| `windowOffset` | `number` | `10` |
| `offset` | `number` | `20` |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom' \| 'center' \| 'top left' \| 'top right' \| 'top center' \| 'left top' \| 'left bottom' \| 'left center' \| 'right top' \| 'right bottom' \| 'right center' \| 'bottom left' \| 'bottom right' \| 'bottom center'` |  |
| `containerRef` | `RefObject<HTMLElement \| null>` |  |
| `id` **(required)** | `string` |  |
| `children` **(required)** | `ReactNode` |  |
| `onClose` **(required)** | `() => void` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `rootStyle` | `CSSProperties` | `{}` |
| `animation` | `'none' \| 'fade-down' \| 'bounce'` | `'fade-down'` |
| `closeAnimationClassName` | `string` | `'modal-close'` |
| `modalRef` | `RefObject<HTMLElement \| null>` |  |
| `closeOnClickOutside` | `boolean` | `true` |

## Backdrop

Backdrop overlay rendered behind a `Modal`.

```ts
import { Backdrop } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `opacity` | `number` | `0.6` |
| `backdrop` | `'none' \| 'opaque' \| 'transparent' \| 'blur'` | `ModalBackdrop.BLUR` |
| `zIndex` | `React.CSSProperties['zIndex']` |  |
| `backdropOnClick` | `() => void` |  |
| `modalState` | `ModalState.OPENING \| ModalState.OPEN \| ModalState.CLOSING \| ModalState.CLOSED` |  |
| `backdropBackground` | `string` | `'var(--modal-backdrop-background)'` |

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'opaque'`.

### ModalBackdrop

Backdrop styles available for modals.

`import { ModalBackdrop } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `OPAQUE` | `'opaque'` |
| `TRANSPARENT` | `'transparent'` |
| `BLUR` | `'blur'` |
| `NONE` | `'none'` |

## Types

### ModalProps

```ts
export type ModalProps = Omit<BackdropProps, 'modalState'> &
  UseModalTransitionParams &
  Omit<UseModalInContainerParams, 'modalRef'> & {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
    rootStyle?: CSSProperties;
    animation?: 'none' | 'fade-down' | 'bounce';
    closeAnimationClassName?: string;
    modalRef?: React.RefObject<HTMLElement | null>;
    closeOnClickOutside?: boolean;
  };
```

### BackdropProps

```ts
export type BackdropProps = {
  opacity?: number;
  backdrop?: `${ModalBackdrop}`;
  zIndex?: React.CSSProperties['zIndex'];
  backdropOnClick?: () => void;
  modalState?: ModalState;
  backdropBackground?: string;
};
```

## Examples

### Storybook: Components/Modals/Modal

Live demo: https://ui.juanmsl.com/?path=/story/components-modals-modal--all-container-positions

```tsx
import { Button, Line, Typography, ModalBackdrop, Modal as ModalComponent, ModalProps } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
import { useModal } from 'polpo/hooks';
import { Grid } from 'polpo/layouts';
```

Helpers used by the examples:

```tsx
const Modal = ({ children, ...props }: ModalProps) => (
  <ModalComponent backdrop='none' {...props} style={{ borderRadius: '1em' }}>
    <Grid style={{ width: '400px', maxWidth: '100%', padding: '1em' }}>
      <Typography variant='header4' color='primary'>
        {children}
      </Typography>
      <Line />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi dolore, doloremque doloribus esse
        excepturi impedit in, ipsam ipsum iste magni nihil officiis quasi quia quod similique tenetur? Aliquid cum dolor
        incidunt nihil?
      </Typography>
    </Grid>
  </ModalComponent>
);
```

Default usage (`args`):

```tsx
<Modal offset={20} windowOffset={10} />
```

**All Container Positions**

```tsx
(args => {
    const modal1 = useModal<HTMLButtonElement>();
    const modal2 = useModal<HTMLButtonElement>();
    const modal3 = useModal<HTMLButtonElement>();
    const modal4 = useModal<HTMLButtonElement>();
    const modal5 = useModal<HTMLButtonElement>();
    const modal6 = useModal<HTMLButtonElement>();
    const modal7 = useModal<HTMLButtonElement>();
    const modal8 = useModal<HTMLButtonElement>();
    const modal9 = useModal<HTMLButtonElement>();
    const modal10 = useModal<HTMLButtonElement>();
    const modal11 = useModal<HTMLButtonElement>();
    const modal12 = useModal<HTMLButtonElement>();

    return (
      <Grid gtc='repeat(3, 1fr)' gap='20px'>
        <Button fullWidth ref={modal1.containerRef} onClick={modal1.openModal}>
          top left
        </Button>
        <Modal
          {...args}
          containerRef={modal1.containerRef}
          id='container-modal'
          isOpen={modal1.isOpen}
          onClose={modal1.closeModal}
          position='top left'
        >
          top left
        </Modal>
        <Button fullWidth ref={modal2.containerRef} onClick={modal2.openModal}>
          top center
        </Button>
        <Modal
          {...args}
          containerRef={modal2.containerRef}
          id='container-modal'
          isOpen={modal2.isOpen}
          onClose={modal2.closeModal}
          position='top center'
        >
          top center
        </Modal>
        <Button fullWidth ref={modal3.containerRef} onClick={modal3.openModal}>
          top right
        </Button>
        <Modal
          {...args}
          containerRef={modal3.containerRef}
          id='container-modal'
          isOpen={modal3.isOpen}
          onClose={modal3.closeModal}
          position='top right'
        >
          top right
        </Modal>

        <Button fullWidth ref={modal4.containerRef} onClick={modal4.openModal}>
          left top
        </Button>
        <Modal
          {...args}
          containerRef={modal4.containerRef}
          id='container-modal'
          isOpen={modal4.isOpen}
          onClose={modal4.closeModal}
          position='left top'
        >
          left top
        </Modal>
        <span />
        <Button fullWidth ref={modal5.containerRef} onClick={modal5.openModal}>
          right top
        </Button>
        <Modal
          {...args}
          containerRef={modal5.containerRef}
          id='container-modal'
          isOpen={modal5.isOpen}
          onClose={modal5.closeModal}
          position='right top'
        >
          right top
        </Modal>

        <Button fullWidth ref={modal6.containerRef} onClick={modal6.openModal}>
          left center
        </Button>
        <Modal
          {...args}
          containerRef={modal6.containerRef}
          id='container-modal'
          isOpen={modal6.isOpen}
          onClose={modal6.closeModal}
          position='left center'
        >
          left center
        </Modal>
        <span />
        <Button fullWidth ref={modal7.containerRef} onClick={modal7.openModal}>
          right center
        </Button>
        <Modal
          {...args}
          containerRef={modal7.containerRef}
          id='container-modal'
          isOpen={modal7.isOpen}
          onClose={modal7.closeModal}
          position='right center'
        >
          right center
        </Modal>

        <Button fullWidth ref={modal8.containerRef} onClick={modal8.openModal}>
          left bottom
        </Button>
        <Modal
          {...args}
          containerRef={modal8.containerRef}
          id='container-modal'
          isOpen={modal8.isOpen}
          onClose={modal8.closeModal}
          position='left bottom'
        >
          left bottom
        </Modal>
        <span />
        <Button fullWidth ref={modal9.containerRef} onClick={modal9.openModal}>
          right bottom
        </Button>
        <Modal
          {...args}
          containerRef={modal9.containerRef}
          id='container-modal'
          isOpen={modal9.isOpen}
          onClose={modal9.closeModal}
          position='right bottom'
        >
          right bottom
        </Modal>

        <Button fullWidth ref={modal10.containerRef} onClick={modal10.openModal}>
          bottom left
        </Button>
        <Modal
          {...args}
          containerRef={modal10.containerRef}
          id='container-modal'
          isOpen={modal10.isOpen}
          onClose={modal10.closeModal}
          position='bottom left'
        >
          bottom left
        </Modal>
        <Button fullWidth ref={modal11.containerRef} onClick={modal11.openModal}>
          bottom center
        </Button>
        <Modal
          {...args}
          containerRef={modal11.containerRef}
          id='container-modal'
          isOpen={modal11.isOpen}
          onClose={modal11.closeModal}
          position='bottom center'
        >
          bottom center
        </Modal>
        <Button fullWidth ref={modal12.containerRef} onClick={modal12.openModal}>
          bottom right
        </Button>
        <Modal
          {...args}
          containerRef={modal12.containerRef}
          id='container-modal'
          isOpen={modal12.isOpen}
          onClose={modal12.closeModal}
          position='bottom right'
        >
          bottom right
        </Modal>
      </Grid>
    );
  }) satisfies typeof ModalComponent
```

**All Screen Positions**

```tsx
(args => {
    const modal1 = useModal();
    const modal2 = useModal();
    const modal3 = useModal();
    const modal4 = useModal();
    const modal5 = useModal();
    const modal6 = useModal();
    const modal7 = useModal();
    const modal8 = useModal();
    const modal9 = useModal();

    return (
      <Grid gtc='repeat(3, 1fr)' gap='20px'>
        <Button fullWidth onClick={modal1.openModal}>
          top left
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal1.isOpen} onClose={modal1.closeModal} position='top left'>
          top left
        </Modal>
        <Button fullWidth onClick={modal2.openModal}>
          top center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal2.isOpen} onClose={modal2.closeModal} position='top center'>
          top center
        </Modal>
        <Button fullWidth onClick={modal3.openModal}>
          top right
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal3.isOpen} onClose={modal3.closeModal} position='top right'>
          top right
        </Modal>

        <Button fullWidth onClick={modal4.openModal}>
          left center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal4.isOpen} onClose={modal4.closeModal} position='left center'>
          left center
        </Modal>
        <Button fullWidth onClick={modal5.openModal}>
          center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal5.isOpen} onClose={modal5.closeModal} position='center'>
          center
        </Modal>
        <Button fullWidth onClick={modal6.openModal}>
          right center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal6.isOpen} onClose={modal6.closeModal} position='right center'>
          right center
        </Modal>

        <Button fullWidth onClick={modal7.openModal}>
          bottom left
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal7.isOpen} onClose={modal7.closeModal} position='bottom left'>
          bottom left
        </Modal>
        <Button fullWidth onClick={modal8.openModal}>
          bottom center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal8.isOpen} onClose={modal8.closeModal} position='bottom center'>
          bottom center
        </Modal>
        <Button fullWidth onClick={modal9.openModal}>
          bottom right
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal9.isOpen} onClose={modal9.closeModal} position='bottom right'>
          bottom right
        </Modal>
      </Grid>
    );
  }) satisfies typeof ModalComponent
```
