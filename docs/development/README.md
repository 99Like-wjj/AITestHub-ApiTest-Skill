# Development standards

Read configuration.md, architecture.md, style-and-packaging.md and review-checklist.md. Current user decisions take precedence.

This independent project provides maintained instruction rules and its own validation/package commands. `pnpm quality:check` checks selected source formatting, script syntax, the manifest, local reference links and license; `pnpm build` creates or verifies the deterministic Skill ZIP, and `pnpm package:check` requires the existing archive to match the current source exactly. These commands are defined in this repository; they do not imply platform type checking, installation or execution acceptance.
