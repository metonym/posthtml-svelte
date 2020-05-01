import fs from "fs";
import posthtml from "posthtml";
import test from "tape";
import { plugin } from "./svelte";
import htmlnano from "htmlnano";

test.only("plugin transforms svelte code into valid HTML and creates a separte JS file", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Count.html").toString();
  const result = await posthtml([
    plugin({
      out: "src/__fixtures__/separate/",
      currentDir: "src/__fixtures__/",
    }),
    // @ts-ignore
  ]).process(html, { recognizeSelfClosing: true });

  const minified = await htmlnano.process(result.html, {});
  fs.writeFileSync("src/__fixtures__/separate/Count.out.html", minified.html);

  t.ok(result.html);
  t.ok(minified.html);
  t.end();
});

test("no JS", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Static.html").toString();
  const result = await posthtml([
    plugin({
      out: "src/__fixtures__/separate/",
      currentDir: "src/__fixtures__/",
    }),
  ]).process(html, { recognizeSelfClosing: true });

  const minified = await htmlnano.process(result.html, {});
  fs.writeFileSync("src/__fixtures__/separate/Static.out.html", minified.html);

  t.ok(result.html);
  t.ok(minified.html);
  t.end();
});
