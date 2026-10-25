# Turborepo starter

## Polpo for AI agents

This repository is also a [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces) that teaches agents to build UIs with Polpo:

```text
/plugin install polpo --marketplace juanmsl/polpo-monorepo
```

The plugin lives in `packages/polpo/plugin/` and is regenerated on every polpo release (see [Releasing](#releasing)). See [Using Polpo with AI agents](./packages/polpo/README.md#using-polpo-with-ai-agents) for every option (`npx polpo init-ai`, Claude.ai, Cursor, `llms.txt`).

## Releasing

The packages of `packages/` (`polpo`, `polpo-tailwind-config`, `polpo-http-client`, `polpo-eslint-config`, `polpo-typescript-config`) are published to npm by two GitHub Actions workflows. The logic lives in `scripts/release.mjs`.

1. **Release** (`.github/workflows/release.yml`, run manually from the **Actions** tab): choose `patch`, `minor` or `major` and tick the packages to release. It runs on `main` and:
   - bumps their versions;
   - runs lint, type check and build;
   - when `polpo` is released, regenerates the Claude Code plugin (`packages/polpo/plugin/`);
   - opens a **release PR** with those changes.
2. **Publish** (`.github/workflows/publish.yml`) runs when the release PR is merged into `main`. It publishes to npm every package whose version is not on npm yet:
   - in dependency order (e.g. `polpo-tailwind-config` before `polpo`);
   - with `pnpm publish`, so `workspace:*` is replaced with real versions;
   - with npm trusted publishing (OIDC) and provenance.

   Then it creates the `<name>@<version>` tags and the GitHub Releases. It is idempotent: if it fails, re-run it and it only publishes what is missing. You can also run it manually with **dry run** to check what would be published.

Try it locally without publishing anything:

```sh
node scripts/release.mjs bump --type patch --packages polpo   # remember to revert the version change
node scripts/release.mjs publish --dry-run
```

### One-time setup

- **npm**: for each package, open `https://www.npmjs.com/package/<name>/access`. Under **Trusted Publisher** choose **GitHub Actions** and fill in:
  - Organization or user: `juanmsl`
  - Repository: `polpo-monorepo`
  - Workflow filename: `publish.yml`
  - Environment: empty
  - Allowed actions: enable **publish**, since only staged publishing is allowed by default

  The first publish must happen within 2 days of saving the configuration, or it expires. Then, in **Publishing access**, choose **Require two-factor authentication and disallow tokens**.
- **GitHub → Settings → Actions → General → Workflow permissions**: enable **Allow GitHub Actions to create and approve pull requests**, so the Release workflow can open the PR.
- **GitHub → Settings → Rules → Rulesets** (recommended): add a ruleset for `main` that requires a pull request and blocks force pushes. Both workflows keep working: they never push to `main`, they only push branches and tags.

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@polpo/ui`: a stub React component library shared by both `web` and `docs` applications
- `polpo-eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `polpo-typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
