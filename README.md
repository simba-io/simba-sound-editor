# simple-sound-editor

Local package linking guide for development.

## Link this package globally

```bash
npm install
npm run link:global
```

## Link in your main client

Run this in the main client project:

```bash
npm link simple-sound-editor
```

## Rebuild during development

Run this in this package whenever you change code:

```bash
npm run build
```

Or keep it rebuilding automatically while linked:

```bash
npm run build:watch
```

## Unlink

In the main client project:

```bash
npm unlink simple-sound-editor
```

In this package:

```bash
npm run unlink:global
```
