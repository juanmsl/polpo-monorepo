/*
 * Release helper used by .github/workflows/release.yml and publish.yml
 *
 *   node scripts/release.mjs bump --type <patch|minor|major> --packages polpo,polpo-tailwind-config
 *   node scripts/release.mjs publish [--dry-run]
 *
 * bump     Increments the version of the selected packages and writes the release PR data
 *          (branch, title, body) to $GITHUB_OUTPUT when it runs in GitHub Actions.
 * publish  Publishes every package of packages/* whose version is not on npm yet, in dependency order:
 *          build, `pnpm publish` (replaces `workspace:*`, applies publishConfig and uses trusted publishing /
 *          OIDC with provenance), git tag `<name>@<version>` and GitHub Release with generated notes.
 *          It is idempotent: re-running it only publishes what is missing.
 */
/* eslint-disable no-console */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const BUMPS = ['patch', 'minor', 'major'];

const run = (command, args, options = {}) => execFileSync(command, args, { cwd: ROOT, stdio: 'inherit', ...options });

const output = (command, args, options = {}) =>
  execFileSync(command, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options }).trim();

const fail = message => {
  console.error(`release: ${message}`);
  process.exit(1);
};

const parseArgs = argv => {
  const args = {};

  for (let i = 0; i < argv.length; i++) {
    const [key, value] = argv[i].replace(/^--/, '').split('=');

    if (value !== undefined) args[key] = value;
    else if (argv[i + 1] && !argv[i + 1].startsWith('--')) args[key] = argv[++i];
    else args[key] = true;
  }

  return args;
};

/*
 * ================================================
 * WORKSPACE
 * ================================================
 */

const readPackages = () =>
  fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory() && fs.existsSync(path.join(PACKAGES_DIR, item.name, 'package.json')))
    .map(item => {
      const dir = path.join(PACKAGES_DIR, item.name);
      const file = path.join(dir, 'package.json');
      const json = JSON.parse(fs.readFileSync(file, 'utf8'));

      return { name: json.name, version: json.version, dir, file, json };
    })
    .filter(pkg => !pkg.json.private);

const internalDependencies = (pkg, names, { runtimeOnly = false } = {}) =>
  Object.keys({
    ...pkg.json.dependencies,
    ...pkg.json.peerDependencies,
    ...(runtimeOnly ? {} : pkg.json.devDependencies),
  }).filter(name => names.has(name));

// Dependencies first: polpo-tailwind-config is published before polpo
const sortByDependencies = packages => {
  const names = new Set(packages.map(pkg => pkg.name));
  const sorted = [];
  const visited = new Set();
  const visit = (pkg, stack = []) => {
    if (visited.has(pkg.name)) return;

    if (stack.includes(pkg.name)) fail(`circular dependency: ${[...stack, pkg.name].join(' -> ')}`);

    internalDependencies(pkg, names).forEach(name =>
      visit(
        packages.find(item => item.name === name),
        [...stack, pkg.name],
      ),
    );
    visited.add(pkg.name);
    sorted.push(pkg);
  };

  packages.forEach(pkg => visit(pkg));

  return sorted;
};

const incrementVersion = (version, type) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) fail(`unsupported version "${version}" (expected x.y.z)`);

  const [major, minor, patch] = match.slice(1).map(Number);

  if (type === 'major') return `${major + 1}.0.0`;

  if (type === 'minor') return `${major}.${minor + 1}.0`;

  return `${major}.${minor}.${patch + 1}`;
};

const setOutput = (name, value) => {
  if (!process.env.GITHUB_OUTPUT) return;

  const delimiter = `EOF_${Math.random().toString(36).slice(2)}`;

  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
};

/*
 * ================================================
 * BUMP
 * ================================================
 */

