# Style and packaging

Use UTF-8/LF, strict types for executable code, and pinned dependencies. Preserve frozen schema and released bytes. Check the exact changed files; do not reformat unrelated sources.

This project does not inherit the platform's tsconfig, build scripts, Docker commands or quality:client. Establish and document its actual checks when implementation requires them. Never claim missing commands passed.

Source may include maintained code, templates, rules, licenses and necessary build tools. Private designs, tests, evidence, workspaces, instances and secrets remain ignored. Packages must be self-contained without developer absolute paths or live cross-repository imports.
