# Layouts

Polpo v0.1.32 - generated from the source code, do not edit.

## Flex

Flexbox container: CSS flex properties as short props (`direction`, `wrap`, `gap`, `jc`=justify-content, `ai`=align-items, `pc`=place-content...). Renders a `<section>` unless `tag` is set.

```ts
import { Flex } from 'polpo/layouts';
```

| Prop | Type | Default |
| --- | --- | --- |
| `tag` | `React.HTMLElementType` | `'section'` |
| `children` | `ReactNode` |  |
| `className` | `string` |  |
| `style` | `CSSProperties` |  |
| `direction` | `React.CSSProperties['flexDirection']` |  |
| `wrap` | `React.CSSProperties['flexWrap']` |  |
| `basis` | `string \| number \| string & {}` |  |
| `grow` | `React.CSSProperties['flexGrow']` |  |
| `shrink` | `React.CSSProperties['flexShrink']` |  |
| `flow` | `React.CSSProperties['flexFlow']` |  |
| `pc` | `React.CSSProperties['placeContent']` |  |
| `pi` | `React.CSSProperties['placeItems']` |  |
| `ps` | `React.CSSProperties['placeSelf']` |  |
| `jc` | `React.CSSProperties['justifyContent']` |  |
| `ji` | `React.CSSProperties['justifyItems']` |  |
| `js` | `React.CSSProperties['justifySelf']` |  |
| `ac` | `React.CSSProperties['alignContent']` |  |
| `ai` | `React.CSSProperties['alignItems']` |  |
| `as` | `React.CSSProperties['alignSelf']` |  |
| `gap` | `string \| number \| string & {}` |  |

## Grid

CSS grid container: grid properties as short props (`gtc`=grid-template-columns, `gtr`, `gta`, `flow`, `gap`, `jc`, `ji`, `ai`, `columnSize`=grid-auto-columns...). Renders a `<section>` unless `tag` is set.

```ts
import { Grid } from 'polpo/layouts';
```

| Prop | Type | Default |
| --- | --- | --- |
| `tag` | `React.HTMLElementType` | `'section'` |
| `flow` | `React.CSSProperties['gridAutoFlow']` |  |
| `columnSize` | `string \| number \| string & {}` |  |
| `rowSize` | `string \| number \| string & {}` |  |
| `column` | `React.CSSProperties['gridColumn']` |  |
| `row` | `React.CSSProperties['gridRow']` |  |
| `pc` | `React.CSSProperties['placeContent']` |  |
| `pi` | `React.CSSProperties['placeItems']` |  |
| `ps` | `React.CSSProperties['placeSelf']` |  |
| `jc` | `React.CSSProperties['justifyContent']` |  |
| `ji` | `React.CSSProperties['justifyItems']` |  |
| `js` | `React.CSSProperties['justifySelf']` |  |
| `ac` | `React.CSSProperties['alignContent']` |  |
| `ai` | `React.CSSProperties['alignItems']` |  |
| `as` | `React.CSSProperties['alignSelf']` |  |
| `gtc` | `string \| number \| string & {}` |  |
| `gtr` | `string \| number \| string & {}` |  |
| `gta` | `React.CSSProperties['gridTemplateAreas']` |  |
| `gt` | `React.CSSProperties['gridTemplate']` |  |
| `gap` | `string \| number \| string & {}` |  |
| `ref` | `React.Ref<HTMLElement>` |  |

Also accepts the native attributes of `HTMLAttributes`.
