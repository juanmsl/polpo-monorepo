# Theme tokens

Defined by `polpo-tailwind-config/styles` as Tailwind v4 `@theme` variables, so every token is both a CSS variable (`var(--color-primary-500)`) and a Tailwind utility (`bg-primary-500`, `text-primary-500`, `border-primary-500`...).
Override them in your own `@theme { ... }` block after the imports to customize the brand.

## Colors

Each base color generates a scale `-50` (lightest) ... `-500` (base) ... `-900` (darkest) and a `-foreground` color for text on top of it, e.g. `bg-primary-400 text-primary-foreground`. Components accept these names in their `color` prop.

| Color | Default | Utilities |
| --- | --- | --- |
| `--color-active` | `hsl(147 100% 35%)` | `bg-active-500`, `text-active-700` |
| `--color-alert` | `hsl(359 90% 62%)` | `bg-alert-500`, `text-alert-700` |
| `--color-warning` | `hsl(38 100% 50%)` | `bg-warning-500`, `text-warning-700` |
| `--color-info` | `hsl(210 100% 51%)` | `bg-info-500`, `text-info-700` |
| `--color-primary` | `hsl(174 53% 28%)` | `bg-primary-500`, `text-primary-700` |
| `--color-secondary` | `hsl(79 52% 70%)` | `bg-secondary-500`, `text-secondary-700` |
| `--color-tertiary` | `hsl(181 64% 57%)` | `bg-tertiary-500`, `text-tertiary-700` |
| `--color-highlight` | `hsl(205 100% 68%)` | `bg-highlight-500`, `text-highlight-700` |
| `--color-accent` | `hsl(285 26% 70%)` | `bg-accent-500`, `text-accent-700` |

## Surfaces and text

| Token | Default | Utility |
| --- | --- | --- |
| `--color-background` | `var(--color-white)` | `bg-background` |
| `--color-background-paper` | `var(--color-gray-50)` | `bg-background-paper` |
| `--color-background-disabled` | `var(--color-gray-100)` | `bg-background-disabled` |
| `--color-foreground` | `hsl(32 54% 13%)` | `text-foreground` |
| `--color-foreground-disabled` | `var(--color-gray-900)` | `text-foreground-disabled` |
| `--color-border` | `hsl(300 18% 79%)` | `border-border` |

## Typography

| Token | Default | Utility |
| --- | --- | --- |
| `--font-main` | `'Montserrat Alternates', 'Segoe UI', sans-serif` | `font-main` |
| `--font-title` | `'Josefin Sans', var(--font-main)` | `font-title` |
| `--font-brand` | `'Roboto', var(--font-title)` | `font-brand` |
| `--font-code` | `ui-monospace, Consolas, monospace` | `font-code` |

| Text size | Default | Utility |
| --- | --- | --- |
| `--text-small` | `0.75rem` | `text-small` |
| `--text-label` | `0.875rem` | `text-label` |
| `--text-body` | `1rem` | `text-body` |
| `--text-header4` | `clamp(1.2rem, 3vw, 1.5rem)` | `text-header4` |
| `--text-header3` | `clamp(1.5rem, 4vw, 2rem)` | `text-header3` |
| `--text-header2` | `clamp(2rem, 6vw, 3rem)` | `text-header2` |
| `--text-header1` | `clamp(3rem, 8vw, 4rem)` | `text-header1` |
| `--text-hero` | `clamp(4rem, 10vw, 5.5rem)` | `text-hero` |

Prefer `<Typography variant="header2">` over the raw utilities for text.

## Breakpoints

| Token | Value | Variant |
| --- | --- | --- |
| `--breakpoint-2xs` | `360px` | `2xs:` |
| `--breakpoint-xs` | `480px` | `xs:` |
| `--breakpoint-sm` | `640px` | `sm:` |
| `--breakpoint-md` | `768px` | `md:` |
| `--breakpoint-lg` | `1024px` | `lg:` |
| `--breakpoint-xl` | `1280px` | `xl:` |
| `--breakpoint-2xl` | `1440px` | `2xl:` |
| `--breakpoint-3xl` | `1920px` | `3xl:` |
| `--breakpoint-4xl` | `2560px` | `4xl:` |

## Other tokens

| Token | Default |
| --- | --- |
| `--radius` | `0.625rem` |
| `--spacing` | `0.25rem` |

## Animations

Keyframes available globally: `fadeIn`, `spin`, `slideIn-left`, `slideOut-left`, `slideIn-right`, `slideOut-right`, `slideIn-top`, `slideOut-top`, `slideIn-bottom`, `slideOut-bottom`, `bounceIn`, `bounceOut`, `headShake`, `pulse`, `fadeInDown`, `fadeOutDown`, `fadeInUp`, `fadeOutUp`, `fadeInLeft`, `fadeOutLeft`, `fadeInRight`, `fadeOutRight`. Use them with `animate-[fadeIn_300ms_ease]` or the `animation` CSS property.
