import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const html = await readFile(resolve(root, "index.html"), "utf8");
const css = await readFile(resolve(root, "app/globals.css"), "utf8");
const i18n = await readFile(resolve(root, "app/i18n.js"), "utf8");
const standaloneHtml = html
  .replace('<link rel="stylesheet" href="app/globals.css" />', `<style>${css}</style>`)
  .replace('<script src="app/i18n.js"></script>', `<script>${i18n}</script>`);
const worker = `const html = ${JSON.stringify(html)};
const css = ${JSON.stringify(css)};
const i18n = ${JSON.stringify(i18n)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/app/globals.css") {
      return new Response(css, {
        headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }
    if (url.pathname === "/app/i18n.js") {
      return new Response(i18n, {
        headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
};
`;

await mkdir(resolve(root, "dist/server"), { recursive: true });
await writeFile(resolve(root, "dist/server/index.js"), worker);
await mkdir(resolve(root, "outputs"), { recursive: true });
await writeFile(resolve(root, "outputs/StreamOne.html"), standaloneHtml);
console.log("StreamOne production bundle created.");
