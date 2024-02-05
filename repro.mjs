import { createServer } from 'vite';

const server = await createServer({
  define: {
    __myObject: "{}"
  }
});
const transformed = await server.transformRequest("./repro-entry.ts", { ssr: true });
console.log(":::: transformRequest ::::")
console.log(transformed)

const mod = await server.ssrLoadModule('./repro-entry.ts');
mod.main();

await server.close();
