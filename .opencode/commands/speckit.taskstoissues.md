---
description: Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature based on available design artifacts.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").
2. From the executed script, extract the path to **tasks**.
3. Get the Git remote by running:

```bash
git config --get remote.origin.url
```

> [!CAUTION]
> ONLY PROCEED TO NEXT STEPS IF THE REMOTE IS A GITHUB URL

4. Verify that `gh` is installed. If it is missing, stop and ask the user to install GitHub CLI.
5. Verify GitHub CLI authentication with `gh auth status`. If it is not authenticated, stop and ask the user to run `gh auth login`.
6. For each task in the list, create one GitHub issue with `gh issue create --repo OWNER/REPOSITORY`, using the task description as the title/body and preserving the feature path as context.

> [!CAUTION]
> Under no circumstances create issues in repositories that do not match the remote URL.
