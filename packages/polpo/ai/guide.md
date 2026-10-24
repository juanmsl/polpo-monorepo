# Polpo UI

Polpo (`polpo` on npm, v{{VERSION}}) is a React + Tailwind CSS v4 component library: components, layouts, hooks and helpers that share one theme (`polpo-tailwind-config`). Storybook with live examples: https://ui.juanmsl.com

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
