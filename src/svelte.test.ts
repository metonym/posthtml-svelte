import fs from "fs";
import posthtml from "posthtml";
import test from "tape";
import { plugin } from "./svelte";
import htmlnano from "htmlnano";

test("plugin transforms svelte code into valid HTML", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Count.html").toString();
  const result = await posthtml([plugin()]).process(html);

  fs.writeFileSync("src/__fixtures__/Count.out.html", result.html);

  t.ok(result.html);
  t.end();
});

test("plugin transforms svelte code into valid HTML and creates a separte JS file", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Count.html").toString();
  const result = await posthtml([plugin("src/__fixtures__/separate/")]).process(
    html
  );

  const minified = await htmlnano.process(result.html, {});
  fs.writeFileSync("src/__fixtures__/separate/Count.out.html", minified.html);

  t.ok(result.html);
  t.ok(minified.html);
  t.end();
});
