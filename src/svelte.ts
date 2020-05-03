import { PostHTML } from "posthtml";
import render from "posthtml-render";
import parse from "posthtml-parser";
import * as rollup from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import rollupSvelte from "rollup-plugin-svelte";
import virtual from "@rollup/plugin-virtual";
import path from "path";
import fs from "fs";
import "svelte/register";

const cache = path.join(__dirname, ".cache");

if (!fs.existsSync(cache)) {
  fs.mkdirSync(cache);
}

function plugin(opts?: { out?: string; currentDir: string; key?: string }) {
  return (tree: PostHTML.Node) => {
    return new Promise(async (resolve) => {
      let promise: undefined | Promise<void>;

      tree.match({ tag: "svelte" }, (node) => {
        promise = new Promise(async (resolve) => {
          let source = render(node.content);

          // TODO: [refactor] check AST vars instead simple script check
          const hasScript = node.content?.filter(
            (child) => (child as PostHTML.Node).tag === "script"
          )[0];

          // TODO: [refactor] use svelte compiler to walk and replace paths
          let imports: null | string[] = source.match(
            /(["'])(?:(?=(\\?))\2.)*?\1/g
          );

          if (imports && opts?.currentDir) {
            imports
              .filter((_) => _.includes(".svelte"))
              .map((_) => _.substr(1, _.length - 1))
              .forEach((partial) => {
                const { dir } = path.parse(partial);
                const resolved = path.resolve(
                  process.cwd(),
                  opts.currentDir,
                  dir
                );
                source = source.replace(dir, resolved);
              });
          }

          const name = (opts?.key || "Component") + ".svelte";
          const pathToSvelteFile = path.resolve(cache, name);

          fs.writeFileSync(pathToSvelteFile, source);

          const Component = require(pathToSvelteFile).default;
          const { html, head, css } = Component.render();

          tree.match({ tag: "head" }, (node) => {
            if (Boolean(head)) {
              node.content?.push((parse(head!) as unknown) as PostHTML.Node);
            }

            if (Boolean(css.code)) {
              node.content?.push(
                (parse(
                  `<style>${css.code}</style>`
                ) as unknown) as PostHTML.Node
              );
            }

            return node;
          });

          let output: rollup.RollupOutput;
          let fileSrc = "";

          if (hasScript) {
            const bundle = await rollup.rollup({
              input: "entry",
              plugins: [
                virtual({
                  entry: `
                  import Component from "${pathToSvelteFile}";
                  new Component({ target: document.body, hydrate: true });`,
                }),
                rollupSvelte({
                  css: false, // omit css from bundle because it's injected in the <head> element
                  hydratable: true,
                }),
                nodeResolve(),
              ],
            });

            output = await bundle.generate({});

            if (opts?.out) {
              const crypto = await import("crypto");

              fileSrc = `src.${crypto
                .createHash("md5")
                .update(source)
                .digest("hex")
                .slice(0, 12)}.js`;

              const terser = await import("terser");

              fs.writeFile(
                path.join(opts?.out, fileSrc),
                terser.minify(output.output[0].code).code,
                () => {}
              );
            }
          }

          if (hasScript) {
            tree.match({ tag: "svelte" }, (node) => {
              let script = `<script>${output.output[0].code}</script>`;

              if (opts?.out) {
                script = `<script src="${fileSrc}"></script>`;
              }

              node.content = (parse(
                `${html}${script}`
              ) as unknown) as PostHTML.Node[];

              return (node.content as unknown) as PostHTML.Node;
            });
          } else {
            tree.match({ tag: "body" }, (node) => {
              if (node.content) {
                node.content = node.content.filter(
                  (child) => (child as PostHTML.Node).tag !== "svelte"
                );
                node.content.unshift((parse(html) as unknown) as PostHTML.Node);
              }

              return (node.content as unknown) as PostHTML.Node;
            });
          }

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
