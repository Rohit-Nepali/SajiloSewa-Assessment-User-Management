# Project 1 — User Management Dashboard
## Senior-Level, Phase-by-Phase Implementation Plan

**Assessment:** Sajilo Life Pvt. Ltd. — React Developer Intern/Trainee Technical Assessment  
**Project:** User Management Dashboard  
**API:** `https://dummyjson.com/users`

---

# 0. Purpose of This Document

This document is the **implementation specification for an AI coding agent** such as GitHub Copilot.

It converts the assessment requirements into a practical implementation sequence while adding the architectural groundwork needed for a clean, maintainable React application.

The assessment requires:

- User listing
- Pagination
- Search
- Filtering
- User details
- Add/Edit/Delete user
- Forms and validation
- React Router
- `useState`
- `useEffect`
- Custom hooks
- State management
- Axios
- Error handling
- Reusable components
- Responsive design
- Basic accessibility
- Clean project structure fileciteturn0file0L17-L38 fileciteturn0file0L75-L96

The assessment also explicitly states that a smaller, complete and stable implementation is preferable to an unnecessarily large application. fileciteturn0file0L275-L284

---

# 1. Core Development Principle

This project must be built **architecture first, features second**.

Do not start by building the user table and then retrofit architecture around it.

Instead:

```text
Project Foundation
        ↓
API Architecture
        ↓
Application Error Handling
        ↓
Routing
        ↓
Theme System
        ↓
Reusable UI Foundation
        ↓
User Data/Hook Architecture
        ↓
User Listing
        ↓
Pagination
        ↓
Search
        ↓
Filtering
        ↓
User Details
        ↓
CRUD
        ↓
Testing / Refinement
        ↓
Documentation / Deployment
```

Each phase must produce a working state before the next phase begins.

---

# 2. AI Agent Operating Rules

These rules apply to the entire project.

## Rule 1 — Work One Phase at a Time

The agent must **not implement the entire project in one pass**.

For each phase:

1. Read the phase.
2. Inspect the current code.
3. Implement only the current phase.
4. Run the application.
5. Check for build/runtime errors.
6. Check the phase acceptance criteria.
7. Fix issues.
8. Make a meaningful Git commit.
9. Stop.

Only continue to the next phase after the current phase is stable.

---

## Rule 2 — Do Not Implement Future Features Early

If Phase 3 is being implemented, do not also implement:

- user search
- pagination
- CRUD
- user details
- unrelated UI

unless the current phase explicitly requires them.

Temporary scaffolding is allowed when necessary, but future functionality must not be prematurely implemented.

---

## Rule 3 — Understand Before Abstracting

Do not create abstractions simply because "senior developers use abstractions."

Every abstraction must have a clear responsibility.

Good:

```text
apiClient
userService
useUsers
ErrorState
ConfirmDialog
ThemeProvider
```

Bad:

```text
UniversalComponentManager
GenericDataProcessor
BaseEverythingService
```

Avoid abstraction for abstraction's sake.

---

## Rule 4 — Centralized Axios

There must be **one centralized Axios client**.

Components must never directly create Axios instances.

Avoid:

```js
axios.get(...)
axios.post(...)
axios.put(...)
axios.delete(...)
```

inside page/component files.

Preferred architecture:

```text
Component
   ↓
Hook / application logic
   ↓
Service
   ↓
Centralized Axios client
   ↓
API
```

---

## Rule 5 — Separation of Concerns

Keep these responsibilities separate:

```text
UI
│
├── rendering
├── user interaction
│
▼
Hooks / application behavior
│
├── loading state
├── data state
├── query state
│
▼
Services
│
├── API operations
│
▼
API Client
│
├── Axios configuration
├── common request behavior
├── common error normalization
│
▼
External API
```

Do not put API details, business behavior, and large UI structures into one component.

---

# 3. Recommended Technology Direction

Unless the existing repository already dictates otherwise, use:

```text
React
Vite
JavaScript + JSX
Axios
React Router
CSS / project-selected styling system
React Context where global application state is genuinely appropriate
```

Do not add a state-management library unless the application actually requires one.

The assessment requires appropriate state management, not a particular state-management library. fileciteturn0file0L75-L96

---

# 4. Target Architecture

