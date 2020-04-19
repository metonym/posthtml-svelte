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

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <svelte>
      <script>
        let count = 0;

        $: list = Array.from({ length: count }, (_, i) => i)
      </script>

      <style>
        h1 {
          font-size: 2.5rem;
          color: blue;
        }
      </style>

      <svelte:head>
        <title>Page title</title>
      </svelte:head>

      <button on:click="{() => { count++; }}">Increment</button>

      <h1>Count: {count}</h1>

      <ul>
        Static, pre-rendered list
        {#each [0, 1, 2] as item}
          <li>{item}</li>
        {/each}
      </ul>

      <ul>
        Dynamic list
        {#each list as item}
          <li>{item}</li>
        {/each}
      </ul>
    </svelte>
  </body>
</html>
```

### [After](src/__fixtures__/Count.out.html)

## Install

```bash
yarn add -D posthtml-svelte
# OR
npm i -D posthtml-svelte
```

## Usage

```js
const fs = require("fs");
const posthtml = require("posthtml");
const { svelte } = require("posthtml-svelte");

(async () => {
  const html = fs.readFileSync("./before.html");
  const result = await posthtml([svelte()]).process(html);

  fs.writeFileSync("./after.html", result.html);
})();
```

The plugin will create a folder called `.cache-posthtml-svelte`.

You can add this to your `.gitignore`:

```s
/.cache*
```

## License

[MIT](LICENSE)

[build]: https://travis-ci.com/metonym/posthtml-svelte.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/posthtml-svelte
