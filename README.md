# AITestHub API Test Skill

Skill ID: ath-api-regression (S04), initial version 0.1.0.

The project display name is API Test; the stable Skill ID remains `ath-api-regression`.

Generate and maintain executable API regression assets for an explicitly selected scope. AITestHub owns assets, authorization, review, execution and reporting; the Skill does not become a separate local API or database executor.

The first version is a standalone instruction Skill with focused references and a synthetic Markdown/native-content example. It uses the host's configured MCP directly and has no local HTTP/SQL executor, model dependency, or mandatory dependency on other testing Skills.

The initial example was checked against the platform's native schema and exercised through a local Docker draft create/read/revise/stale-base flow. These checks do not establish installation, automatic activation or real target execution. Debugging requires an explicit user request and runs on the platform.

Read AGENTS.md before changes. Private requirements, test evidence and review records live in the ignored engineering/ directory. This repository publishes the maintained source; a source push does not establish a Tag/Release, installation, automatic activation or real target validation.
