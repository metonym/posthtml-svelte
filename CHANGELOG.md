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