The final architecture should approximately follow:

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── users/
│
├── context/
│
├── hooks/
│
├── pages/
│   ├── users/
│   │   ├── UserListPage
│   │   ├── UserDetailsPage
│   │   ├── AddUserPage
│   │   └── EditUserPage
│   └── NotFoundPage
│
├── services/
│   ├── apiClient
│   └── userService
│
├── utils/
│
├── routes/
│
├── App.jsx
├── main.jsx
└── index.css
```

The exact structure may change if implementation experience demonstrates a cleaner alternative.

The important rule is that the structure remains understandable and responsibilities remain separated.

---

# 5. Route Architecture

Target routes:

```text
/users
/users/:id
/users/new
/users/:id/edit
/*
```

The final route structure must include a catch-all route for the application's Not Found page.

React Router should own navigation.

Do not implement navigation by manually manipulating `window.location` for normal application routing.

---

# PHASE 0 — Architecture Decisions & Repository Inspection

## Objective

Understand the starting point and establish project constraints before writing application code.

## Agent Tasks

- [ ] Inspect the repository.
- [ ] Determine whether a React/Vite project already exists.
- [ ] Inspect `package.json`.
- [ ] Inspect current source structure.
- [ ] Identify existing dependencies.
- [ ] Avoid deleting existing useful work without reason.
- [ ] Identify whether JavaScript or TypeScript is already established.
- [ ] Decide the styling approach based on the existing project.
- [ ] Confirm the API requirements.
- [ ] Record important architecture decisions.

## Important

Do not begin implementing feature functionality in this phase.

## Acceptance Criteria

- Repository is understood.
- Existing setup is not unnecessarily destroyed.
- Architecture decisions are clear.
- Implementation can proceed without repeatedly changing foundational decisions.

## Commit

```text
chore: define project architecture
```

---

# PHASE 1 — Project Foundation

## Objective

Create a clean, running React application foundation.

## Tasks

- [ ] Configure React application.
- [ ] Configure Vite if applicable.
- [ ] Install Axios.
- [ ] Install React Router.
- [ ] Establish source folder structure.
- [ ] Create application layout shell.
- [ ] Create route configuration.
- [ ] Create placeholder pages.
- [ ] Configure global CSS/reset.
- [ ] Ensure development server works.
- [ ] Ensure production build works.

## Temporary Pages

Create minimal placeholders for:

```text
User List
User Details
Add User
Edit User
Not Found
```

Do not implement their actual functionality yet.

## Acceptance Criteria

```text
npm run dev
```

works.

The application can navigate between the initial routes.

There are no unnecessary console errors.

Production build succeeds.

## Commit

```text
chore: establish react project foundation
```

---

# PHASE 2 — Centralized Axios & API Layer

## Objective

Establish the API architecture before implementing user features.

The assessment explicitly requires Axios and organized API/service handling. fileciteturn0file0L75-L96

## Architecture

```text
src/
└── services/
    ├── apiClient.js
    └── userService.js
```

## `apiClient`

Create one configured Axios instance.

Centralize:

- base URL
- timeout
- common headers where appropriate
- request configuration
- response handling
- error normalization

Do not place user-specific logic here.

## `userService`

User-specific API operations belong here.

Implement:

```text
getUsers(params)
getUserById(id)
createUser(data)
updateUser(id, data)
deleteUser(id)
```

Expected API operations:

```text
GET    /users
GET    /users/:id
POST   /users/add
PUT    /users/:id
DELETE /users/:id
```

DummyJSON is a simulated API, so mutations must be treated as simulated operations. The assessment explicitly allows API simulation. fileciteturn0file0L48-L64

## Important Separation

```text
apiClient
    ↓
generic HTTP configuration

userService
    ↓
user-specific API endpoints

components/hooks
    ↓
application behavior
```

## Acceptance Criteria

- One Axios instance exists.
- API base URL is centralized.
- User endpoints are centralized.
- Components do not directly call Axios.
- API functions can propagate errors.
- No duplicated endpoint URLs.

## Commit

```text
feat: establish centralized api architecture
```

---

# PHASE 3 — Global Error Model & Application States

## Objective

Before implementing real features, establish how the application represents common states.

The assessment explicitly evaluates loading, error, empty states, invalid input, failed API operations, and other edge cases. fileciteturn0file0L181-L205

## Establish Common States

The application should be able to represent:

```text
idle
loading
success
empty
error
submitting
deleting
```

Do not create one giant global state object for everything.

State should remain close to the feature that owns it unless it genuinely needs to be shared.

## Error Handling

Create a consistent error strategy.

For example:

```text
Axios error
     ↓
API client/service
     ↓
normalized application error
     ↓
hook/page
     ↓
ErrorState component
```

The UI should not need to understand Axios internals.

## Shared Components

Create initial reusable components such as:

```text
LoadingState
ErrorState
EmptyState
```

Keep them simple.

## Error Boundary

Add an application-level React Error Boundary.

Its purpose is different from API error handling:

```text
API failure
→ ErrorState

Unexpected React rendering failure
→ Error Boundary
```

Do not use an Error Boundary as a replacement for API error handling.

## Acceptance Criteria

- API errors can be displayed consistently.
- Unexpected rendering errors have a fallback.
- Loading/error/empty UI primitives exist.
- Axios-specific error details do not leak into UI components.
- Components can retry failed operations where appropriate.

## Commit

```text
feat: add application error and state handling
```

---

# PHASE 4 — Routing, Layout & Not Found

## Objective

Finish application navigation infrastructure before feature development.

The assessment requires React Router and dynamic routes. fileciteturn0file0L75-L83

## Tasks

- [ ] Configure application routes.
- [ ] Add route layout.
- [ ] Add navigation.
- [ ] Add dynamic `/users/:id`.
- [ ] Add `/users/new`.
- [ ] Add `/users/:id/edit`.
- [ ] Add catch-all `*` route.
- [ ] Build a proper Not Found page.
- [ ] Add navigation back to Users.

## Not Found Page

The 404 page should:

- clearly state that the page was not found
- provide a way back to the user dashboard
- maintain the application's visual language
- work on mobile

## Acceptance Criteria

These URLs behave correctly:

```text
/users
/users/1
/users/new
/users/1/edit
/anything-that-does-not-exist
```

The final URL renders the Not Found page.

## Commit

```text
feat: establish application routing and not found page
```

---

# PHASE 5 — Centralized Theme System

## Objective

Establish light/dark mode **before feature UI is built**, so feature components do not contain their own theme logic.

## Architecture

Use a centralized theme provider/context where appropriate.

Conceptually:

```text
ThemeProvider
    │
    ├── currentTheme
    ├── toggleTheme()
    ├── persistence
    └── document/root theme handling
              │
              ▼
        entire application
```

## Requirements

- [ ] Light theme.
- [ ] Dark theme.
- [ ] Central theme state.
- [ ] Theme toggle.
- [ ] Persist user preference.
- [ ] Apply theme at application/root level.
- [ ] Avoid per-component theme state.
- [ ] Ensure colors maintain readable contrast.

## Important

Feature components should consume theme styling, not implement their own theme system.

Do not scatter:

```js
const [dark, setDark] = useState(...)
```

across components.

## Acceptance Criteria

- Theme works throughout the application.
- Refreshing preserves the selected theme.
- 404 page respects the theme.
- Shared components respect the theme.
- No duplicated theme logic.

## Commit

```text
feat: add centralized light and dark theme
```

---

# PHASE 6 — Shared UI Foundation

## Objective

Create the small set of reusable components needed by later features.

## Potential Components

```text
Button
Input
Select
Card
PageHeader
LoadingState
ErrorState
EmptyState
Modal / ConfirmDialog
Toast / Notification
```

Only implement components that are actually needed.

## Rules

Components should:

- have one clear responsibility
- accept sensible props
- avoid feature-specific business logic
- support accessibility
- work in both themes
- have consistent styling

## Acceptance Criteria

The application has a small, coherent UI vocabulary.

Avoid premature creation of a large design system.

## Commit

```text
feat: establish reusable ui foundation
```

---

# PHASE 7 — User Data Hook Architecture

## Objective

Create the data-fetching/application logic layer before building the complete user list UI.

## Custom Hook

Create:

```text
useUsers()
```

Potential responsibilities:

- fetching users
- loading state
- error state
- refetch
- pagination-related query state
- search/filter-related query state

Do not put JSX into the hook.

## Separation

```text
UserListPage
      ↓
useUsers()
      ↓
userService
      ↓
apiClient
      ↓
DummyJSON
```

## Important

The hook should not become a second service layer.

```text
Service = API communication
Hook = React/application state
Component = UI
```

## Acceptance Criteria

- Custom hook exists.
- User API communication remains in `userService`.
- Hook manages React-specific state.
- Page remains readable.

## Commit

```text
feat: add user data hook architecture
```

---

# PHASE 8 — User Listing

## Objective

Implement the core dashboard.

The assessment requires profile image, full name, email, phone, company name, loading/error states, clear hierarchy, responsive design, reusable components and accessibility. fileciteturn0file0L19-L38

## Tasks

- [ ] Fetch users.
- [ ] Display profile image.
- [ ] Display full name.
- [ ] Display email.
- [ ] Display phone.
- [ ] Display company.
- [ ] Add View Details action.
- [ ] Add Edit/Delete action placeholders where appropriate.
- [ ] Implement loading state.
- [ ] Implement error state.
- [ ] Implement empty state.
- [ ] Make the layout responsive.

## Suggested Component Structure

```text
UserListPage
├── PageHeader
├── UserToolbar
├── UserList
│   └── UserListItem
└── Pagination
```

Pagination may remain initially as a structural placeholder until Phase 9.

## Acceptance Criteria

The listing page provides a usable dashboard rather than simply rendering raw API JSON.

## Commit

```text
feat: implement user listing dashboard
```

---

# PHASE 9 — Pagination

## Objective

Add functional pagination.

## Tasks

- [ ] Add page state.
- [ ] Use API `limit` and `skip` where appropriate.
- [ ] Calculate pagination state from API response.
- [ ] Previous/Next controls.
- [ ] Disable invalid navigation.
- [ ] Display current page.
- [ ] Handle page changes cleanly.

## Important Interaction Rule

When search/filter criteria change:

```text
search/filter changes
        ↓
reset page
        ↓
fetch relevant results
```

Avoid showing page 5 of a result set that only contains one page.

## Acceptance Criteria

- Pagination works.
- No invalid pages are requested.
- Pagination works with the responsive layout.
- Pagination integrates cleanly with the hook.

## Commit

```text
feat: add user pagination
```

---

# PHASE 10 — Search

## Objective

Implement usable user search.

The assessment explicitly considers search usability and empty search results. fileciteturn0file0L28-L38

## Tasks

- [ ] Add search input.
- [ ] Define searchable user fields.
- [ ] Integrate search with user data flow.
- [ ] Reset page when search changes.
- [ ] Handle no results.
- [ ] Allow clearing search.

## Optional

Add debouncing only if it improves the implementation without unnecessary complexity. Debounced search is listed as an optional enhancement by the assessment. fileciteturn0file0L159-L175

## Acceptance Criteria

- Search works.
- Search + pagination works.
- No-result state works.
- Clearing search works.

## Commit

```text
feat: add user search
```

---

# PHASE 11 — Filtering

## Objective

Add filtering such as gender or role, as required by the assessment. fileciteturn0file0L23-L27

## Tasks

- [ ] Add gender filter.
- [ ] Provide reset/all option.
- [ ] Integrate with search.
- [ ] Reset pagination after filter changes.
- [ ] Handle zero results.

## Acceptance Criteria

```text
search
+
filter
+
pagination
```

work together without inconsistent state.

## Commit

```text
feat: add user filtering
```

---

# PHASE 12 — User Details

## Objective

Implement the dynamic user details page.

The assessment requires personal information, address, company and bank information. fileciteturn0file0L39-L47

## Route

```text
/users/:id
```

## Tasks

- [ ] Read route parameter.
- [ ] Fetch user.
- [ ] Display personal information.
- [ ] Display address.
- [ ] Display company information.
- [ ] Display bank information.
- [ ] Add Back to Users.
- [ ] Handle loading.
- [ ] Handle API error.
- [ ] Handle invalid/nonexistent user.

## Suggested Sections

```text
User Details
├── Personal Information
├── Address
├── Company
└── Bank Information
```

Keep information visually organized instead of presenting one large data block.

## Acceptance Criteria

- Dynamic route works.
- Correct user is displayed.
- Information is logically grouped.
- Back navigation works.
- Error/not-found states work.
- Responsive layout works.

## Commit

```text
feat: implement user details page
```

---

# PHASE 13 — Add User

## Objective

Implement user creation.

The assessment requires controlled inputs, validation, API integration and submission feedback. fileciteturn0file0L48-L68

## Route

```text
/users/new
```

## Architecture

Create one reusable form component:

```text
UserForm
```

It should support:

```text
create mode
edit mode
```

Do not build two independent copies of the same form.

## Form

Use controlled inputs.

Include only meaningful fields required for a user.

Potential fields:

```text
firstName
lastName
email
phone
username
gender
age
company
```

## Validation

Validate:

- required values
- email format
- sensible numeric values
- appropriate text input

## Submission Flow

```text
User submits
      ↓
validate
      ↓
show submitting state
      ↓
POST
      ↓
success/error
```

Prevent duplicate submission.

## Acceptance Criteria

- Controlled form.
- Validation.
- POST request.
- Loading/submission state.
- Success feedback.
- Error feedback.

## Commit

```text
feat: implement add user form
```

---

# PHASE 14 — Edit User

## Objective

Reuse the form architecture for editing.

The assessment requires pre-populated existing information and validation. fileciteturn0file0L55-L59

## Route

```text
/users/:id/edit
```

## Tasks

- [ ] Fetch existing user.
- [ ] Populate `UserForm`.
- [ ] Allow editing.
- [ ] Validate.
- [ ] PUT update.
- [ ] Show submission state.
- [ ] Handle errors.
- [ ] Handle invalid user ID.
- [ ] Provide appropriate success navigation/feedback.

## Acceptance Criteria

No duplicated Add User form implementation.

## Commit

```text
feat: implement edit user functionality
```

---

# PHASE 15 — Delete User & Confirmation

## Objective

Implement safe destructive actions.

The assessment explicitly requires confirmation, success/error handling and destructive-action feedback. fileciteturn0file0L60-L74

## Tasks

- [ ] Add Delete action.
- [ ] Open confirmation dialog.
- [ ] Allow cancel.
- [ ] Show deleting state.
- [ ] Send DELETE request.
- [ ] Update local UI appropriately.
- [ ] Show success feedback.
- [ ] Show error feedback.

## Confirmation Dialog

It must:

- be keyboard accessible
- clearly identify the destructive action
- provide Cancel
- provide Delete
- prevent accidental repeated submission

## Acceptance Criteria

Delete cannot happen accidentally through a single click.

## Commit

```text
feat: implement safe user deletion
```

---

# PHASE 16 — Responsive & Accessibility Refinement

## Objective

Perform a dedicated quality pass.

The assessment requires desktop, tablet and mobile support. fileciteturn0file0L219-L226

Accessibility requirements include semantic HTML, labels, keyboard-friendly interactions, meaningful labels, alt text and understandable feedback. fileciteturn0file0L227-L234

## Responsive Testing

Test:

```text
Desktop
Tablet
Mobile
```

Check:

- navigation
- toolbar
- search
- filters
- list
- details
- forms
- dialogs
- pagination
- notifications

## Accessibility

- [ ] Semantic HTML.
- [ ] Accessible form labels.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Meaningful button/link labels.
- [ ] Image alt text.
- [ ] Accessible dialog.
- [ ] Understandable error messages.
- [ ] Do not rely on color alone.

## Commit

```text
feat: refine responsive and accessible ui
```

---

# PHASE 17 — Edge Cases & Failure Testing

## Objective

Test the application as if it were going to a real user.

The assessment explicitly asks candidates to consider API failure, no results, invalid data, refresh behavior, empty states and missing users. fileciteturn0file0L199-L205

## Test Matrix

### API

- [ ] List request fails.
- [ ] Details request fails.
- [ ] Create request fails.
- [ ] Update request fails.
- [ ] Delete request fails.
- [ ] Slow request.

### Search

- [ ] No results.
- [ ] Search after changing page.
- [ ] Clear search.
- [ ] Search + filter returns nothing.

### Filters

- [ ] Valid filter.
- [ ] Empty filter result.
- [ ] Reset filter.

### Details

- [ ] Valid ID.
- [ ] Invalid ID.
- [ ] Nonexistent ID.
- [ ] Direct navigation to details URL.
- [ ] Browser refresh.

### Forms

- [ ] Empty fields.
- [ ] Invalid email.
- [ ] Invalid numbers.
- [ ] Repeated submission.
- [ ] API error.

### Delete

- [ ] Cancel.
- [ ] Success.
- [ ] Failure.
- [ ] Repeated click.

### Routing

- [ ] Valid routes.
- [ ] Unknown route.
- [ ] Back navigation.

## Acceptance Criteria

Every major failure mode has a deliberate UI response.

## Commit

```text
test: harden user dashboard edge cases
```

---

# PHASE 18 — Code Quality & Senior Review

## Objective

Review the entire application as a senior developer before submission.

The assessment evaluates component architecture, code quality, API handling, state management, project structure, error handling and technical judgment. fileciteturn0file0L287-L305

## Architecture Review

Ask:

### API

- Is Axios centralized?
- Are API endpoints centralized?
- Are components unaware of Axios details?
- Are errors normalized consistently?

### Services

- Does `userService` contain user API operations only?
- Is business logic separated from HTTP configuration?

### Hooks

- Are hooks responsible for React/application behavior?
- Are effects necessary?
- Are dependencies correct?

### Components

- Are components focused?
- Are reusable components actually reusable?
- Are there giant components?

### State

- Is state local when it should be local?
- Is global state actually necessary?
- Is there duplicated state?

### Forms

- Is Add/Edit using shared form logic?
- Is validation consistent?
- Are submission states handled?

### Theme

- Is theme state centralized?
- Is theme logic duplicated?

### Routing

- Is navigation handled by React Router?
- Is the 404 route correct?

### Code

- Meaningful names?
- No dead code?
- No unnecessary abstractions?
- No duplicated API logic?
- No magic values where configuration/constants are appropriate?
- No unnecessary dependencies?

---

# PHASE 19 — Optional Enhancements

Only begin this phase when **every mandatory requirement is stable**.

Possible additions listed by the assessment include:

- Toast notifications
- Confirmation dialogs
- Skeleton loaders
- Responsive navigation
- Accessibility improvements
- Dark/light mode
- URL-based filters
- Debounced search
- Lazy loading
- Error Boundary
- Improved empty/error states fileciteturn0file0L155-L180

Some of these are already part of our foundation because they improve architecture:

```text
Dark/light mode
Error Boundary
404
Reusable loading/error/empty states
Confirmation dialog
```

Do not add unnecessary features merely to make the project look larger.

---

# PHASE 20 — Final Build Verification

## Development

Run the application and verify:

- [ ] No runtime errors.
- [ ] No unexpected console errors.
- [ ] All routes work.
- [ ] Theme works.
- [ ] API works.
- [ ] CRUD flows work.

## Production

Run:

```text
npm run build
```

Verify:

- [ ] Build succeeds.
- [ ] No build errors.
- [ ] No missing imports.
- [ ] No broken routes caused by production configuration.
- [ ] Assets load correctly.

If a preview command exists, test the production build locally.

## Commit

```text
chore: verify production build
```

---

# PHASE 21 — README & Submission

The assessment requires a GitHub repository, live deployed link, README, screenshots, setup instructions, implementation explanation and meaningful commit history. fileciteturn0file0L235-L255

## README Structure

```text
# User Management Dashboard

## Overview

## Features

## Technologies

## Architecture

## Project Structure

## API

## Installation

## Local Development

## Production Build

## Screenshots

## Live Demo

## Assumptions

## Technical Decisions

## Additional Features

## Known Limitations
```

## Explain Important Decisions

Document:

- centralized Axios architecture
- service layer
- custom hooks
- routing
- error handling
- theme architecture
- state-management decisions
- CRUD/API simulation
- responsive approach
- accessibility considerations

## Screenshots

Include:

- User listing
- Search/filter
- User details
- Add form
- Edit form
- Delete confirmation
- Light mode
- Dark mode
- Mobile layout

## Git

The assessment makes meaningful commit history mandatory. fileciteturn0file0L235-L243

Avoid:

```text
final project
```

as the only commit.

Prefer the phase-based commits defined throughout this document.

---

# 6. Final Architecture

The intended final flow is:

```text
                         ┌───────────────────────┐
                         │       React App       │
                         └───────────┬───────────┘
                                     │
                              ThemeProvider
                                     │
                              App / Router
                                     │
        ┌────────────────────────────┼────────────────────────────┐
        │                            │                            │
        ▼                            ▼                            ▼
  User List Page             User Details Page             User Form
        │                            │                            │
        ▼                            ▼                            ▼
   useUsers()                   useUser()                 form logic
        │                            │                            │
        └────────────────────────────┼────────────────────────────┘
                                     │
                                     ▼
                               userService
                                     │
                                     ▼
                                apiClient
                                     │
                                  Axios
                                     │
                                     ▼
                              DummyJSON API
```

Application-level failure paths:

```text
                ┌───────────────────────┐
                │      Application      │
                └───────────┬───────────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       API / network error          Unexpected React error
             │                             │
             ▼                             ▼
       normalized error              Error Boundary
             │                             │
             ▼                             ▼
        ErrorState                   fallback UI
```

Routing failure:

```text
Unknown URL
    ↓
React Router
    ↓
NotFoundPage
```

Theme:

```text
                 ThemeProvider
                       │
              ┌────────┴────────┐
              ▼                 ▼
           Light              Dark
              │                 │
              └────────┬────────┘
                       ▼
                 Entire App
```

---

# 7. Definition of Done

The project is complete only when:

## Foundation

- [ ] Clean project structure.
- [ ] Centralized Axios.
- [ ] Centralized API/service layer.
- [ ] Consistent API error handling.
- [ ] Error Boundary.
- [ ] React Router.
- [ ] 404/Not Found page.
- [ ] Centralized theme.
- [ ] Light mode.
- [ ] Dark mode.
- [ ] Reusable UI foundation.

## Functional Requirements

- [ ] User listing.
- [ ] Pagination.
- [ ] Search.
- [ ] Filtering.
- [ ] User details.
- [ ] Add user.
- [ ] Edit user.
- [ ] Delete user.
- [ ] Delete confirmation.

## React Requirements

- [ ] `useState`.
- [ ] `useEffect`.
- [ ] Custom hook.
- [ ] React Router.
- [ ] Appropriate state management.
- [ ] Reusable components.
- [ ] Axios.
- [ ] Separation of concerns.

## UX

- [ ] Loading states.
- [ ] Error states.
- [ ] Empty states.
- [ ] Success feedback.
- [ ] Submission states.
- [ ] Responsive desktop/tablet/mobile behavior.
- [ ] Basic accessibility.

## Engineering

- [ ] No duplicated API logic.
- [ ] No unnecessary global state.
- [ ] No unnecessary abstractions.
- [ ] No obvious dead code.
- [ ] Meaningful names.
- [ ] Consistent structure.
- [ ] Production build succeeds.

## Submission

- [ ] GitHub repository.
- [ ] Live deployment.
- [ ] README.
- [ ] Screenshots.
- [ ] Setup instructions.
- [ ] API information.
- [ ] Assumptions.
- [ ] Technical decisions.
- [ ] Meaningful commit history.

---

# 8. Mandatory AI-Agent Stop Rules

The AI agent **must stop after each phase**.

For example:

```text
Implement Phase 1
        ↓
Run project
        ↓
Verify acceptance criteria
        ↓
Fix problems
        ↓
Commit
        ↓
STOP
```

The next phase should not begin automatically.

If a later phase requires a change to an earlier architectural decision, the agent must:

1. Explain why the change is necessary.
2. Identify what existing code is affected.
3. Make the smallest reasonable architectural adjustment.
4. Verify the previous functionality still works.
5. Commit the architectural change separately.

---

# 9. Human Understanding Requirement

The assessment explicitly allows AI tools for research, learning, brainstorming, reference and enhancement, but states that submitted code should not be fully AI-generated and that candidates should understand the implementation and be able to explain their decisions. fileciteturn0file0L264-L274

Therefore, this implementation plan is intentionally designed around:

```text
AI assists implementation
        +
Developer understands each phase
        +
Developer reviews generated code
        +
Developer makes technical decisions
```

The project should not be treated as:

```text
AI generates everything
        ↓
submit
```

---

# 10. Working Method for This Project

For this project, use:

```text
ONE PHASE
    ↓
IMPLEMENT
    ↓
RUN
    ↓
INSPECT
    ↓
EXPLAIN
    ↓
FIX
    ↓
COMMIT
    ↓
NEXT PHASE
```

Do not optimize for finishing quickly.

Optimize for producing a codebase that you can explain during the technical discussion.

