# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- Forward options to `rollup-plugin-svelte`

- Customize Component target (default is `document.body`, use parent tag?)

- Support sourcemaps

- Use AST to deduce if component is "static" instead of script check

- Use AST to replace imports instead of RegEx

- Customize script name

- Use `createHash` for default Component key

## [0.4.7](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.7) - 2020-05-03

- Prepend markup to body

- Promisify `fs.writeFile`

- Use `Date()` for default Component key

## [0.4.6](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.6) - 2020-05-02

- Move `posthtml` to peer dependencies

## [0.4.5](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.5) - 2020-05-01

- Fix: filter out svelte tags if static

## [0.4.4](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.4) - 2020-05-01

- Fix: don't replace existing body content if static

## [0.4.3](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.3) - 2020-05-01

- Fix: support key for component name

## [0.4.2](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.2) - 2020-05-01

- Fix: exclude imports that don't contain the `.svelte` extension

## [0.4.1](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.1) - 2020-05-01

- Fix: use `body` instead of `svelte` tag as parent if static

## [0.4.0](https://github.com/metonym/posthtml-svelte/releases/tag/0.4.0) - 2020-05-01

- Perform simple script check (TODO: use Svelte compiler for a more realistic check)

## [0.3.0](https://github.com/metonym/posthtml-svelte/releases/tag/0.3.0) - 2020-05-01

- Resolve local paths to Svelte components

- Use `@rollup/plugin-virtual` for a virtual bundle entry

## [0.2.1](https://github.com/metonym/posthtml-svelte/releases/tag/0.2.1) - 2020-04-28

- Replace `eval` with `vm.runInNewContext`

## [0.2.0](https://github.com/metonym/posthtml-svelte/releases/tag/0.2.0) - 2020-04-19

- Support separating JS from processed HTML

## [0.1.0](https://github.com/metonym/posthtml-svelte/releases/tag/0.1.0) - 2020-04-18

- Initial release
