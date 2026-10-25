# Accordion, AccordionItem

Polpo v0.1.33 - generated from the source code, do not edit.

## Accordion

Container of collapsible `AccordionItem`s, separated by lines. Supports several open items (`multiple`) and initially opened items.

```ts
import { Accordion } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` **(required)** | `ReactNode` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `noSeparators` | `boolean` |  |
| `multiple` | `boolean` |  |
| `defaultOpened` | `string \| string[]` | `[]` |

## AccordionItem

Collapsible section of an `Accordion`: a header (`title`/`subtitle`, or fully custom `content`) that toggles its `children`.

```ts
import { AccordionItem } from 'polpo/components';
```

| Prop | Type | Default |
| --- | --- | --- |
| `icon` | `IconType` | `FaCaretLeft` |
| `children` **(required)** | `ReactNode` |  |
| `startContent` | `ReactNode \| NodeFunction` |  |
| `endContent` | `ReactNode \| NodeFunction` |  |
| `className` | `string` | `''` |
| `style` | `CSSProperties` | `{}` |
| `classNames` | `{ header?: string; headerContent?: string; title?: string; subtitle?: string; toggleIcon?: string; body?: string; }` | `{}` |
| `title` | `ReactNode \| NodeFunction` |  |
| `subtitle` | `ReactNode \| NodeFunction` |  |
| `content` | `ReactNode \| NodeFunction` |  |

## Hooks and functions

### useAccordionItem

Returns `[isOpen, toggle]` for the accordion item with the given id. Must be used inside an `Accordion`.

```ts
import { useAccordionItem } from 'polpo/components';
```

```ts
useAccordionItem: (id: string) => [boolean, () => void]
```

## Examples

### Storybook: Components/Accordion/AccordionItem

Live demo: https://ui.juanmsl.com/?path=/story/components-accordion-accordionitem--default

```tsx
import { Line, Typography, Accordion, AccordionItem } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { PiAirplaneInFlight } from 'react-icons/pi';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Grid style={{ width: '500px' }}>
        <Story />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<AccordionItem />
```

**Default** (args: `{ title: 'Accordion Item', subtitle: 'Default with Title and Subtitle', }`)

**Left Content**

```tsx
// args
{
    title: 'Accordion Item',
    subtitle: 'Custom left content',
    startContent: isOpen => (
      <Grid
        pc='center'
        style={{
          borderRadius: '8px',
          color: `${isOpen ? 'tomato' : 'currentColor'}`,
          border: '1px solid',
          filter: `grayscale(${isOpen ? 0 : 1})`,
          width: '40px',
          height: '40px',
        }}
      >
        <PiAirplaneInFlight />
      </Grid>
    ),
  }
```

**Custom Content**

```tsx
// args
{
    content: isOpen => (
      <Grid flow='column' gap='1em' ai='center' gtc='auto 1fr auto'>
        <section>
          <Typography variant='body' weight='bold' noPadding style={{ color: `${isOpen ? 'tomato' : 'currentColor'}` }}>
            Accordion item
          </Typography>
          <Typography variant='small'>Custom content</Typography>
        </section>
        <Line />
        <Grid
          pc='center'
          style={{
            borderRadius: '8px',
            color: `${isOpen ? 'tomato' : 'currentColor'}`,
            border: '1px solid',
            filter: `grayscale(${isOpen ? 0 : 1})`,
            width: '40px',
            height: '40px',
          }}
        >
          {isOpen ? <FaRegEye /> : <FaRegEyeSlash />}
        </Grid>
      </Grid>
    ),
  }
```

**Right Content**

```tsx
// args
{
    title: 'Item',
    subtitle: 'Subtitle',
    endContent: isOpen => (
      <section>
        <Typography variant='small'>{isOpen ? 'Close' : 'Open'}</Typography>
      </section>
    ),
  }
```

### Storybook: Components/Accordion/Accordion

Live demo: https://ui.juanmsl.com/?path=/story/components-accordion-accordion--default

```tsx
import { Typography, Accordion, AccordionItem } from 'polpo/components';
import { Grid } from 'polpo/layouts';
```

Every example is wrapped by this decorator, where `Story` renders the example with the given `args` (use it as a reference for the state the component needs):

```tsx
[
    Story => (
      <Grid style={{ width: '500px' }}>
        <Story />
      </Grid>
    ),
  ]
```

Default usage (`args`):

```tsx
<Accordion noSeparators={false} />
```

**Default**

```tsx
// args
{
    children: Array.from(new Array(10)).map((_, key) => (
      <AccordionItem {...AccordionItemStories.args} key={key}>
        <Typography variant='header4'>Title {key + 1}</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </AccordionItem>
    )),
  }
```

**FAQ**

```tsx
// args
{
    noSeparators: true,
    style: {
      gap: '1em',
    },
    children: Array.from(new Array(10)).map((_, key) => (
      <AccordionItem
        key={key}
        title={`Is there a question #${key + 1}?`}
        style={{
          border: '1px solid',
          borderRadius: '1em',
          overflow: 'hidden',
          padding: '0 1em',
        }}
      >
        <Typography noPadding>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda atque blanditiis commodi delectus
          deleniti distinctio excepturi explicabo facere fuga laboriosam natus nihil pariatur perspiciatis quaerat qui
          recusandae rerum sed, unde voluptatem.
        </Typography>
      </AccordionItem>
    )),
  }
```
