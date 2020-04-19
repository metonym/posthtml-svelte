import fs from "fs";
import posthtml from "posthtml";
import test from "tape";
import { plugin } from "./svelte";

test("plugin transforms svelte code into valid HTML", async (t) => {
  const html = fs.readFileSync("src/__fixtures__/Count.html").toString();
  const result = await posthtml([plugin()]).process(html);

  fs.writeFileSync("src/__fixtures__/Count.out.html", result.html);

  t.ok(result.html);
  t.end();
});
