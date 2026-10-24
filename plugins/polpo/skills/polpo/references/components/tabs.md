# Tabs

Polpo v0.1.32 - generated from the source code, do not edit.

## Tabs

Stateful tabs. Compose `Tabs.TabList` with `Tabs.Tab` headers and `Tabs.TabPanel` contents, matched by `id`.

```ts
import { Tabs } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `defaultOpenTab` **(required)** | `string` |  |
| `onChange` | `(id: string) => void` |  |

### Tabs.Tab

| Prop | Type | Default |
| --- | --- | --- |
| `id` **(required)** | `string` |  |
| `children` **(required)** | `ReactNode` |  |
| `className` | `string \| (isActive: boolean) => string` | `''` |
| `isHidden` | `boolean` | `false` |
| `style` | `CSSProperties` | `{}` |
| `onClick` | `(e: MouseEvent<HTMLSpanElement, MouseEvent>) => void` |  |
| `ref` | `RefObject<HTMLSpanElement \| null>` |  |

### Tabs.TabPanel

| Prop | Type | Default |
| --- | --- | --- |
| `id` **(required)** | `string` |  |
| `children` **(required)** | `ReactNode` |  |

### Tabs.TabList

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` |  |
| `className` | `string` |  |
| `style` | `CSSProperties` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` |  |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` |  |
| `size` | `'small' \| 'large' \| 'regular'` |  |
| `variant` | `'solid' \| 'flat' \| 'line' \| 'ghost'` |  |
| `direction` | `'horizontal' \| 'vertical'` |  |
| `tabsClassName` | `string \| (isActive: boolean) => string` |  |
| `variantLineHeight` | `number` |  |
| `selectorClassName` | `string` |  |
| `tabs` | `(Omit<TabProps, 'children' \| 'onClick'> & { label: ReactNode; })[]` |  |

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'solid'`.

### TabListVariant

Visual variants of a tab list.

`import { TabListVariant } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `SOLID` | `'solid'` |
| `GHOST` | `'ghost'` |
| `FLAT` | `'flat'` |
| `LINE` | `'line'` |

## Types

### TabProps

```ts
export type TabProps = {
  id: string;
  children: React.ReactNode;
  className?: string | ((isActive: boolean) => string);
  isHidden?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  ref?: React.RefObject<HTMLSpanElement | null>;
};
```

## Examples

### Storybook: Components/Tabs/Tab List

Live demo: https://ui.juanmsl.com/?path=/story/components-tabs-tab-list--default

```tsx
import { Typography, Tabs, SizeTypes, RadiusTypes, TabListVariant, ColorTypes } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Default usage (`args`):

```tsx
<Tabs.TabList tabs={[
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About us' },
      { id: 'products', label: 'Products' },
      { id: 'categories', label: 'Categories' },
      { id: 'services', label: 'Services' },
    ]} />
```

**Vertical** (args: `{ direction: 'vertical', }`)

**Variants** (args: `{}`)

```tsx
args => {
    return (
      <Grid gap='1em'>
        <Tabs.TabList {...args} variant='solid' />
        <Tabs.TabList {...args} variant='ghost' />
        <Tabs.TabList {...args} variant='flat' />
        <Tabs.TabList {...args} variant='line' />
      </Grid>
    );
  }
```

### Storybook: Components/Tabs/Custom Tabs

Live demo: https://ui.juanmsl.com/?path=/story/components-tabs-custom-tabs--default

```tsx
import { Button, Tabs, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useState } from 'react';
```

Default usage (`args`):

```tsx
<Tabs />
```
