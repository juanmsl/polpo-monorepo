# polpo-tailwind-config

The Tailwind CSS v4 theme of [Polpo UI](https://ui.juanmsl.com): colors with generated scales, surfaces, fonts, a fluid type scale, breakpoints, base styles and animations. It is required by the [`polpo`](https://www.npmjs.com/package/polpo) component library, and it can also be used on its own in any Tailwind v4 project.

[![npm version](https://badge.fury.io/js/polpo-tailwind-config.svg)](https://www.npmjs.com/package/polpo-tailwind-config)

## Installation

```bash
npm install polpo-tailwind-config tailwindcss
```

```bash
pnpm add polpo-tailwind-config tailwindcss
```

It requires **Tailwind CSS v4**, configured with `@tailwindcss/vite`, `@tailwindcss/postcss` or the Tailwind CLI.

## Usage

Import it in your global CSS file, right after Tailwind:

```css
@import "tailwindcss";
@import "polpo-tailwind-config/styles";

/* With the polpo components */
@import "polpo/components.css";
```

Every token is defined as a Tailwind `@theme` variable, so it is available both as a utility class and as a CSS variable:

```html
<section class="bg-background-paper text-foreground border border-border rounded-lg p-4">
  <h2 class="font-title text-header3">Title</h2>
  <button class="bg-primary-400 text-primary-foreground hover:bg-primary-300">Save</button>
</section>
```

```css
.card {
  border-color: var(--color-primary-500);
}
```

## What it includes

### Colors

There are nine base colors: `primary`, `secondary`, `tertiary`, `accent`, `highlight`, `active`, `alert`, `warning` and `info`. Each one generates:

- a scale from `-50` (lightest) to `-900` (darkest), where `-500` is the base color;
- a `-foreground` color for text on top of it.

Examples: `bg-info-100`, `text-alert-500`, `border-active-700`, `text-primary-foreground`.

### Surfaces and text

| Token | Utility | Use |
| --- | --- | --- |
| `--color-background` | `bg-background` | Page background |
| `--color-background-paper` | `bg-background-paper` | Cards and panels |
| `--color-background-disabled` | `bg-background-disabled` | Disabled controls |
| `--color-foreground` | `text-foreground` | Main text color |
| `--color-foreground-disabled` | `text-foreground-disabled` | Disabled text |
| `--color-border` | `border-border` | Borders and dividers |

### Typography

- **Fonts:** `font-main` (Montserrat Alternates), `font-title` (Josefin Sans), `font-brand` (Roboto) and `font-code` (monospace). The fonts are not bundled: load them (for example from Google Fonts) or override the variables.
- **Fluid text sizes:** `text-small`, `text-label`, `text-body`, `text-header4`, `text-header3`, `text-header2`, `text-header1` and `text-hero`. Headings scale with the viewport using `clamp()`.

### Breakpoints

| Variant | Min width |
| --- | --- |
| `2xs:` | 360px |
| `xs:` | 480px |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1440px |
| `3xl:` | 1920px |
| `4xl:` | 2560px |

### Base styles

- `:root` uses `bg-background`, `text-foreground`, `font-main` and `text-body`.
- `h1`–`h4` use the title font and the header sizes.
- `p`, `label` and `small` get vertical margins.
- Inputs and textareas are reset.
- `box-sizing: border-box` everywhere, smooth scrolling and themed scrollbars.

### Animations

These keyframes are available globally:

- `fadeIn`, `spin`, `pulse`, `headShake`;
- `bounceIn`, `bounceOut`;
- `slideIn-*` and `slideOut-*` (`left`, `right`, `top`, `bottom`);
- `fadeInUp`, `fadeOutUp`, `fadeInDown`, `fadeOutDown`, `fadeInLeft`, `fadeOutLeft`, `fadeInRight`, `fadeOutRight`.

Use them with arbitrary values such as `animate-[fadeIn_300ms_ease]`, or with the `animation` CSS property.

The full list of tokens with their default values is in the [theme reference](https://ui.juanmsl.com/llms/theme.md).

## Customization

Override any variable in your own `@theme` block after the import. Changing a base color regenerates its whole scale and its foreground:

```css
@import "tailwindcss";
@import "polpo-tailwind-config/styles";

@theme {
  --color-primary: #b91345;
  --color-secondary: #450b7c;
  --font-main: 'Inter', 'Segoe UI', sans-serif;
  --radius: 0.5rem;
}
```

The intensity of the scales is controlled by the `--scale-step` variable on `:root` (default `20%`).

## License

MIT

## Author

Developed by [Juan Manuel Sánchez Lozano](https://juanmsl.com). Part of the [Polpo monorepo](https://github.com/juanmsl/polpo-monorepo).
