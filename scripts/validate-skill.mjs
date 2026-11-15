import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { root, readSkillSource } from './skill-source.mjs';

const source = await readSkillSource();
for (const script of [
  'skill-source.mjs',
  'validate-skill.mjs',
  'package-skill.mjs',
])
  execFileSync(
    process.execPath,
    ['--check', resolve(root, 'scripts', script)],
    { windowsHide: true },
  );
console.log(
  JSON.stringify({
    skillId: source.manifest.skillId,
    version: source.manifest.skillVersion,
    sourceFiles: source.files.size,
    valid: true,
    modelRequests: 0,
    businessRequests: 0,
  }),
);
