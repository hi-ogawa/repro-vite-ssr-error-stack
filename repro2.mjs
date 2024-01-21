import { createServer, createViteRuntime } from 'vite'

const server = await createServer()
const runtime = await createViteRuntime(server)

globalThis.__ssrFixStacktrace = server.ssrFixStacktrace; // expose globally

const mod = await runtime.executeEntrypoint('./repro-entry.ts');
mod.main();

await server.close();
