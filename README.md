investigating `ssrFixStacktrace` https://github.com/vitejs/vite/issues/15490

also testing with `ViteRuntime.executeEntrypoint` from https://github.com/vitejs/vite/pull/12165

```sh
# with ViteDevServer.ssrLoadModule
$ node repro.mjs
[before ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:4:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:12:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro.mjs:7:5
[after ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:2:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:11:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro.mjs:7:5

# with ViteRuntime.executeEntrypoint (ssrFixStacktrace is not neceessary and it would throw)
$ node repro2.mjs
vite] connected.
[before ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:2:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:11:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro2.mjs:9:5
[after ssrFixStacktrace]
file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:10294
            throw new Error(LINE_GTR_ZERO);
                  ^

Error: `line` must be greater than 0 (lines start at line 1)
    at originalPositionFor$1 (file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:10294:19)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:53979:25
    at String.replace (<anonymous>)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:53970:21
    at Array.map (<anonymous>)
    at ssrRewriteStacktrace (file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:53969:10)
    at ssrFixStacktrace (file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:54022:24)
    at ssrFixStacktrace (file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:63774:13)
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:6:14)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:11:3)
```
