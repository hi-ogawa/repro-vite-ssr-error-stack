investigating https://github.com/vitejs/vite/issues/15771

```sh
$ node --enable-source-maps repro.mjs
Sourcemap for "/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts" points to missing source files
:::: transformRequest ::::
{
  code: 'var define_myObject_default = {};\n' +
    'define_myObject_default.BAD_KEY;\n' +
    'function f2() {\n' +
    '  const e = new Error("hi");\n' +
    '  console.log(":::: ERROR ::::");\n' +
    '  console.log(e);\n' +
    '}\n' +
    'function f1() {\n' +
    '  f2();\n' +
    '}\n' +
    'function main() {\n' +
    '  f1();\n' +
    '}\n' +
    'Object.defineProperty(__vite_ssr_exports__, "main", { enumerable: true, configurable: true, get(){ return main }});\n',
  map: SourceMap {
    version: 3,
    mappings: 'AAAA,GAAG,CAAC,uBAAuB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjC,uBAAuB,CAAC,OAAO,CAAC;AAChC,QAAQ,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;AACf,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;AAC5B,CAAC,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACjC,CAAC,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACjB,CAAC;AACD,QAAQ,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;AACf,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;AACP,CAAC;AACM,QAAQ,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC;AACxB,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;AACP;mHAAC',
    names: [],
    sourceRoot: undefined,
    sources: [ '<define:__myObject>' ],
    sourcesContent: [ null ],
    file: './repro-entry.ts'
  },
  deps: [],
  dynamicDeps: []
}
:::: ERROR ::::
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/<define:__myObject>:4:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/<define:__myObject>:9:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/<define:__myObject>:12:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro.mjs:13:5
```

---

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
...


# which is already the case with ViteDevServer.ssrLoadModule and --enable-source-maps
$ node --enable-source-maps repro.mjs
[before ssrFixStacktrace]
Error: hi
    at f2 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:2:13)
    at f1 (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:11:3)
    at Module.main (/home/hiroshi/Downloads/vite-ssr-error-stack/repro-entry.ts:15:3)
    at file:///home/hiroshi/Downloads/vite-ssr-error-stack/repro.mjs:7:5
[after ssrFixStacktrace]
file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:10294
            throw new Error(LINE_GTR_ZERO);
                  ^

Error: `line` must be greater than 0 (lines start at line 1)
    at originalPositionFor$1 (file:///home/hiroshi/Downloads/vite-ssr-error-stack/node_modules/.pnpm/@github.com+sapphi-red+vite-envs+raw+1df93407a0053bc838a8cf81753e48bfc912231a@vite-5.1.0-beta.2.tgz/node_modules/vite/dist/node/chunks/dep-hmIZjijq.js:10294:19)
...
```
