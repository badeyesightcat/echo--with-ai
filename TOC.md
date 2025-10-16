# TOC

## 01. Setup

### A. Install pnpm v10 (pnpm: package manager)

- Required
- Verify versions: v10.17.1 installed at 20250928

### B. Setup Turborepo (Turborepo: monorepo build system)

- Use Shadcn/ui template (Shadcn/ui: component library): shadcn@2.9.2 installed
  1. Next 15
  2. Tailwind css v4
  3. React 19

### C. Learn to use monorepo

- Create 2nd app: Create 2nd application inside @/apps
- Create "math" shared: Create an empty directory inside @/packages which is named as "math": the "math" directory only running on dev script due to its "dev script" option defined
- Add new Shadcn component: this component should be shared across applications, the 1st and the 2nd app.

### D. Create Github repository

- https://github.com/badeyesightcat/echo--with-ai

<br><br><br>

## 02. Convex Package

### A. Resolve lint error from build command

- Once got the lint message on build process, then read the error message, spot the source for that. While pressing CTRL key at the same time, you can check dependencies are properly installed and imported with mouse hovering on the imports line.
  ```
  pnpm -F [filtered-directory] add [missing-dependency]
  ```

### B. Setup Convex

: Open source \
: Reactive database \
: Type safety \
: Sync engine out of the box which makes all potential problems with websokets go away.

- Create an account

- Add Convex package

  ```
  pnpm -F backend add convex
  ```

- Run convex setup

  ```
  pnpm -F backend run setup
  ```

- Create schema and functions \
  : Once generating a function .e.g for users, then convex dashboard puts out a function for that. It shows backend actions developed in realtime \
  : 가령, web 모듈에서 backend 모듈을 사용할 경우, dependency 목록에 "@workspace/backend": "workspace:\*", 와 같이 정의

  ```
  \convex\schema.ts
  \convex\users.ts

  \web\package.json
  dependencies: {
    ...
    "@workspace/backend": "workspace:*",
    "convex": "^1.27.3",
    ...
  }

  \web\tsconfig.json
  paths: {
    ...
    "@workspace/backend/*": ["../../packages/backend/convex/*"]
    ...
  }
  ```

- Generate ConvexProvider: refer to the [document](https://docs.convex.dev/quickstart/nextjs).

### C. Github

- Commit changes
- Push changes: with a new branch
- Review and merge PR: Add CodeRabbit to the Gihub and make it to review PR

## 03. Clerk Authentication

### A. Resolve a lint error related to unmatched versions of eslint and its subdependency @eslint/js

### B. Setup Clerk with Convex

- Create an account
- Configure Convex JWT template \
  : Choose convex template and then do not make any changes on it! And just save it. \
- Add middleware, pages, etc.
- The most important and required process for security of the app, MUST use backend auth check!!!

### C. Github

- Commit changes
- Push changes
- Review and merge PRs

## 04. Organizations

### A. Implement "AuthGuard"

- Properly use "Authorized" and "Unauthorized" \
  : Generate AuthGuard and re-organize sources along the way
- Wrap (dashboard)/layout.tsx

### B. Enable organizations

- Create "org-selection" page
- Implement "OrganizationGuard"
- Limit members count

### C. Modify middleware to ensure organization is active

- Add a property serving the organization id inside JWT session.

### D. Github

- Commit changes
- Push commits
- Review and merge PRs

## 05. Error Tracking

### A. Create an error scenario

- Just add a string displaying an error with `throw new Error`

### B. Track error in Convex dashboard

- Can investigate errors inside Convex dashboard's Health, Functions, Logs

### C. Integrate Sentry

: after configuring all of those, implement `pnpm install` at the root of the project

- Connect Convex: \ You have to subscribe PRO plan for Convex in order to use convex-friendly error report

### D. Github

- Commit changes
- Push changes
- Review and merge PRs

## 06. AI Voice Assistant

### A. Create a Vapi account

### B. Setup customer support agent

: Those jobs can be done inside Tool menu.

- Add knowledge base
- Add tools

### C. Test agent from dashboard

- all the agent with test knowledge base
- [ERROR] In Phone numbers page, once trying to create phone numbers with Vapi free numbers option the page got stalled. This needs to be fixed.

### D. Test agent from client SDK

### E. Explain Vapi's API and our multi-tenant needs

- Multi-tenancy technical architecture enables whitelabelling business and branding model.
- Multi-tenancy: single instance on a single server infrastructure serves multiple customers/clients. \ Core software and database are shared by all cients. \ But each tenant's dats is kept separate and isolated from others. \ This is "how"
- Whitelabelling: individual tenants can brand shared products as their own. \ Reseller can make their own logo, colors, domain name on it. \ End user only sees the reseller's name not the original developer's
- Symbiotic relationship: \
  for provider: cost efficiency, customization without code changes, simple management
  for reseller: rapid scaling,
- In order to enable this whitelabelling concept, consider to adopt Amazon's secret manager

### F. Github

- Commit changes
- Push changes
- Review and merge PRs

## 07. Dashboard Layout

### A. Add Shadcn/ui components

### B. Create a dashboard layout

- Create a Sidebar
- Create Sidebar groups
- Add UserButton and OrgSwitcher
- Create empty pages

### C. Github

- Commit changes
- Push changes
- Review and merge PR

## 08. Theme

### A. Modify global.css

### B. Explore other themes

### C. Modify Sidebar look

### D. Don't use the constant for sidebar_state in which its time of execution the it cannot read the constant value.

### E. Erase vapi-related key value, and also remove public api keys from the [Vapi dashboard](https://dashboard.vapi.ai/org/api-keys).

### F. Github

- Commit changes
- Push changes
- Review and merge PR

## 09. Widget Layout

### Create widget view

### Create widget header

### Create widget footer

### Github

- Commit changes
- Push changes
- Review and merge PR

## 10. Widget Session

### Create "contactSession " table

- Add a table inside convex/schema.ts

### Create "contactSession" functions

- Add a file for defining all the functions as to contactSessions inside convex/public/contactSessions which can be accessible from anywhere

### Create Widget Auth screen

### Github

- Commit changes
- Push changes
- Review and merge PR

## 11. Widget Screen Router

### Add state management for routing

- since widget is a tiny app, it doesn't need to be server-side rendering. So it is gonna be a SPA.

### Create widget store

- Using external library for state management, rather selected the native Context API of React which is composed of useContext and createContext.

### Define screens

### Create screen router

### Github

- Commit changes
- Push changes
- Review and merge PR
