import { createServer } from 'vite';

const server = await createServer();
globalThis.__ssrFixStacktrace = server.ssrFixStacktrace; // expose globally

const mod = await server.ssrLoadModule('./repro-entry.ts');
mod.main();

await server.close();
