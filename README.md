# posthtml-svelte

[![Build][build]][build-badge]

> Write Svelte in your HTML.

This [PostHTML](https://github.com/posthtml/posthtml) plugin is a proof-of-concept that compiles Svelte written within an HTML file.

```html
<!DOCTYPE html>
<html>
  <body>
    <svelte>
      <script>let count = 0;</script>
      <button on:click="{() => { count++; }}">Increment the count: {count}</button>
    </svelte>
  </body>
</html>
```

## Steps

1) Use PostHTML to extract Svelte code inside of a non-standard `svelte` tag

2) Use the Svelte compiler to generate static markup and styles

3) Use Rollup to generate the JavaScript bundle that hydrates the HTML

4) Use PostHTML to inject the static markup and bundle into the HTML

## Example

### [Before](src/__fixtures__/Count.html)

### [After](src/__fixtures__/Count.out.html)

## Install

```bash
yarn add -D posthtml-svelte
# OR
npm i -D posthtml-svelte
```

## Usage

### Single file

By default, the bundled JavaScript is injected into the HTML. This is not ideal for caching.

```js
const fs = require("fs");
const posthtml = require("posthtml");
const { svelte } = require("posthtml-svelte");

(async () => {
  const html = fs.readFileSync("./src/before.html");
  const result = await posthtml([svelte({
    out: 'src/processed', // if definied, JS will be generated/minified as a separate file
    currentDir: 'src/', // folder relative to the working directory
    key: '<hash>' // unique key for the Svelte component that is written to disk
  })]).process(html);

  fs.writeFileSync("./src/processed/after.html", result.html);
})();
```

## License

[MIT](LICENSE)

[build]: https://travis-ci.com/metonym/posthtml-svelte.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/posthtml-svelte
