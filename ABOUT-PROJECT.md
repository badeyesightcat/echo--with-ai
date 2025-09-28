## Setup

### Install pnpm v10 (pnpm: package manager)

- Required
- Verify versions: v10.17.1 installed at 20250928

### Setup Turborepo (Turborepo: monorepo build system)

- Use Shadcn/ui template (Shadcn/ui: component library): shadcn@2.9.2 installed
  1. Next 15
  2. Tailwind css v4
  3. React 19

### Learn to use monorepo

- Create 2nd app: Create 2nd application inside @/apps
- Create "math" shared: Create an empty directory inside @/packages which is named as "math": the "math" directory only running on dev script due to its "dev script" option defined
- Add new Shadcn component: this component should be shared across applications, the 1st and the 2nd app.

### Create Github repository
