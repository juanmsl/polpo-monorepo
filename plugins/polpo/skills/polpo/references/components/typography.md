# Typography

Polpo v0.1.32 - generated from the source code, do not edit.

## Typography

Text component for every piece of text: variants `hero`, `header1`-`header4`, `body`, `label`, `label-form`, `small`; weight, color, alignment, line clamping (`nowrap`) and custom element (`as`).

```ts
import { Typography } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `'small' \| 'label' \| 'body' \| 'hero' \| 'header1' \| 'header2' \| 'header3' \| 'header4' \| 'label-form'` | `TypographyVariant.BODY` |
| `nowrap` | `number \| boolean` | `false` |
| `as` | `React.HTMLElementType` |  |
| `weight` | `'regular' \| 'light' \| 'bold'` |  |
| `noPadding` | `boolean` | `false` |
| `htmlFor` | `string` |  |
| `align` | `React.CSSProperties['textAlign']` |  |
| `family` | `'primary' \| 'code'` | `'primary'` |
| `recommendedWidth` | `boolean` | `false` |
| `ref` | `RefObject<HTMLElement>` |  |

Also accepts the native attributes of `HTMLAttributes`.

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'primary'`.

### TypographyColors

Theme colors available for `Typography`.

`import { TypographyColors } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `PRIMARY` | `'primary'` |
| `SECONDARY` | `'secondary'` |
| `TERTIARY` | `'tertiary'` |
| `ACTIVE` | `'active'` |
| `WARNING` | `'warning'` |
| `ALERT` | `'alert'` |
| `INFO` | `'info'` |

### TypographyVariant

Typography variants and the HTML element each one renders by default.

`import { TypographyVariant } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `HERO` | `'hero'` |
| `HEADER1` | `'header1'` |
| `HEADER2` | `'header2'` |
| `HEADER3` | `'header3'` |
| `HEADER4` | `'header4'` |
| `BODY` | `'body'` |
| `LABEL` | `'label'` |
| `LABEL_FORM` | `'label-form'` |
| `SMALL` | `'small'` |

### TypographyWeight

Font weights available for `Typography`.

`import { TypographyWeight } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `LIGHT` | `'light'` |
| `REGULAR` | `'regular'` |
| `BOLD` | `'bold'` |

## Types

### TypographyProps

```ts
export type TypographyProps = React.HTMLAttributes<HTMLElement | HTMLLabelElement> & {
  variant?: `${TypographyVariant}`;
  nowrap?: boolean | number;
  as?: React.HTMLElementType;
  weight?: `${TypographyWeight}`;
  children: React.ReactNode;
  noPadding?: boolean;
  htmlFor?: string;
  align?: React.CSSProperties['textAlign'];
  family?: 'primary' | 'code';
  recommendedWidth?: boolean;
  color?: `${TypographyColors}`;
  ref?: React.RefObject<HTMLElement>;
  style?: React.CSSProperties;
};
```

## Constants

- `TypographyVariantsElements: Record<TypographyVariant, HTMLElementType>`
- `TypographyVariantsClassNames: Record<TypographyVariant, string>`

## Examples

### Storybook: Components/Typography

Live demo: https://ui.juanmsl.com/?path=/story/components-typography--default

```tsx
import { ColorTypes, Typography, TypographyVariant, TypographyWeight } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Default usage (`args`):

```tsx
<Typography>Hello world</Typography>
```

**Paragraph** (args: `{ weight: 'light', }`)

```tsx
args => (
    <Grid gtc='500px'>
      <Typography {...args} variant='body'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at deserunt, dolorum eum necessitatibus, nihil
        nobis placeat qui quidem repellat, temporibus totam voluptates. Accusamus amet aspernatur atque dolorum eligendi
        est fugiat, illum labore, nam nobis obcaecati perferendis quod recusandae sed?
      </Typography>
    </Grid>
  )
```

**Variants** (args: `{ weight: 'light', }`)

```tsx
args => (
    <Grid>
      <Typography {...args} variant='hero'>
        Hero
      </Typography>
      <Typography {...args} variant='header1'>
        Header1
      </Typography>
      <Typography {...args} variant='header2'>
        Header2
      </Typography>
      <Typography {...args} variant='header3'>
        Header3
      </Typography>
      <Typography {...args} variant='header4'>
        Header4
      </Typography>
      <Typography {...args} variant='body'>
        Body
      </Typography>
      <Typography {...args} variant='label'>
        Label
      </Typography>
      <Typography {...args} variant='small'>
        Small
      </Typography>
    </Grid>
  )
```
