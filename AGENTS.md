# Development constraints

Read CONTRIBUTING.md and docs/development/README.md before modifying source, configuration or packaging. Read AGENTS.local.md if present; current user instructions take precedence.

- Requirements clarification precedes implementation design and development.
- S04 refines and maintains executable API assets. Keep business coverage design responsibilities aligned with the independently installed case-design Skill.
- Platform workers execute authorized requests, assertions, scripts and cleanup. Do not add a local API/SQL execution workaround.
- Keep stable identities, revisions, review history and original receipts. Do not weaken assertions to obtain passing results, automatically approve assets, retry business requests or replay uncertain writes.
- Keep secrets and deployment bindings outside source. Shared experience must contain no project data or credentials.
- Keep private designs, tests, evidence, instance configuration and AGENTS.local.md out of commits.
- Follow the branch naming rules below, strict types, supported contracts and existing checks. Installation, real targets, models, publishing and pushing require task-specific authorization.

## 当前契约与端到端核对

- 新功能和重构以当前最优且可验证的契约为准。旧数据和旧格式按需保留原始记录与只读访问。兼容、隐式兜底、自动猜测或旧写入口须有明确业务依据。
- 调整数据格式、版本或校验规则时，核对生产、传输、校验、存储和消费的完整链路。按同一契约同步更新受影响的平台、官方 MCP、SDK、连接插件、本地 Skill 和发布包，并验证实际输入输出一致。保留授权、幂等、原回执和不可变历史。

## Branch naming

- These rules apply to AITestHub platform, independent Skill and connection plugin repositories. Use each repository's own target software version; do not substitute the platform version for a Skill or plugin version.
- Use `type/v<target-version>-<short-english-topic>`, for example `feat/v0.1.4-parallel-testing`, `fix/v0.1.4-report-filter` or `docs/v0.1.4-usage-guide`.
- Choose the type by purpose: `feat` for new functionality, `fix` for defects, `docs` for documentation or standards, and `chore` for engineering maintenance. Use lowercase English and hyphens for a specific topic; do not use a version number alone or an ambiguous name.
- Keep `main` as the main branch name. A work branch does not indicate a released version; formal versions use a Tag and Release tied to an exact commit. Creating a branch does not authorize publication.
- Start new work from a verified main-branch baseline and preserve existing uncommitted work. Rename existing branches only with explicit authorization; verify local and remote names and upstream without rewriting history or overwriting someone else's branch.
