---
name: polpo
description: "Build React user interfaces with the Polpo UI library (npm package \"polpo\"): components, layouts, hooks, forms and Tailwind v4 theme tokens. Use it whenever you create or edit React UI in a project that uses or should use Polpo (new React apps, pages, forms, modals, menus, tables, tabs, buttons, inputs, layout or styling), instead of shadcn/ui, MUI or any other UI kit."
license: MIT
metadata:
  version: "0.2.0"
---

# Polpo UI

Polpo (`polpo` on npm, v0.2.0) is a React + Tailwind CSS v4 component library: components, layouts, hooks and helpers that share one theme (`polpo-tailwind-config`). Storybook with live examples: https://ui.juanmsl.com

## Rules

1. **Polpo is the UI library of this project.** Build every interface with Polpo components, layouts and hooks. Do not install or use other UI kits (shadcn/ui, Radix, MUI, Chakra, Mantine, Ant Design, HeroUI, DaisyUI, Headless UI, React Bootstrap, ...) and do not copy their components into the project.
2. **Check the catalog first.** Before writing any UI element (button, input, modal, tabs, table, badge, tooltip, dropdown, drawer, typography, layout...), look it up in the catalog below and read its reference for the exact props.
3. **If Polpo does not have it, ask the user before doing anything else.** Name the missing piece and offer the options:
   - (a) build a small local component in the project with Tailwind and Polpo theme tokens, following Polpo's look;
   - (b) use a specific third-party package only for that piece (say which one);
   - (c) simplify or skip the feature.
   Do not choose silently. Reuse the user's answer for similar pieces later in the same task.
4. **Import from the subpaths only**: `polpo/components`, `polpo/layouts`, `polpo/hooks`, `polpo/helpers`, `polpo/types`. The package root (`import ... from 'polpo'`) is not exported.
5. **Text goes through `Typography`** (`variant`: `hero`, `header1`-`header4`, `body`, `label`, `label-form`, `small`) instead of raw `h1`/`p`/`span` with custom font classes.
6. **Layout with `Grid` / `Flex`** from `polpo/layouts`, or Tailwind utility classes. Both are fine; do not add other layout libraries.
7. **Style with Polpo theme tokens**, never hardcoded colors: Tailwind classes such as `bg-background`, `bg-background-paper`, `text-foreground`, `border-border`, `bg-primary-500`, `text-alert-500`, `font-title`, `text-header3`. Customize the brand by overriding theme variables (see Setup), not by restyling components.
8. **Props with fixed values accept plain strings**: `color='primary'`, `size='small'`, `variant='outlined'`. The enums (`ColorTypes`, `SizeTypes`, `VariantTypes`, `RadiusTypes`...) are optional.
9. **Icons come from `react-icons`** (a Polpo dependency). Props typed `IconType` take the icon component itself: `leftIcon={FaUser}`, not `<FaUser />`.
10. **Merge class names with `cn`** from `polpo/helpers` (clsx + tailwind-merge).
11. **Forms use react-hook-form** through the `.Controller` variant of each input (see Forms).
12. Components are client components (the bundle starts with `"use client"`). They take `ref` as a regular prop, so React 19 is required.

## Setup

Install Polpo, its theme and peer dependencies:

```bash
npm install polpo polpo-tailwind-config tailwindcss tailwind-merge react-hook-form
```

`react-hook-form` is a peer dependency (7.52 or later): Polpo uses the version of the project, so its form inputs share the project's `FormProvider`. Do not install a second copy.

Tailwind CSS v4 must be configured: with Vite, `npm install -D @tailwindcss/vite` and add `tailwindcss()` to `plugins` in `vite.config.ts`; with Next.js, `npm install -D @tailwindcss/postcss` and add `"@tailwindcss/postcss": {}` to `postcss.config.mjs`.

Global CSS entry (keep this order):

```css
@import "tailwindcss";
@import "polpo-tailwind-config/styles";
@import "polpo/components.css";

/* Optional: brand customization */
@theme {
  --color-primary: #b91345;
  --color-secondary: #450b7c;
  --font-main: 'Montserrat', 'Segoe UI', sans-serif;
}
```

