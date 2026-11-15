# Module boundaries

The maintained Skill entry point describes its trigger and essential workflow. Focused references define generation, platform-native data, revision/receipt recovery and explicit platform debugging. Assets contain synthetic examples only.

The current AI interprets Markdown and proposes API assets. Existing MCP business tools enforce authorization and persist assets; platform workers execute requests, scripts and cleanup. Do not introduce a local test executor, direct database client or a second authoritative asset/report store.

Other Skills and the connection plugin are separately installable. Do not assume that copying files injects trusted runtime ports. If future deterministic helpers are justified, keep their ports explicit and validate real host integration separately from package checks.
