import fs from "fs";
import posthtml from "posthtml";
import test from "tape";
import { plugin } from "./svelte";

test("plugin transforms svelte code into valid HTML and creates a separte JS file", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Count.html").toString();
  const result = await posthtml([
    plugin({
      out: "src/__fixtures__/separate/",
      currentDir: "src/__fixtures__/",
    }),
    // @ts-ignore
  ]).process(html, { recognizeSelfClosing: true });

  fs.writeFileSync("src/__fixtures__/separate/Count.out.html", result.html);

  t.ok(result.html);
  t.end();
});

test.only("no JS", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Static.html").toString();
  const result = await posthtml([
    plugin({
      out: "src/__fixtures__/separate/",
      currentDir: "src/__fixtures__/",
    }),
  ]).process(html, {
    // @ts-ignore
    recognizeSelfClosing: true,
  });

  fs.writeFileSync("src/__fixtures__/separate/Static.out.html", result.html);

  t.ok(result.html);
  t.end();
});
