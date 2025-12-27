# Research: Post UI Improvements

## Technical Decisions

### Decision 1: CSS-in-JS vs CSS Modules vs Inline Styles

**Decision**: Use inline styles with Ant Design's `style` prop and CSS classes in index.css  
**Rationale**: Project already uses this pattern (see index.css with .post-card classes). Ant Design components accept style props for custom styling. No additional dependencies needed.  
**Alternatives considered**:

- Styled-components: Rejected - adds dependency (violates Minimal Dependencies principle)
- CSS Modules: Rejected - requires build config changes
- Tailwind CSS: Rejected - requires setup and adds bundle size

### Decision 2: Responsive Layout Implementation

**Decision**: CSS media queries with flexbox centering  
**Rationale**: Native CSS solution, no dependencies. Ant Design Grid system available but not needed for simple centering.  
**Alternatives considered**:

- Ant Design Grid (Row/Col): Rejected - overkill for single centered container
- CSS Grid: Rejected - flexbox simpler for this use case

### Decision 3: Card Component Approach

**Decision**: Use Ant Design Card component with custom width constraints  
**Rationale**: Already using antd@6.1.2. Card provides elevation, padding, and theme support out of the box.  
**Alternatives considered**:

- Custom div with box-shadow: Rejected - reinvents existing component
- Material-UI Card: Rejected - would add new dependency

### Decision 4: Form Styling Enhancement

**Decision**: Extend existing PostForm component with wrapper container, keep Ant Design Form/Input components  
**Rationale**: Form validation logic already implemented with yup schema. Only layout/presentation needs changes.  
**Alternatives considered**:

- Rewrite form with native inputs: Rejected - loses validation, accessibility features
- Replace Ant Design forms: Rejected - unnecessary churn

## Best Practices

### React + TypeScript

- Functional components with hooks (already in use)
- TypeScript strict mode for type safety
- Props interfaces for component contracts

### Ant Design 6.x

- Use ConfigProvider for theme customization
- Leverage built-in responsive utilities
- Follow Ant Design spacing conventions (8px grid)

### Performance

- No additional bundle impact (using existing dependencies)
- CSS-only responsive behavior (no JS media queries)
- Leverage Ant Design's tree-shaking

### Accessibility

- Ant Design components have ARIA attributes built-in
- Maintain keyboard navigation
- Ensure WCAG 2.1 AA contrast ratios (constitution requirement)
