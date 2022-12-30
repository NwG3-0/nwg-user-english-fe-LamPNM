# English Web Application

## Prerequisite

- VS Code's extensions:
  - EditorConfig
  - TODO Highlight
  - ESLint
  - Code Spell Checker

- pnpm: <https://pnpmpkg.com/>

## Note

- Use `pnpm` instead of `npm`.
- Don't forget to commit `pnpm-lock.yaml` when you are adding new packages.

## How to Start

- Create `.env.development.local` from `.env.development` with your own modifications:

```sh
cp .env.development{,.local}
```

- Install app dependencies:

```sh
pnpm install
```

- Install Husky:

```sh
pnpm prepare
```

- Start the development server:

```sh
pnpm dev
```

## Project Structure

- `pages`: Next.js pages
  - `api`: API Routes
  - `sandbox`: Sample pages for testing
- `public`: Public assets
- `tests`: Unit tests code by Jest
- `styles`: Styling files
- `src`: Main directory for source code
  - `components`:
    - `elements`: Small components: Buttons, Icons, Input...
    - `widgets`: Larger components: Banner, Pagination, Modals...
    - `screens`: Screen component (largest components which are used directly from `pages`)
    - `layouts`: Components related to layout
    - Others are waiting for refactoring
  - `config`: Put global config files
  - `contract`: Put files related to Smart Contract
  - `hooks`: Global custom React hooks
  - `libs`: Utilities functions (Deprecated)
  - `models`: Helpers
  - `utils`: Utilities functions

## Other commands

- `pnpm prepare`: Install Husky.
- `pnpm ts-check`: Validate types of TypeScript files.
- `pnpm lint`: Report linting issues for TypeScript files.
- `pnpm lint-style`: Report linting issues for SASS files.
- `pnpm prettier --config .prettierrc 'src/**/*.{ts,tsx}' --write`: Format code on `src` directory.
- `pnpm prettier --config .prettierrc 'pages/**/*.{ts,tsx}' --write`: Format code on `pages` directory.

## Use with Docker

TBD...