const bump = args => {
  const type = args.type;
  const all = readPackages();
  const requested = String(args.packages ?? '')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);

  if (!BUMPS.includes(type)) fail(`--type must be one of ${BUMPS.join(', ')}`);

  if (!requested.length) fail(`select at least one package: ${all.map(pkg => pkg.name).join(', ')}`);

  const unknown = requested.filter(name => !all.some(pkg => pkg.name === name));

  if (unknown.length)
    fail(`unknown packages: ${unknown.join(', ')}. Available: ${all.map(pkg => pkg.name).join(', ')}`);

  const selected = sortByDependencies(all).filter(pkg => requested.includes(pkg.name));
  const names = new Set(all.map(pkg => pkg.name));
  const changes = selected.map(pkg => {
    const next = incrementVersion(pkg.version, type);
    const content = fs.readFileSync(pkg.file, 'utf8');

    // Replace only the version line to keep the formatting of package.json
    fs.writeFileSync(pkg.file, content.replace(/("version":\s*")[^"]+(")/, `$1${next}$2`));

    return { ...pkg, next };
  });

  const tags = changes.map(pkg => `${pkg.name}@${pkg.next}`);
  const title = `release: ${tags.join(', ')}`;
  const branch = `release/${changes.map(pkg => `${pkg.name}-${pkg.next}`).join('_')}`;
  const dependents = all.filter(
    pkg =>
      !requested.includes(pkg.name) &&
      internalDependencies(pkg, names, { runtimeOnly: true }).some(name => requested.includes(name)),
  );
  const body = [
    `${type[0].toUpperCase()}${type.slice(1)} release created by the **Release** workflow.`,
    '',
    '| Package | Current | New |',
    '| --- | --- | --- |',
    ...changes.map(pkg => `| \`${pkg.name}\` | ${pkg.version} | **${pkg.next}** |`),
    '',
    `Publish order: ${changes.map(pkg => `\`${pkg.name}\``).join(' → ')}`,
    '',
    'Merging this PR runs the **Publish** workflow: it publishes these versions to npm with provenance, creates the git tags and the GitHub Releases.',
    ...(changes.some(pkg => pkg.name === 'polpo')
      ? ['', '`plugins/polpo` (Claude Code plugin) is regenerated for the new polpo version.']
      : []),
    ...(dependents.length
      ? [
          '',
          '> [!NOTE]',
          `> ${dependents.map(pkg => `\`${pkg.name}\``).join(', ')} also depend on the released packages but are not part of this release: their published versions keep using the previous versions until they are released too.`,
        ]
      : []),
  ].join('\n');

  console.log(`${title}\n`);
  changes.forEach(pkg => console.log(`  ${pkg.name}: ${pkg.version} -> ${pkg.next}`));

  setOutput('title', title);
  setOutput('branch', branch);
  setOutput('body', body);
  setOutput('filters', changes.map(pkg => `--filter=${pkg.name}`).join(' '));
  setOutput('polpo', String(changes.some(pkg => pkg.name === 'polpo')));
};

/*
 * ================================================
 * PUBLISH
 * ================================================
 */

const isPublished = pkg => {
  try {
    return output('npm', ['view', `${pkg.name}@${pkg.version}`, 'version']) === pkg.version;
  } catch {
    // E404: the package or the version does not exist yet
    return false;
  }
};

const tagExists = tag => output('git', ['tag', '--list', tag]) === tag;

const previousTag = pkg =>
  output('git', ['tag', '--list', `${pkg.name}@*`, '--sort=-v:refname'])
    .split('\n')
    .filter(tag => tag && tag !== `${pkg.name}@${pkg.version}`)[0];

const publish = args => {
  const dryRun = Boolean(args['dry-run']);
  const pending = sortByDependencies(readPackages()).filter(pkg => !isPublished(pkg));

  if (!pending.length) {
    console.log('Every package version is already on npm. Nothing to publish.');

    return;
  }

  console.log(
    `To publish${dryRun ? ' (dry run)' : ''}: ${pending.map(pkg => `${pkg.name}@${pkg.version}`).join(', ')}\n`,
  );

  run('pnpm', ['turbo', 'run', 'build', ...pending.map(pkg => `--filter=${pkg.name}`)]);

  for (const pkg of pending) {
    const tag = `${pkg.name}@${pkg.version}`;

    console.log(`\n=== ${tag}`);

    /*
     * pnpm publish (native since pnpm v11) replaces `workspace:*` with the real versions, applies publishConfig
     * and uses trusted publishing (OIDC) with provenance in GitHub Actions. Its git checks make sure a real
     * publish runs from an up to date and clean main; dry runs skip them so they can run from any branch.
     */
    run('pnpm', ['publish', '--access', 'public', ...(dryRun ? ['--dry-run', '--no-git-checks'] : [])], {
      cwd: pkg.dir,
    });

    if (dryRun) continue;

    if (!tagExists(tag)) {
      run('git', ['tag', '-a', tag, '-m', tag]);
      run('git', ['push', 'origin', tag]);
    }

    const start = previousTag(pkg);

    try {
      output('gh', ['release', 'view', tag]);
      console.log(`GitHub Release ${tag} already exists`);

      continue;
    } catch {
      // The release does not exist yet
    }

    run('gh', [
      'release',
      'create',
      tag,
      '--title',
      tag,
      '--verify-tag',
      '--generate-notes',
      ...(start ? ['--notes-start-tag', start] : []),
    ]);
  }
};

/*
 * ================================================
 * MAIN
 * ================================================
 */

const [command, ...rest] = process.argv.slice(2);
const args = parseArgs(rest);

if (command === 'bump') bump(args);
else if (command === 'publish') publish(args);
else fail('usage: node scripts/release.mjs <bump|publish> [options]');
