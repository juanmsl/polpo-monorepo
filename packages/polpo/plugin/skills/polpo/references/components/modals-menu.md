# Menu

Polpo v0.2.0 - generated from the source code, do not edit.

## Menu

Dropdown / context menu anchored to an element (`containerRef`), composed with `Menu.Option`, `Menu.Group`, `Menu.GroupLabel` and `Menu.Divider`.

```ts
import { Menu } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `zIndex` | `React.CSSProperties['zIndex']` |  |
| `opacity` | `number` |  |
| `backdrop` | `'none' \| 'opaque' \| 'transparent' \| 'blur'` |  |
| `backdropOnClick` | `() => void` |  |
| `backdropBackground` | `string` |  |
| `transitionDuration` | `number` |  |
| `isOpen` **(required)** | `boolean` |  |
| `windowOffset` | `number` |  |
| `offset` | `number` |  |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom' \| 'center' \| 'top left' \| 'top right' \| 'top center' \| 'left top' \| 'left bottom' \| 'left center' \| 'right top' \| 'right bottom' \| 'right center' \| 'bottom left' \| 'bottom right' \| 'bottom center'` |  |
| `containerRef` | `RefObject<HTMLElement \| null>` |  |
| `id` **(required)** | `string` |  |
| `children` **(required)** | `ReactNode` |  |
| `onClose` **(required)** | `() => void` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` |  |
| `rootStyle` | `CSSProperties` |  |
| `animation` | `'none' \| 'fade-down' \| 'bounce'` |  |
| `closeAnimationClassName` | `string` |  |
| `modalRef` | `RefObject<HTMLElement \| null>` |  |
| `closeOnClickOutside` | `boolean` |  |
| `contentClassName` | `string` | `''` |
| `contentStyle` | `CSSProperties` | `{}` |
| `menuContentRef` | `RefObject<HTMLUListElement>` |  |

### Menu.Option

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `ReactNode` | `''` |
| `disabled` | `boolean` | `false` |
| `selected` | `boolean` | `false` |
| `asCheckbox` | `boolean` |  |
| `icon` | `IconType` |  |
| `onClick` | `(newValue: boolean) => void` | `() => null` |

Also accepts the native attributes of `HTMLAttributes`.

### Menu.Divider

_No props._

### Menu.GroupLabel

| Prop | Type | Default |
| --- | --- | --- |
| `ref` | `RefObject<HTMLElement>` |  |
| `noPadding` | `boolean` |  |
| `nowrap` | `number \| boolean` |  |
| `as` | `React.HTMLElementType` |  |
| `weight` | `'regular' \| 'light' \| 'bold'` |  |
| `htmlFor` | `string` |  |
| `align` | `React.CSSProperties['textAlign']` |  |
| `family` | `'primary' \| 'code'` |  |
| `recommendedWidth` | `boolean` |  |

Also accepts the native attributes of `HTMLAttributes`.

### Menu.Group

| Prop | Type | Default |
| --- | --- | --- |
| `label` **(required)** | `ReactNode` |  |
| `contentClassName` | `string` | `''` |
| `contentStyle` | `CSSProperties` | `{}` |

Also accepts the native attributes of `HTMLAttributes`.

## Types

### MenuOptionProps

```ts
export type MenuOptionProps = Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> & {
  id?: string;
  children?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  asCheckbox?: boolean;
  icon?: IconType;
  onClick?: (newValue: boolean) => void;
};
```

## Examples

### Storybook: Components/Modals/Menu

Live demo: https://ui.juanmsl.com/?path=/story/components-modals-menu--default

```tsx
import { Button, Menu, ModalBackdrop } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
import { useModal } from 'polpo/hooks';
import { BsAirplane } from 'react-icons/bs';
import { FaBicycle, FaInstagram, FaLink, FaSpinner, FaWhatsapp } from 'react-icons/fa';
import { FaHouse, FaMagnifyingGlass } from 'react-icons/fa6';
import { FcDocument } from 'react-icons/fc';
import { GiThink } from 'react-icons/gi';
import { GrOrderedList } from 'react-icons/gr';
import { IoGameController } from 'react-icons/io5';
import { LuDoorClosed, LuDoorOpen } from 'react-icons/lu';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    (Story, { args }) => {
      const { openModal, closeModal, isOpen, containerRef } = useModal<HTMLButtonElement>();

      return (
        <>
          <Button fullWidth ref={containerRef} onClick={openModal}>
            {isOpen ? <LuDoorOpen /> : <LuDoorClosed />}
            Menu
          </Button>
          <Story
            args={{
              ...args,
              isOpen,
              offset: 10,
              style: { height: 300, minWidth: 200 },
              onClose: closeModal,
              containerRef,
              children: (
                <>
                  <Menu.GroupLabel>Checkbox</Menu.GroupLabel>
                  <Menu.Option asCheckbox icon={FaHouse} disabled label='Option 1' />
                  <Menu.Option asCheckbox icon={FaMagnifyingGlass} selected label='Option 2' />
                  <Menu.Option asCheckbox icon={FcDocument} label='Option 3' />
                  <Menu.Option asCheckbox icon={FaSpinner} disabled selected label='Option 4' />
                  <Menu.Divider />
                  <Menu.GroupLabel>Options disabled</Menu.GroupLabel>
                  <Menu.Option icon={FaInstagram} label='Option 5' />
                  <Menu.Option icon={BsAirplane} disabled label='Option 6' />
                  <Menu.Option icon={FaWhatsapp} disabled selected label='Option 7' />
                  <Menu.Option icon={GrOrderedList} label='Option 8' />
                  <Menu.Divider />
                  <Menu.GroupLabel>Options</Menu.GroupLabel>
                  <Menu.Option icon={GiThink} label='Option 9' />
                  <Menu.Option icon={IoGameController} label='Option 10' />
                  <Menu.Option icon={FaBicycle} selected label='Option 11' />
                  <Menu.Option icon={FaLink} label='Option 12' />
                </>
              ),
            }}
          />
        </>
      );
    },
  ]
```

Default usage (`args`):

```tsx
<Menu offset={5} windowOffset={10} position={PositionContainer.BOTTOM_RIGHT} backdrop={ModalBackdrop.TRANSPARENT}>Menu content</Menu>
```
