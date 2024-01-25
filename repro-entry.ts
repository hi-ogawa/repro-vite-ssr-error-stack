function f2() {
  const e = new Error('hi');
  console.log('[before ssrFixStacktrace]');
  console.log(e);
  console.log('[after ssrFixStacktrace]');
  globalThis.__ssrFixStacktrace(e);
  console.log(e);
}

function f1() {
  f2();
}

export function main() {
  f1();
}
