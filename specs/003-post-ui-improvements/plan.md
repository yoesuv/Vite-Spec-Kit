# Implementation Plan: Post Creation and Editing UI Improvements

**Branch**: `003-post-ui-improvements` | **Date**: December 27, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-post-ui-improvements/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enhance post creation and editing interfaces with a centered card-style layout (60% width, max 900px, min 480px on desktop; full width minus 32px padding on mobile). Improve form input and button styling with consistent visual feedback. UI-only changes using existing Ant Design components with custom CSS for responsive layout. No API or data model changes required.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9.3, React 19.2.0  
**Primary Dependencies**: Ant Design 6.1.2, React Router DOM 7.11.0, Yup 1.7.1  
**Storage**: N/A (UI-only feature)  
**Testing**: NO TESTING (per constitution - supersedes all other guidance)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - modern versions)
**Project Type**: Web (single-page application with Vite)  
**Performance Goals**: Card visibility <1s, focus indication <100ms, hover feedback <50ms  
**Constraints**: No new dependencies, WCAG 2.1 AA contrast ratios, responsive 320px-1920px  
**Scale/Scope**: 2 pages modified (Create/Edit), 1 new component (PostFormCard), CSS updates

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Initial Check (Pre-Phase 0)

✅ **I. Clean Code (NON-NEGOTIABLE)**: PASS

- Single responsibility: PostFormCard handles layout only, PostForm handles form logic
- No dead code or temporary hacks
- Clear component structure with TypeScript interfaces

✅ **II. Simple UX**: PASS

- Centered card reduces visual clutter
- Consistent styling across create/edit flows
- Familiar card pattern reduces cognitive load

✅ **III. Responsive Design (NON-NEGOTIABLE)**: PASS

- Mobile-first CSS media queries
- Fluid layout adaptation (60% desktop, 100%-32px mobile)
- Touch-friendly targets maintained via Ant Design defaults

✅ **IV. User Experience Consistency**: PASS

- Same card layout for create and edit
- Consistent form styling across both pages
- Maintains existing Ant Design design language

✅ **V. Performance Requirements (NON-NEGOTIABLE)**: PASS

- No new dependencies (zero bundle impact)
- CSS-only responsive behavior (no JS overhead)
- Meets timing requirements: <1s visibility, <100ms focus, <50ms hover

✅ **VI. Minimal Dependencies**: PASS

- Uses existing Ant Design 6.1.2 (already in package.json)
- No additional npm packages required
- Native CSS for responsive layout

✅ **No Testing Policy (NON-NEGOTIABLE)**: PASS

- No test files created
- No testing frameworks added

### Post-Phase 1 Re-check

✅ **All gates remain PASS**

- Design artifacts confirm no new dependencies
- Component contracts maintain clean separation of concerns
- Responsive design validated in quickstart.md
- Performance targets documented and achievable with CSS-only approach

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── api/
│   └── postsApi.ts              [UNCHANGED]
├── assets/
│   └── react.svg                [UNCHANGED]
├── components/
│   ├── common/                  [UNCHANGED]
│   ├── layout/                  [UNCHANGED]
│   └── posts/
│       ├── PostForm.tsx         [UNCHANGED - styling only]
│       ├── PostFormCard.tsx     [NEW - card wrapper component]
│       └── [other post components]
├── contexts/
│   └── ThemeContext.tsx         [UNCHANGED]
├── pages/
│   ├── CreatePage.tsx           [MODIFIED - wrap with PostFormCard]
│   ├── EditPage.tsx             [MODIFIED - wrap with PostFormCard]
│   └── [other pages]
├── schemas/
│   └── postSchema.ts            [UNCHANGED]
├── types/
│   └── post.ts                  [UNCHANGED]
├── App.css                      [UNCHANGED]
├── App.tsx                      [UNCHANGED]
├── index.css                    [MODIFIED - add card styles]
└── main.tsx                     [UNCHANGED]

# NO TESTING DIRECTORIES (per constitution)
```

**Structure Decision**: Single web application structure. This is a UI-only enhancement affecting 2 pages (CreatePage, EditPage), adding 1 new component (PostFormCard), and updating global CSS. All changes isolated to presentation layer with no impact on API, data models, or business logic.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
