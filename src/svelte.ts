import { PostHTML } from "posthtml";
import render from "posthtml-render";
import parse from "posthtml-parser";
import { compile } from "svelte/compiler";
import * as rollup from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import rollupSvelte from "rollup-plugin-svelte";
import path from "path";
import fs from "fs";

const cache = path.join(process.cwd(), ".cache-posthtml-svelte");

function plugin() {
  return (tree: PostHTML.Node) => {
    return new Promise(async (resolve) => {
      let promise: undefined | Promise<void>;

      tree.match({ tag: "svelte" }, (node) => {
        promise = new Promise(async (resolve) => {
          const source = render(node.content);
          const { js } = compile(source, { format: "cjs", generate: "ssr" });
          const Component = eval(js.code);
          const { html, head, css } = Component.render();

          tree.match({ tag: "head" }, (node) => {
            if (!!Boolean(head)) {
              node.content?.push((parse(head!) as unknown) as PostHTML.Node);
            }

            if (!!Boolean(css.code)) {
              node.content?.push(
                (parse(
                  `<style>${css.code}</style>`
                ) as unknown) as PostHTML.Node
              );
            }

            return node;
          });

          if (!fs.existsSync(cache)) {
            fs.mkdirSync(cache);
          }

          fs.writeFileSync(
            path.join(cache, "entry.js"),
            `import Component from "./Component.svelte";
             new Component({ target: document.body, hydrate: true });`
          );

          fs.writeFileSync(path.join(cache, "Component.svelte"), source);

          const bundle = await rollup.rollup({
            input: path.join(cache, "entry.js"),
            plugins: [
              rollupSvelte({
                css: false, // omit css from bundle because it's injected in the <head> element
                hydratable: true,
              }),
              nodeResolve(),
            ],
          });

          const output = await bundle.generate({});

          tree.match({ tag: "svelte" }, (node) => {
            node.content = (parse(
              `${html}<script>${output.output[0].code}</script>`
            ) as unknown) as PostHTML.Node[];

            return (node.content as unknown) as PostHTML.Node;
          });

          resolve();
        });

        return node;
      });

      await Promise.resolve(promise);

      resolve(tree);
    });
  };
}

export { plugin };
