import { createServer, createViteRuntime } from 'vite'

const server = await createServer()
const runtime = await createViteRuntime(server, {
  // default for process.setSourceMapsEnabled(true)
  // sourcemapInterceptor: "node",
})

globalThis.__ssrFixStacktrace = server.ssrFixStacktrace; // expose globally

const mod = await runtime.executeEntrypoint('./repro-entry.ts');
mod.main();

await server.close();
