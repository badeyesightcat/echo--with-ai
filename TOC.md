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

- Generate ConvexProvider: refer to the [document](https://docs.convex.dev/quickstart/nextjs)

### C. Github

- Commit changes
- Push changes
- Review and merge PR
