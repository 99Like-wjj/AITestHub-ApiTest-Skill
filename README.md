# AITestHub API Test Skill

Skill ID: ath-api-regression (S04), version 0.1.1.

The project display name is API Test; the stable Skill ID remains `ath-api-regression`.

Generate and maintain executable API regression assets for an explicitly selected scope. AITestHub owns assets, authorization, review, execution and reporting; the Skill does not become a separate local API or database executor.

This is a standalone instruction Skill with focused references and a synthetic Markdown/native-content example. Local hosts use their configured MCP; the platform AI reads the same versioned rules through its static guidance tool and uses the platform's existing business tools. There is no local HTTP/SQL executor, model dependency, or mandatory dependency on other testing Skills.

The initial example was checked against the platform's native schema and exercised through a local Docker draft create/read/revise/stale-base flow. These checks do not establish installation, automatic activation or real target execution. Debugging requires an explicit user request and runs on the platform.

Read AGENTS.md before changes. Private requirements, test evidence and review records live in the ignored engineering/ directory. This repository publishes the maintained source; a source push does not establish a Tag/Release, installation, automatic activation or real target validation.

## Validation and packaging

Maintenance uses Node 24.19.0, pnpm 11.28.11 and Python 3 standard-library ZIP support. The formatter is a development dependency; installed instruction Skills do not execute these maintenance commands.

```text
pnpm install --frozen-lockfile --ignore-scripts
pnpm quality:check
pnpm build
pnpm package:check
```

The deterministic archive includes maintained Skill rules, the platform adapter, a versioned manifest, an exact file inventory and the MIT notice. Existing archives are never overwritten with different bytes. The frozen 0.1.0 archive remains available separately; 0.1.1 does not rewrite its source or history. Normal platform builds consume a reviewed static export and do not read this checkout at runtime.