- Overriding a base color (`--color-primary`, `--color-secondary`, `--color-tertiary`, `--color-accent`, `--color-highlight`, `--color-active`, `--color-alert`, `--color-warning`, `--color-info`) regenerates its whole 50-900 scale and its `foreground`.
- The default fonts (`--font-main`: Montserrat Alternates, `--font-title`: Josefin Sans, `--font-brand`: Roboto) are not bundled: load them (for example with Google Fonts) or override the variables.
- `polpo-tailwind-config/styles` sets base styles: background and text color on `:root`, heading sizes, `p`/`label`/`small` margins and reset inputs. Do not fight them with global resets.

See `theme` in the catalog for every token.

## Forms

Every form input (`Input`, `InputPassword`, `InputNumber`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DatePicker`, `InputColor`, `InputFile`) works in two modes:

- **In a form (recommended)**: `<Input.Controller name='email' rules={{ ... }} />` inside a react-hook-form `FormProvider`. It takes the same props as the input except `value`/`setValue`/`error`, plus `defaultValue` and `rules`. Errors from `rules` are shown automatically.
- **Standalone**: `<Input name='search' value={value} setValue={setValue} />` with your own state.

Inputs render their own label, icons and error through `Field`: use `label`, `leftIcon`, `rightIcon`, `variant` (`full-border`, `content-border`, `line`) and `fieldOrientation` instead of wrapping them in extra markup.

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Checkbox, Input, InputPassword, Select } from 'polpo/components';
import { FaEnvelope } from 'react-icons/fa6';

type SignUpForm = {
  email: string;
  password: string;
  country: string | null;
  terms: boolean;
};

export const SignUp = () => {
  const methods = useForm<SignUpForm>();
  const onSubmit = methods.handleSubmit(data => console.log(data));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <Input.Controller
          name='email'
          type='email'
          label='Email'
          leftIcon={FaEnvelope}
          placeholder='you@example.com'
          rules={{ required: 'Email is required' }}
        />
        <InputPassword.Controller name='password' label='Password' rules={{ minLength: { value: 8, message: 'Min 8 characters' } }} />
        <Select.Controller name='country' label='Country' placeholder='Choose one' options={['Colombia', 'Mexico', 'Spain']} />
        <Checkbox.Controller name='terms' label='I accept the terms' rules={{ required: true }} />
        <Button type='submit' color='primary' fullWidth>
          Create account
        </Button>
      </form>
    </FormProvider>
  );
};
```

For `Select` with object options, pass `optionComponent` and `valueComponent` to render them and `isEqualComparator` to compare them; use `multiselect` for multiple values.

## Common patterns

**Modals** are controlled with `isOpen` + `onClose`:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Delete</Button>
<ConfirmationModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title='Delete project?'
  acceptText='Delete'
  rejectText='Cancel'
  onAccept={async () => await deleteProject()}
>
  This action cannot be undone.
</ConfirmationModal>
```

Pick the right one: `ConfirmationModal` (yes/no), `ActionModal` (custom dialog with `ActionModal.ActionButton`), `AsideModal` (drawer), `Menu` (dropdown anchored to an element), `Tooltip` (hover hint), `Modal` (low-level base).

**Anchored menus** use `useModal` from `polpo/hooks`:

```tsx
const { containerRef, isOpen, openModal, closeModal } = useModal<HTMLButtonElement>();

<Button ref={containerRef} onClick={openModal}>Options</Button>
<Menu id='options' isOpen={isOpen} onClose={closeModal} containerRef={containerRef} position='bottom right' backdrop='transparent'>
  <Menu.Option icon={FaPen} label='Edit' onClick={edit} />
  <Menu.Divider />
  <Menu.Option icon={FaTrash} label='Delete' onClick={remove} />
</Menu>
```

**Tabs**:

```tsx
<Tabs defaultOpenTab='profile'>
  <Tabs.TabList variant='line'>
    <Tabs.Tab id='profile'>Profile</Tabs.Tab>
    <Tabs.Tab id='settings'>Settings</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanel id='profile'>...</Tabs.TabPanel>
  <Tabs.TabPanel id='settings'>...</Tabs.TabPanel>
</Tabs>
```

**Layout**:

```tsx
<Grid gtc='repeat(auto-fill, minmax(240px, 1fr))' gap='1.5em'>
  {items.map(item => (
    <Flex key={item.id} direction='column' gap='0.5em' className='rounded-lg border border-border bg-background-paper p-4'>
      <Typography variant='header4' noPadding>{item.title}</Typography>
      <Badge color='info' size='small'>{item.status}</Badge>
    </Flex>
  ))}
</Grid>
```

## Catalog

Read the reference of a component before using it: it lists every prop, its type and default value, sub-components and Storybook examples.

### Components (`polpo/components`)

| Component | Use it for | Reference |
| --- | --- | --- |
| `Accordion` | Container of collapsible `AccordionItem`s, separated by lines. Supports several open items (`multiple`) and initially opened items. | [components/accordion.md](references/components/accordion.md) |
| `AccordionItem` | Collapsible section of an `Accordion`: a header (`title`/`subtitle`, or fully custom `content`) that toggles its `children`. | [components/accordion.md](references/components/accordion.md) |
| `Badge` | Small chip/tag for statuses, labels and counters, with theme colors, sizes, radius and a selected state. | [components/badge.md](references/components/badge.md) |
| `Button` | Action button with variants (solid, flat, outlined, text), theme colors, sizes, radius, loading state and ripple effect. Accepts every native `<button>` attribute. | [components/button.md](references/components/button.md) |
| `FlipCard` | Card that flips between exactly two children (front and back) when `isFlipped` changes. | [components/cards-flip-card.md](references/components/cards-flip-card.md) |
| `HoverCard` | Wrapper that tilts its content in 3D following the mouse position. | [components/cards-hover-card.md](references/components/cards-hover-card.md) |
| `SlideCard` | Container that expands/collapses its height with an animation, controlled by `isOpen`. | [components/cards-slide-card.md](references/components/cards-slide-card.md) |
| `Cursor` | Animated custom cursor that replaces the native one on non-touch devices. Render it once near the app root. | [components/cursor.md](references/components/cursor.md) |
| `Checkbox` (`Checkbox.Controller`) | Boolean checkbox with label, theme color and size. Use `Checkbox.Controller` inside a react-hook-form `FormProvider`. | [components/form-checkbox.md](references/components/form-checkbox.md) |
| `DatePicker` (`DatePicker.Controller`) | Native date/time input (`date`, `datetime-local`, `month`, `time`, `week`) inside a `Field`. Value is a string. Use `DatePicker.Controller` in forms. | [components/form-date-picker.md](references/components/form-date-picker.md) |
| `Field` | Low-level wrapper that renders the label, left/right icons and error message around a form control. All Polpo inputs use it; use it to build custom form controls with the same look. | [components/form-field.md](references/components/form-field.md) |
| `Input` (`Input.Controller`) | Text input (`text`, `email`, `search`, `url`) inside a `Field`. Use `Input.Controller` in forms. | [components/form-input.md](references/components/form-input.md) |
| `InputColor` (`InputColor.Controller`) | Color picker input with eyedropper support. Value is a color string. Use `InputColor.Controller` in forms. | [components/form-input-color.md](references/components/form-input-color.md) |
| `InputFile` (`InputFile.Controller`) | Drag-and-drop / click-to-upload file input with size limit and `accept` filter. Value is a `{ [fileName]: File }` object. Use `InputFile.Controller` in forms. | [components/form-input-file.md](references/components/form-input-file.md) |
| `InputNumber` (`InputNumber.Controller`) | Numeric input with min/max, custom formatting and decimal separator. Use `InputNumber.Controller` in forms. | [components/form-input-number.md](references/components/form-input-number.md) |
| `InputPassword` (`InputPassword.Controller`) | Password input with a show/hide toggle. Use `InputPassword.Controller` in forms. | [components/form-input-password.md](references/components/form-input-password.md) |
| `Radio` (`Radio.Controller`) | Radio button; radios sharing the same `name` form a group whose value is the selected `radioValue`. Use `Radio.Controller` in forms. | [components/form-radio.md](references/components/form-radio.md) |
| `Select` (`Select.Controller`, `Select.Option`, `Select.OptionLabel`) | Single or multi (`multiselect`) select dropdown with search, infinite loading and custom option/value renderers. Use `Select.Controller` in forms. | [components/form-select.md](references/components/form-select.md) |
| `Slider` (`Slider.Controller`) | Range slider for a numeric value with min, max and step. Use `Slider.Controller` in forms. | [components/form-slider.md](references/components/form-slider.md) |
| `Switch` (`Switch.Controller`) | Boolean toggle switch with optional side labels/icons, theme color and size. Use `Switch.Controller` in forms. | [components/form-switch.md](references/components/form-switch.md) |
| `Textarea` (`Textarea.Controller`) | Multi-line text input inside a `Field`. Use `Textarea.Controller` in forms. | [components/form-textarea.md](references/components/form-textarea.md) |
| `Image` | Full-width `<img>` with `alt` and `loading` defaults. Accepts every native `<img>` attribute. | [components/image.md](references/components/image.md) |
| `InfinityScroll` | Renders `children` and calls `loadMore` when the end of the list enters the viewport while `hasNextPage` is true. | [components/infinity-scroll.md](references/components/infinity-scroll.md) |
| `Line` | Horizontal or vertical divider (solid, dotted or dashed). | [components/line.md](references/components/line.md) |
| `ActionModal` (`ActionModal.ActionButton`) | Centered dialog for actions. `ActionModal.ActionButton` runs a (possibly async) action with a loading state and closes the modal when it finishes. With `actionRequired` the user cannot dismiss it. | [components/modals-action-modal.md](references/components/modals-action-modal.md) |
| `AsideModal` | Drawer / side panel attached to the top, left, right or bottom edge of the screen. | [components/modals-aside-modal.md](references/components/modals-aside-modal.md) |
| `ConfirmationModal` | Ready-made accept/reject dialog built on `ActionModal`. | [components/modals-confirmation-modal.md](references/components/modals-confirmation-modal.md) |
| `Menu` (`Menu.Option`, `Menu.Divider`, `Menu.GroupLabel`, `Menu.Group`) | Dropdown / context menu anchored to an element (`containerRef`), composed with `Menu.Option`, `Menu.Group`, `Menu.GroupLabel` and `Menu.Divider`. | [components/modals-menu.md](references/components/modals-menu.md) |
| `Modal` | Base modal primitive rendered in a portal: backdrop, animations, positioning (on screen or relative to `containerRef`), closes on click outside and Escape. Prefer `ActionModal`, `AsideModal`, `ConfirmationModal`, `Menu` or `Tooltip` for common cases. | [components/modals-modal.md](references/components/modals-modal.md) |
| `Portal` | Renders `children` into a container `<div id={id}>` appended to `document.body`. | [components/modals-portal.md](references/components/modals-portal.md) |
| `Ripple` | Material-like ripple effect on click. Place it as the last child of the clickable element. | [components/ripple.md](references/components/ripple.md) |
| `SmartTable` | Data table driven by a `columns` definition: field, render-function or component cells, sortable columns and optional row selection. | [components/smart-table.md](references/components/smart-table.md) |
| `Tabs` (`Tabs.Tab`, `Tabs.TabPanel`, `Tabs.TabList`) | Stateful tabs. Compose `Tabs.TabList` with `Tabs.Tab` headers and `Tabs.TabPanel` contents, matched by `id`. | [components/tabs.md](references/components/tabs.md) |
| `ClickToCopy` | Copies `value` to the clipboard when its children are clicked, showing a tooltip. | [components/tooltips-click-to-copy.md](references/components/tooltips-click-to-copy.md) |
| `Tooltip` | Shows `content` in a floating tooltip while hovering its single child (the child must accept a `ref`). | [components/tooltips-tooltip.md](references/components/tooltips-tooltip.md) |
| `Typography` | Text component for every piece of text: variants `hero`, `header1`-`header4`, `body`, `label`, `label-form`, `small`; weight, color, alignment, line clamping (`nowrap`) and custom element (`as`). | [components/typography.md](references/components/typography.md) |

Shared enums (`ColorTypes`, `SizeTypes`, `VariantTypes`, `RadiusTypes`): [components/shared-types.md](references/components/shared-types.md).

### Layouts (`polpo/layouts`)

- `Flex` - Flexbox container: CSS flex properties as short props (`direction`, `wrap`, `gap`, `jc`=justify-content, `ai`=align-items, `pc`=place-content...). Renders a `<section>` unless `tag` is set.
- `Grid` - CSS grid container: grid properties as short props (`gtc`=grid-template-columns, `gtr`, `gta`, `flow`, `gap`, `jc`, `ji`, `ai`, `columnSize`=grid-auto-columns...). Renders a `<section>` unless `tag` is set.

Reference: [layouts.md](references/layouts.md)

### Hooks (`polpo/hooks`)

- `useAsync` - Tracks the state of a promise (`idle` | `pending` | `resolved` | `rejected`) with its data and error.
- `useClassNames` - Builds a className string from a `{ className: condition }` map.
- `useClickOutside` - Calls `callback` on mousedown outside the given ref(s) or when Escape is pressed.
- `useConstant` - Returns a value computed once on the first render.
- `useCookie` - Reads and writes a browser cookie as React state.
- `useDebounce` - Returns `value` after it stops changing for `delay` ms (default 500).
- `useDebounceState` - State with a debounced copy: returns `[value, debouncedValue, setValue]`.
- `useDimensions` - Returns the `{ width, height }` of an element, updated with a ResizeObserver.
- `useDomContainer` - Returns (creating it if needed) a `<div>` with the given id appended to `document.body`.
- `useEventListener` - Adds an event listener to window (default), document, a media query or an element ref, and removes it on unmount.
- `useFileReader` - Reads `File`s as data URLs, returning name, size, formatted size, type and url for each.
- `useGeolocation` - Watches the browser geolocation: `{ data, error, isLoading }`.
- `useHover` - Returns `{ ref, isHovered }`: whether the pointer is over the element referenced by `ref`. Pass your own `targetRef` to track an element that already has a ref.
- `useInView` - Returns `{ ref, inView }`: whether the element referenced by `ref` is in the viewport.
- `useInputHandlers` - Focus/blur/change handlers for inputs that also track `isFocus`.
- `useIntersectionObserver` - Observes one or more refs with an IntersectionObserver.
- `useMediaQuery` - Returns whether a CSS media query matches, e.g. `useMediaQuery('(max-width: 480px)')`.
- `useModal` - Open state for modals, menus and tooltips: `{ containerRef, isOpen, openModal, closeModal }`.
- `useModalInContainer` - Positions a modal element on the screen or relative to a container element.
- `useModalTransition` - Open/close transition state of a modal; locks page scroll while visible.
- `useMousePosition` - Tracks the mouse position on the page and relative to an element.
- `useOnlineStatus` - Returns whether the browser is online.
- `useRenderCount` - Returns how many times the component has rendered (debugging).
- `useResizeObserver` - Observes one or more refs with a ResizeObserver.
- `useSafeDispatch` - Wraps a dispatch so it is ignored after the component unmounts.
- `useScroll` - Returns `{ ref, position }` with the `[scrollLeft, scrollTop]` of the referenced element.
- `useStateHistory` - useState that also returns the history of values: `[state, setState, history]`.
- `useToggle` - Boolean state: returns `[value, toggle, setValue]`.
- `useToggleValues` - Cycles through `values`: returns `[currentValue, toggle(index?)]`.
- `useViewport` - Returns the window `{ width, height, orientation }`, updated on resize.

Reference: [hooks.md](references/hooks.md)

### Helpers (`polpo/helpers`) and types (`polpo/types`)

- `cn` - Merges class names with `clsx` and resolves Tailwind conflicts with `tailwind-merge`.
- `formatBytes` - Formats a number of bytes, e.g. `formatBytes(1500)` -> `"1.5 KB"`.
- `formatDate` - Formats a date string as `"Mon YYYY"`, e.g. `"Jan 2024"`.
- `timeBetween` - Human readable time between two dates, e.g. `"2 years"` (end defaults to now).
- `getModalPosition` - 
- `getOppositePosition` - 
- `fixModalPosition` - 
- `getModalPositionRelativeToContainer` - Computes the position of a modal relative to a container element.
- `getModalPositionRelativeToScreen` - Computes the position styles of a modal relative to the screen.
- `toCapitalize` - Capitalizes the first word or each word of a text.

Reference: [helpers.md](references/helpers.md), [types.md](references/types.md)

### Theme

Colors, surfaces, fonts, text sizes, breakpoints and animations: [theme.md](references/theme.md)
