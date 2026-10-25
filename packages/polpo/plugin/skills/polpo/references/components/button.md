# Button

Polpo v0.1.33 - generated from the source code, do not edit.

## Button

Action button with variants (solid, flat, outlined, text), theme colors, sizes, radius, loading state and ripple effect. Accepts every native `<button>` attribute.

```ts
import { Button } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'highlight' \| 'active' \| 'warning' \| 'alert' \| 'info'` | `ColorTypes.DEFAULT` |
| `variant` | `'solid' \| 'flat' \| 'outlined' \| 'text'` | `VariantTypes.SOLID` |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | `RadiusTypes.MEDIUM` |
| `size` | `'small' \| 'large' \| 'regular'` | `SizeTypes.REGULAR` |
| `noWrap` | `boolean` | `false` |
| `ref` | `React.Ref<HTMLButtonElement>` |  |
| `forIcon` | `boolean` | `false` |
| `isLoading` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |

Also accepts the native attributes of `ButtonHTMLAttributes`, `HTMLAttributes`.

## Types

### ButtonProps

```ts
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: `${ColorTypes}`;
  variant?: `${VariantTypes}`;
  radius?: `${RadiusTypes}`;
  size?: `${SizeTypes}`;
  noWrap?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  forIcon?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}
```

## Examples

### Storybook: Components/Buttons/Button

Live demo: https://ui.juanmsl.com/?path=/story/components-buttons-button--default

```tsx
import { Button, ColorTypes, RadiusTypes, SizeTypes, VariantTypes } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Grid ji='center' gtc='300px'>
        <Story />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<Button fullWidth size={SizeTypes.REGULAR} radius={RadiusTypes.MEDIUM} color={ColorTypes.PRIMARY} variant={VariantTypes.SOLID} disabled={false} isLoading={false}>Button</Button>
```

**Variants**

```tsx
args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(VariantTypes).map(variant => (
        <Button {...args} variant={variant} key={variant}>
          {variant}
        </Button>
      ))}
    </Grid>
  )
```

**Sizes**

```tsx
args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(SizeTypes).map(size => (
        <Button {...args} size={size} key={size}>
          {size}
        </Button>
      ))}
    </Grid>
  )
```

**Colors**

```tsx
args => (
    <Grid gtc='300px' ji='center' gap='1em' ai='center'>
      {Object.values(ColorTypes).map(color => (
        <Button {...args} color={color} key={color}>
          {color}
        </Button>
      ))}
    </Grid>
  )
```
