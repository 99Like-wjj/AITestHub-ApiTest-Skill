# Style and packaging

Use UTF-8/LF, strict types for executable code, and pinned dependencies. Preserve frozen schema and released bytes. Check the exact changed files; do not reformat unrelated sources.

This project does not inherit the platform's tsconfig, Docker commands or quality:client. Its package.json defines the actual formatting, source validation and deterministic ZIP commands. Maintenance scripts require Node and Python standard-library ZIP support; they are not part of the installed instruction Skill's execution capabilities. There is no TypeScript application or typecheck command to claim as passed.

The maintained manifest declares Skill identity, version and static sections. The packager adds integrity.json containing all other archive entries with their exact byte counts and SHA-256 hashes. It rejects links, incomplete source, changed license and different bytes at an existing versioned ZIP destination. Package only the Skill directory; private engineering, tests, evidence, instances and development dependencies stay outside the archive.

Source may include maintained code, templates, rules, licenses and necessary build tools. Private designs, tests, evidence, workspaces, instances and secrets remain ignored. Packages must be self-contained without developer absolute paths or live cross-repository imports.
