## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: Main web Next.js app
- `extension-ui`: Extension UI React.js app
- `extension`: Chrome extension
- `@repo/ui`: a stub React component library shared by both `web` and `extension-ui` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

Build individual apps:

- web:

```
  npm run build:web
```

- extension-ui:

```
  npm run build:ext
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

Dev individual apps:

- web:

```
  npm run dev:web
```

- extension-ui:

```
  npm run dev:ext
```

- extension:
  1. Enable developer mode for Chrome
  2. Load unpacked the extension directory
