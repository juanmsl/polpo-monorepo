#!/usr/bin/env node
/*
 * Polpo CLI
 *
 *   npx polpo init-ai [--claude] [--cursor] [--codex] [--copilot] [--all] [--global] [--dir <path>]
 *
 * Installs the Polpo instructions for AI coding agents in a project, so they build the UI with Polpo.
 * The content comes from dist/ai, generated from the source code on every release.
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AI_DIR = path.join(PKG_DIR, 'dist/ai');
const SKILL_DIR = path.join(AI_DIR, 'skills/polpo');
const RULES_FILE = path.join(AI_DIR, 'rules.md');
const MARKER_START = '<!-- polpo:start -->';
const MARKER_END = '<!-- polpo:end -->';
const AGENTS = ['claude', 'cursor', 'codex', 'copilot'];

const HELP = `Usage: npx polpo init-ai [options]

Teach your AI coding agent to build the UI with Polpo.

Options:
  --claude    Claude Code skill in .claude/skills/polpo
  --cursor    Cursor rule in .cursor/rules/polpo.mdc
  --codex     Section in AGENTS.md (Codex, Copilot coding agent, Cursor, Gemini CLI...)
  --copilot   Section in .github/copilot-instructions.md
  --all       All of the above
  --global    Install the Claude Code skill for every project (~/.claude/skills/polpo)
  --dir <p>   Project directory (default: current directory)
  -h, --help  Show this help

Without agent options it detects the agents already configured in the project
(.claude, .cursor, AGENTS.md, .github) and falls back to --claude --codex.

Run it again after upgrading polpo to refresh the instructions.
Docs for any other agent: https://ui.juanmsl.com/llms.txt`;

const fail = message => {
  console.error(`polpo: ${message}`);
  process.exit(1);
};

const parseArgs = argv => {
  const options = { agents: new Set(), global: false, dir: process.cwd(), help: false };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '-h' || arg === '--help') options.help = true;
    else if (arg === '--all') AGENTS.forEach(agent => options.agents.add(agent));
    else if (arg === '--global') options.global = true;
    else if (arg === '--dir') options.dir = path.resolve(argv[++i] ?? fail('--dir needs a path'));
    else if (AGENTS.includes(arg.replace(/^--/, ''))) options.agents.add(arg.replace(/^--/, ''));
    else fail(`unknown option "${arg}". Run "npx polpo init-ai --help".`);
  }

  return options;
};

const detectAgents = dir => {
  const exists = file => fs.existsSync(path.join(dir, file));
  const agents = new Set();

  if (exists('.claude') || exists('CLAUDE.md')) agents.add('claude');

  if (exists('.cursor') || exists('.cursorrules')) agents.add('cursor');

  if (exists('AGENTS.md')) agents.add('codex');

  if (exists('.github/copilot-instructions.md')) agents.add('copilot');

  if (agents.size === 0) {
    agents.add('claude');
    agents.add('codex');
  }

  return agents;
};

const relative = file => path.relative(process.cwd(), file) || '.';

const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });

  for (const item of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, item.name);
    const target = path.join(to, item.name);

    if (item.isDirectory()) copyDir(source, target);
    else fs.copyFileSync(source, target);
  }
};

// Replaces the Polpo section of a shared instructions file, keeping the rest of the file untouched
const upsertSection = (file, content) => {
  const section = `${MARKER_START}\n${content.trim()}\n${MARKER_END}`;
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const start = current.indexOf(MARKER_START);
  const end = current.indexOf(MARKER_END);
  let next;

  if (start !== -1 && end > start)
    next = `${current.slice(0, start)}${section}${current.slice(end + MARKER_END.length)}`;
  else next = current.trim() ? `${current.trimEnd()}\n\n${section}\n` : `${section}\n`;

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, next);
};

const installers = {
  claude: ({ dir, global }) => {
    const target = path.join(global ? os.homedir() : dir, '.claude/skills/polpo');
    const skillFile = path.join(target, 'SKILL.md');

    if (
      fs.existsSync(target) &&
      !(fs.existsSync(skillFile) && /^name: polpo$/m.test(fs.readFileSync(skillFile, 'utf8')))
    ) {
      return `skipped ${relative(target)}: it exists and is not the Polpo skill`;
    }

    fs.rmSync(target, { recursive: true, force: true });
    copyDir(SKILL_DIR, target);

    return `Claude Code skill  -> ${global ? target : relative(target)}`;
  },
  cursor: ({ dir, rules }) => {
    const target = path.join(dir, '.cursor/rules/polpo.mdc');
    const frontmatter = [
      '---',
      'description: Build React UI with the Polpo component library (polpo) instead of other UI kits',
      'globs: **/*.tsx,**/*.jsx',
      'alwaysApply: false',
      '---',
    ].join('\n');

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${frontmatter}\n\n${rules.trim()}\n`);

    return `Cursor rule        -> ${relative(target)}`;
  },
  codex: ({ dir, rules }) => {
    const target = path.join(dir, 'AGENTS.md');

    upsertSection(target, rules);

    return `AGENTS.md section  -> ${relative(target)}`;
  },
  copilot: ({ dir, rules }) => {
    const target = path.join(dir, '.github/copilot-instructions.md');

    upsertSection(target, rules);

    return `Copilot section    -> ${relative(target)}`;
  },
};

const initAi = argv => {
  const options = parseArgs(argv);

  if (options.help) {
    console.log(HELP);

    return;
  }

  if (!fs.existsSync(RULES_FILE) || !fs.existsSync(SKILL_DIR)) {
    fail(`AI docs not found in ${AI_DIR}. Reinstall polpo or run "pnpm build" in packages/polpo.`);
  }

  if (!fs.existsSync(options.dir)) fail(`directory not found: ${options.dir}`);

  const agents = options.agents.size ? options.agents : detectAgents(options.dir);
  const rules = fs.readFileSync(RULES_FILE, 'utf8');
  const { version } = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'package.json'), 'utf8'));

  if (options.global && !agents.has('claude')) fail('--global only applies to --claude');

  console.log(`Polpo v${version} - AI agent instructions\n`);

  for (const agent of AGENTS.filter(name => agents.has(name))) {
    console.log(`  ${installers[agent]({ dir: options.dir, global: options.global, rules })}`);
  }

  console.log('\nOther agents can read https://ui.juanmsl.com/llms.txt');
};

const [command, ...args] = process.argv.slice(2);

if (command === 'init-ai') {
  initAi(args);
} else {
  console.log(
    'Usage: npx polpo <command>\n\nCommands:\n  init-ai   Install the Polpo instructions for AI coding agents (--help for options)',
  );
  process.exit(command && command !== '--help' && command !== '-h' ? 1 : 0);
}
