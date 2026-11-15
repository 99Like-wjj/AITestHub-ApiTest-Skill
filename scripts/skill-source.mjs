import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, realpath } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const skillRoot = resolve(root, 'skills/ath-api-regression');
export const sha256 = (value) =>
  createHash('sha256').update(value).digest('hex');

/** Maintenance-only explicit reader. Importing this module performs no I/O. */
export async function readSkillSource() {
  const base = await realpath(skillRoot);
  const files = new Map();
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = resolve(directory, entry.name);
      const path = relative(base, absolute).replaceAll('\\', '/');
      assert(!entry.isSymbolicLink(), 'Skill links are not distributable.');
      assert(!isAbsolute(path) && !path.split('/').includes('..'));
      assert(/^[a-zA-Z0-9][a-zA-Z0-9/_.-]*$/.test(path));
      if (entry.isDirectory()) await visit(absolute);
      else {
        assert(entry.isFile(), 'Only ordinary Skill files are supported.');
        files.set(path, await readFile(absolute));
      }
    }
  }
  await visit(base);
  const manifest = JSON.parse(
    files.get('manifest.json')?.toString('utf8') ?? 'null',
  );
  assert.equal(manifest?.schemaVersion, 'ath.skill-manifest.v1');
  assert.deepEqual(Object.keys(manifest).sort(), [
    'compatibleContracts',
    'license',
    'ruleVersion',
    'schemaVersion',
    'sections',
    'skillId',
    'skillVersion',
    'targets',
  ]);
  assert.equal(manifest.skillId, 'ath-api-regression');
  assert.match(manifest.skillVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.ruleVersion, manifest.skillVersion);
  assert.equal(manifest.license, 'MIT');
  assert.deepEqual(manifest.compatibleContracts, [
    'ath.contracts.v1',
    'ath.api-case.v1',
  ]);
  assert.deepEqual(manifest.targets, ['local', 'platform-content']);
  assert.deepEqual(manifest.sections, {
    entry: 'SKILL.md',
    generation: 'references/generation.md',
    'native-api': 'references/native-api.md',
    'maintenance-and-recovery': 'references/maintenance-and-recovery.md',
    'platform-debug': 'references/platform-debug.md',
    'platform-adapter': 'host-adapters/platform.md',
  });
  for (const path of Object.values(manifest.sections))
    assert(files.has(path), 'A declared rule section is missing.');
  const allowed = new Set([
    ...Object.values(manifest.sections),
    'agents/openai.yaml',
    'assets/synthetic-api-content.json',
    'assets/synthetic-api.md',
    'manifest.json',
    'LICENSE',
  ]);
  assert.deepEqual([...files.keys()].sort(), [...allowed].sort());
  const license = await readFile(resolve(root, 'LICENSE'));
  assert(
    files.get('LICENSE')?.equals(license),
    'The packaged MIT notice differs.',
  );
  const entry = files.get('SKILL.md').toString('utf8');
  assert.match(entry, /^---\r?\nname: ath-api-regression\r?\n/);
  assert(entry.includes(`version: "${manifest.skillVersion}"`));
  const packageJson = JSON.parse(
    await readFile(resolve(root, 'package.json'), 'utf8'),
  );
  assert.equal(packageJson.version, manifest.skillVersion);
  for (const [path, bytes] of files) {
    if (!path.endsWith('.md')) continue;
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
      const link = match[1];
      if (/^(?:[a-z]+:|#)/i.test(link)) continue;
      const target = relative(
        base,
        resolve(base, dirname(path), link),
      ).replaceAll('\\', '/');
      assert(
        !target.split('/').includes('..') && files.has(target),
        'A local Skill reference is missing.',
      );
    }
  }
  return {
    manifest,
    files: new Map([...files].sort(([a], [b]) => a.localeCompare(b, 'en'))),
  };
}
