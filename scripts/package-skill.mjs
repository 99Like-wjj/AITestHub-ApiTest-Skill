import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { root, readSkillSource, sha256 } from './skill-source.mjs';

assert(
  process.argv.slice(2).every((arg) => arg === '--check'),
  'Unsupported package option.',
);
const source = await readSkillSource();
const files = new Map(source.files);
const inventory = {
  schemaVersion: 'ath.skill-integrity.v1',
  skillId: source.manifest.skillId,
  version: source.manifest.skillVersion,
  files: [...files].map(([path, bytes]) => ({
    path,
    bytes: bytes.length,
    sha256: sha256(bytes),
  })),
};
files.set(
  'integrity.json',
  Buffer.from(JSON.stringify(inventory, null, 2) + '\n'),
);
const python = String.raw`import sys,json,base64,zipfile,io,stat
data=json.load(sys.stdin); out=io.BytesIO()
with zipfile.ZipFile(out,'w',compression=zipfile.ZIP_STORED) as z:
 for name in sorted(data):
  info=zipfile.ZipInfo(name,(1980,1,1,0,0,0));info.create_system=3;info.external_attr=(stat.S_IFREG|0o644)<<16;info.compress_type=zipfile.ZIP_STORED
  z.writestr(info,base64.b64decode(data[name]))
print(base64.b64encode(out.getvalue()).decode('ascii'))
`;
const encoded = Object.fromEntries(
  [...files].map(([path, bytes]) => [
    `${source.manifest.skillId}/${path}`,
    bytes.toString('base64'),
  ]),
);
const bytes = Buffer.from(
  execFileSync(
    process.platform === 'win32' ? 'python' : 'python3',
    ['-c', python],
    {
      input: JSON.stringify(encoded),
      encoding: 'utf8',
      windowsHide: true,
      maxBuffer: 4 * 1024 * 1024,
    },
  ).trim(),
  'base64',
);
const directory = resolve(root, 'dist');
if (!process.argv.includes('--check'))
  await mkdir(directory, { recursive: true });
const outputRoot = await realpath(directory);
const boundary = relative(await realpath(root), outputRoot);
assert(
  !isAbsolute(boundary) &&
    !boundary.split(/[\\/]/).includes('..') &&
    boundary !== '',
  'Invalid package output root.',
);
const destination = resolve(
  outputRoot,
  `${source.manifest.skillId}-${source.manifest.skillVersion}.zip`,
);
let existing;
try {
  assert(
    !(await lstat(destination)).isSymbolicLink(),
    'Archive links are not supported.',
  );
  existing = await readFile(destination);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (existing)
  assert(
    existing.equals(bytes),
    'An existing versioned archive has different bytes; preserve it and create a new version.',
  );
else {
  assert(
    !process.argv.includes('--check'),
    'The versioned Skill archive does not exist.',
  );
  await writeFile(destination, bytes, { flag: 'wx' });
}
console.log(
  JSON.stringify({
    fileName: destination.split(/[\\/]/).at(-1),
    sha256: sha256(bytes),
    bytes: bytes.length,
    entries: files.size,
    matched: Boolean(existing),
    installed: false,
    modelRequests: 0,
    businessRequests: 0,
  }),
);
