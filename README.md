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

# with ViteRuntime.executeEntrypoint
$ node repro2.mjs
[vite] connected.
[before ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:4:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:12:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro2.mjs:9:5
[after ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:2:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:11:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro2.mjs:9:5
```
