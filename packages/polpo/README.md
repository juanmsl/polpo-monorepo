
# Polpo

A lightweight and customizable UI component library designed for React applications. This library provides a set of reusable components to speed up development and maintain a consistent user interface across your projects.

[![npm version](https://badge.fury.io/js/polpo.svg)](https://www.npmjs.com/package/polpo)

## Components

Please refer to the [Storybook](https://ui.juanmsl.com) for a comprehensive list of components and their usage.

## Documentation

Documentation page under construction...

## Features

- Easy to use and integrate with React projects
- Fully customizable with minimal configuration
- Modern UI components for building responsive and accessible interfaces
- Lightweight and fast
- Built with TypeScript for type safety and autocompletion

## Installation

Install Polpo with its theme (`polpo-tailwind-config`) and its peer dependencies: `react` and `react-dom` (19), `tailwindcss` (v4), `tailwind-merge` and `react-hook-form` (7.52 or later, used by the form components). Polpo uses the versions installed in your project.

You can install the package using your preferred package manager:

```bash
npm install polpo polpo-tailwind-config tailwindcss tailwind-merge react-hook-form
```
```bash
yarn add polpo polpo-tailwind-config tailwindcss tailwind-merge react-hook-form
```
```bash
pnpm add polpo polpo-tailwind-config tailwindcss tailwind-merge react-hook-form
```

## Usage

You need to configure tailwind v4 and then in your `.css` file just import

```css
@import "tailwindcss";
@import "polpo-tailwind-config/styles";
@import "polpo/components.css";
```

## Using Polpo with AI agents

Polpo ships instructions for AI coding agents (Claude Code, Claude.ai, Cursor, Codex, GitHub Copilot...). With them, when you ask an agent to build a React UI it uses Polpo components, layouts, hooks and theme tokens instead of shadcn/ui, MUI or other UI kits, and it asks you before adding another library when Polpo is missing something.

The instructions are generated from the source code on every release: every component, prop, default value, sub-component and Storybook example, plus the setup, forms and theming rules.

### Option 1: install them in your project (recommended)

```bash
npm install polpo polpo-tailwind-config
npx polpo init-ai
```

`init-ai` detects the agents you already use in the project and installs the matching files (if it finds none, it installs the Claude Code skill and `AGENTS.md`). You can also pick them:

| Option | Agent | Installs |
| --- | --- | --- |
| `--claude` | Claude Code | Skill in `.claude/skills/polpo/` |
| `--cursor` | Cursor | Rule in `.cursor/rules/polpo.mdc` |
| `--codex` | Codex, Copilot coding agent, Gemini CLI, Cursor and any agent that reads `AGENTS.md` | Polpo section in `AGENTS.md` |
| `--copilot` | GitHub Copilot | Polpo section in `.github/copilot-instructions.md` |
| `--all` | All of the above | |
| `--global` | Claude Code, every project | Skill in `~/.claude/skills/polpo/` |

```bash
npx polpo init-ai --claude --cursor
```

- Commit the generated files so everyone on the team (and their agents) gets them.
- Existing content of `AGENTS.md` and `.github/copilot-instructions.md` is kept: Polpo only manages the block between `<!-- polpo:start -->` and `<!-- polpo:end -->`.
- Run `npx polpo init-ai` again after upgrading `polpo` to refresh the instructions for the new version.

### Option 2: Claude Code plugin

Install the skill once for all your projects from the plugin marketplace of this repository:

```text
/plugin marketplace add juanmsl/polpo-monorepo
/plugin install polpo@polpo
```

On Claude Code 2.1.275 or later you can do it in one step: `/plugin install polpo --marketplace juanmsl/polpo-monorepo`. Get new versions with `/plugin marketplace update polpo`.

### Option 3: Claude.ai

Download [polpo-skill.zip](https://ui.juanmsl.com/polpo-skill.zip) (it is also in `node_modules/polpo/dist/ai/polpo-skill.zip`) and upload it in Claude.ai under **Settings → Capabilities → Skills**.

### Option 4: any agent, with llms.txt

The documentation for agents is also published on the docs site, following the [llms.txt](https://llmstxt.org) convention:

| URL | Content |
| --- | --- |
| https://ui.juanmsl.com/llms.txt | Index: guide, theme and one link per component |
| https://ui.juanmsl.com/llms-full.txt | All the documentation in a single file |
| https://ui.juanmsl.com/llms/guide.md | Rules for agents, setup, forms, patterns and catalog |
| `https://ui.juanmsl.com/llms/components/<name>.md` | Reference of one component, e.g. [button.md](https://ui.juanmsl.com/llms/components/button.md) |

Use it with agents that can browse the web or index docs:

- **In a prompt**: _"Build the settings page with the Polpo UI library (npm `polpo`). Read https://ui.juanmsl.com/llms.txt first and only use Polpo components."_
- **Cursor**: add `https://ui.juanmsl.com/llms-full.txt` in **Settings → Indexing & Docs → Add Doc**, then mention it with `@Docs`.
- **Chat assistants without web access**: attach or paste `llms-full.txt`.

### Maintaining the AI docs

The AI docs are generated by `pnpm ai:generate` (part of `pnpm build`) from:

- `ai/guide.md`: hand-written rules, setup and patterns;
- the JSDoc comment of each exported component, hook and helper (the one-line description in the catalog);
- the TypeScript types (props, defaults and sub-components) and the Storybook stories of `apps/polpo-docs`;
- the theme of `polpo-tailwind-config`.

The build writes the skill, `rules.md` and the llms files to `dist/ai/`. The Claude Code plugin in `plugin/` is only regenerated on release: the **Release** workflow runs `pnpm ai:sync-plugin` and commits it in the release PR, so the marketplace always serves the version published on npm. See [Releasing](../../README.md#releasing).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Author

Developed by [Juan Manuel Sánchez Lozano](https://juanmsl.com).
