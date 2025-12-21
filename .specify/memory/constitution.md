<!--
Sync Impact Report:
- Version change: new → 1.0.0
- Modified principles: All principles are new (clean code, simple UX, responsive design, UX consistency, performance, minimal dependencies)
- Added sections: No Testing Policy (NON-NEGOTIABLE)
- Removed sections: None (new constitution)
- Templates requiring updates: ⚠ pending review of dependent templates
- Follow-up TODOs: Review and update dependent templates for consistency
-->

# Vite + Spec Kit Constitution

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)

Code MUST be readable, maintainable, and self-documenting. All code follows consistent formatting, meaningful naming conventions, and clear structure. Functions and components MUST have single responsibilities. Complex logic MUST be broken into smaller, understandable units. No dead code, commented-out code, or temporary hacks are permitted in production.

**Rationale**: Clean code reduces cognitive load, accelerates development velocity, and minimizes bugs through clarity.

### II. Simple UX

User interfaces MUST prioritize simplicity and intuitive interaction patterns. Every UI element MUST serve a clear purpose. Navigation MUST be predictable and consistent. User flows MUST be streamlined with minimal steps to complete tasks. Cognitive overhead MUST be minimized through clear visual hierarchy and familiar patterns.

**Rationale**: Simple UX reduces user friction, increases adoption, and decreases support burden.

### III. Responsive Design (NON-NEGOTIABLE)

All interfaces MUST work seamlessly across desktop, tablet, and mobile devices. Layouts MUST adapt fluidly to different screen sizes using mobile-first design principles. Touch targets MUST meet accessibility standards. Performance MUST remain optimal across all device types and network conditions.

**Rationale**: Multi-device usage is standard; responsive design ensures universal accessibility and user satisfaction.

### IV. User Experience Consistency

All user-facing elements MUST maintain consistent visual design, interaction patterns, and terminology across the entire application. Design tokens, component libraries, and style guides MUST be used to enforce consistency. User mental models MUST be preserved throughout different sections of the application.

**Rationale**: Consistency reduces learning curve, builds user confidence, and creates professional polish.

### V. Performance Requirements (NON-NEGOTIABLE)

Applications MUST load within 3 seconds on standard connections. Interactive elements MUST respond within 100ms. Bundle sizes MUST be optimized through code splitting and lazy loading. Images and assets MUST be optimized for web delivery. Performance budgets MUST be established and monitored continuously.

**Rationale**: Performance directly impacts user satisfaction, SEO rankings, and business outcomes.

### VI. Minimal Dependencies

External dependencies MUST be justified by significant value and actively maintained. Dependency count MUST be minimized to reduce security surface area, bundle size, and maintenance overhead. Native browser APIs and standard library functions MUST be preferred over third-party alternatives when feasible. All dependencies MUST be regularly audited for security vulnerabilities.

**Rationale**: Fewer dependencies reduce security risks, improve performance, and decrease long-term maintenance burden.

## No Testing Policy (NON-NEGOTIABLE)

**This principle supersedes any other guidance regarding testing.**

NO unit tests, integration tests, end-to-end tests, or any other form of automated testing SHALL be implemented or maintained. Testing frameworks, test files, and testing infrastructure are explicitly prohibited. Code quality MUST be ensured through code review, static analysis, and runtime validation only.

**Rationale**: Focus development resources entirely on feature delivery and user value rather than test maintenance overhead.

## Development Standards

All code MUST pass static analysis tools (linting, type checking). Code reviews are mandatory for all changes. Documentation MUST be maintained for public APIs and complex business logic. Version control MUST follow conventional commit standards. Security best practices MUST be followed for data handling and user authentication.

## Governance

This constitution supersedes all other development practices and guidelines. Any conflicts between this constitution and other documentation MUST be resolved in favor of the constitution. Amendments require explicit documentation of changes, rationale, and migration plan. All development decisions MUST be evaluated against these core principles.

Compliance verification is required during code review. Complexity MUST be justified against the simplicity principle. Performance impact MUST be measured and validated against requirements.

**Version**: 1.0.0 | **Ratified**: 2025-12-22 | **Last Amended**: 2025-12-22
