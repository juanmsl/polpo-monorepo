# Line

Polpo v0.1.32 - generated from the source code, do not edit.

## Line

Horizontal or vertical divider (solid, dotted or dashed).

```ts
import { Line } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `LineOrientation.HORIZONTAL` |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `color` | `string` | `'currentColor'` |
| `lineStyle` | `'solid' \| 'dotted' \| 'dashed'` | `LineStyle.SOLID` |
| `size` | `number` | `1` |
| `spacing` | `number` | `1` |
| `dashedSize` | `number` | `1` |

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'vertical'`.

### LineOrientation

Orientation of a `Line`.

`import { LineOrientation } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `VERTICAL` | `'vertical'` |
| `HORIZONTAL` | `'horizontal'` |

### LineStyle

Stroke style of a `Line`.

`import { LineStyle } from 'polpo/components';`

| Member | Value |
| --- | --- |
| `SOLID` | `'solid'` |
| `DOTTED` | `'dotted'` |
| `DASHED` | `'dashed'` |

## Examples

### Storybook: Components/Line

Live demo: https://ui.juanmsl.com/?path=/story/components-line--solid

```tsx
import { Line, LineOrientation, LineStyle, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    (Story, { args }) => (
      <Grid ac='start' gtr='auto 1fr auto auto' gap='0.5em' style={{ width: '300px', height: '300px' }}>
        <Typography variant='small' noPadding>
          Vertical
        </Typography>
        <Story args={{ ...args, orientation: LineOrientation.VERTICAL }} />
        <Typography variant='small' noPadding>
          Horizontal
        </Typography>
        <Story args={{ ...args, orientation: LineOrientation.HORIZONTAL }} />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<Line color='currentColor' />
```

**Solid** (args: `{ lineStyle: LineStyle.SOLID, size: 1, }`)

**Dotted** (args: `{ lineStyle: LineStyle.DOTTED, size: 2, spacing: 5, }`)

**Dashed** (args: `{ lineStyle: LineStyle.DASHED, size: 2, dashedSize: 10, spacing: 15, }`)
