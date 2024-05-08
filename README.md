## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: Main web Next.js app
- `extension`: Chrome extension

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

Build individual apps:

- web:

```
pnpm build:web
```

- extension:

```
pnpm build:ext
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

Dev individual apps:

- web:

```
pnpm dev:web
```

- extension:

```
pnpm dev:ext
```

1. Enable developer mode for Chrome
2. Load unpacked the `apps/extension/dist` directory
