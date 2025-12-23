# Tasks: Initial Page Setup

**Input**: Design documents from `/specs/001-initial-page-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (NO TESTING per constitution)
- Paths shown below are based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies, and basic structure

- [ ] T001 Install required dependencies: antd, @ant-design/icons, yup, @tanstack/react-query, axios, react-router-dom
- [ ] T002 [P] Create TypeScript interfaces for Post entity in src/types/post.ts
- [ ] T003 [P] Create Yup validation schema in src/schemas/postSchema.ts
- [ ] T004 [P] Create Axios instance with base URL configuration in src/api/postsApi.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create ThemeContext with localStorage persistence in src/contexts/ThemeContext.tsx
- [ ] T006 Create AppLayout component with sticky navigation, centered menu (Home/Create), and theme toggle in src/components/layout/AppLayout.tsx
- [ ] T007 Create PageHeader component with back arrow and title in src/components/common/PageHeader.tsx
- [ ] T008 Configure React Router with routes for Home, Create, Edit, Detail in src/App.tsx
- [ ] T009 Setup QueryClient and wrap app with QueryClientProvider in src/App.tsx
- [ ] T010 Create TanStack Query hooks for posts CRUD operations in src/hooks/usePosts.ts
- [ ] T011 Implement API functions (getPosts, getPost, createPost, updatePost, deletePost) in src/api/postsApi.ts
- [ ] T012 Update global styles for Ant Design integration in src/index.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Navigation and Post Viewing (Priority: P1) 🎯 MVP

**Goal**: Users can navigate the Vite SpecKit application and view a list of posts with basic navigation functionality including theme switching.

**Independent Test**: Load the application, view the post list, switch themes, and navigate between Home and Create pages.

### Tests for User Story 1 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted - this supersedes all other guidance

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create PostCard component displaying post title, body preview, edit/delete buttons in src/components/posts/PostCard.tsx
- [ ] T014 [P] [US1] Create EmptyState component with icon, message, and "Create Post" button in src/components/posts/EmptyState.tsx
- [ ] T015 [US1] Create PostList component with pagination (20 per page) using Ant Design Pagination in src/components/posts/PostList.tsx
- [ ] T016 [US1] Create HomePage displaying PostList with loading/error states in src/pages/HomePage.tsx
- [ ] T017 [US1] Verify theme toggle switches between light/dark mode with localStorage persistence
- [ ] T018 [US1] Verify navigation between Home and Create menu items works correctly

**Checkpoint**: At this point, User Story 1 should be fully functional - users can view posts, paginate, switch themes, and navigate

---

## Phase 4: User Story 2 - Post Management Actions (Priority: P2)

**Goal**: Users can perform edit and delete actions on posts with proper confirmation and feedback mechanisms.

**Independent Test**: Click edit button to navigate to edit page, click delete button to show confirmation dialog, confirm deletion to refresh list.

### Tests for User Story 2 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 2

- [ ] T019 [US2] Add edit button click handler in PostCard to navigate to /edit/:id in src/components/posts/PostCard.tsx
- [ ] T020 [US2] Add delete button click handler in PostCard to show Ant Design Modal.confirm in src/components/posts/PostCard.tsx
- [ ] T021 [US2] Implement useDeletePost mutation with query invalidation in src/hooks/usePosts.ts
- [ ] T022 [US2] Handle delete confirmation: call API, show success message, refresh post list in src/components/posts/PostCard.tsx
- [ ] T023 [US2] Handle delete cancellation: close dialog without changes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - users can view, edit navigation, and delete posts

---

## Phase 5: User Story 3 - Post Creation and Editing (Priority: P3)

**Goal**: Users can create new posts and edit existing posts through validated forms with proper success feedback and navigation.

**Independent Test**: Access create/edit forms, submit valid and invalid data, verify validation errors, success messages, and redirects.

### Tests for User Story 3 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 3

- [ ] T024 [P] [US3] Create PostForm component with Ant Design Form, title/body inputs, Yup validation in src/components/posts/PostForm.tsx
- [ ] T025 [US3] Create CreatePage with PageHeader ("Create" title), PostForm, and success redirect in src/pages/CreatePage.tsx
- [ ] T026 [US3] Create EditPage with PageHeader ("Edit" title), load existing post, PostForm, and success redirect in src/pages/EditPage.tsx
- [ ] T027 [US3] Implement useCreatePost mutation with success message and redirect in src/hooks/usePosts.ts
- [ ] T028 [US3] Implement useUpdatePost mutation with success message and redirect in src/hooks/usePosts.ts
- [ ] T029 [US3] Add form validation error display using Ant Design Form.Item rules with Yup integration
- [ ] T030 [US3] Implement back arrow navigation using useNavigate(-1) in PageHeader

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work - full CRUD functionality available

---

## Phase 6: User Story 4 - Post Detail Viewing (Priority: P4)

**Goal**: Users can view detailed information about individual posts in a dedicated detail page.

**Independent Test**: Click on any post card and verify the detail page displays with proper navigation and content.

### Tests for User Story 4 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 4

- [ ] T031 [US4] Create DetailPage with PageHeader ("Detail" title), full post content display in src/pages/DetailPage.tsx
- [ ] T032 [US4] Add usePost hook for fetching single post by ID in src/hooks/usePosts.ts
- [ ] T033 [US4] Add click handler on PostCard body to navigate to /post/:id in src/components/posts/PostCard.tsx
- [ ] T034 [US4] Handle loading and error states in DetailPage
- [ ] T035 [US4] Implement back arrow navigation to return to post list

**Checkpoint**: All user stories should now be independently functional - complete application ready

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T036 [P] Add responsive design adjustments for mobile/tablet in src/index.css
- [ ] T037 [P] Add loading spinners for all async operations using Ant Design Spin
- [ ] T038 [P] Add error boundary for graceful error handling
- [ ] T039 Code cleanup and ensure consistent styling across all components
- [ ] T040 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Uses PostCard from US1 but can be developed in parallel
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Uses PostCard click from US1 but can be developed in parallel

### Within Each User Story

- Models/Types before hooks
- Hooks before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T002, T003, T004 can run in parallel (Setup phase)
- T013, T014 can run in parallel (US1 components)
- T024 can run in parallel with other US3 tasks (PostForm is independent)
- T036, T037, T038 can run in parallel (Polish phase)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: Setup Phase

```bash
# Launch all setup tasks together:
Task T002: "Create TypeScript interfaces in src/types/post.ts"
Task T003: "Create Yup validation schema in src/schemas/postSchema.ts"
Task T004: "Create Axios instance in src/api/postsApi.ts"
```

## Parallel Example: User Story 1

```bash
# Launch PostCard and EmptyState together:
Task T013: "Create PostCard component in src/components/posts/PostCard.tsx"
Task T014: "Create EmptyState component in src/components/posts/EmptyState.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify post list, pagination, theme toggle, navigation work
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → Deploy/Demo (MVP!)
3. Add User Story 2 → Validate → Deploy/Demo (Edit/Delete)
4. Add User Story 3 → Validate → Deploy/Demo (Create/Edit Forms)
5. Add User Story 4 → Validate → Deploy/Demo (Detail Page)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Post List)
   - Developer B: User Story 3 (Create/Edit Forms)
   - Developer C: User Story 4 (Detail Page)
3. User Story 2 integrates with US1's PostCard
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- NO TESTING verification needed (per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- JSONPlaceholder is a mock API - mutations return success but don't persist
