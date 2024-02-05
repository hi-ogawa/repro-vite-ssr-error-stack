// @ts-ignore
__myObject.BAD_KEY;

function f2() {
  const e = new Error('hi');
  console.log(":::: ERROR ::::")
  console.log(e);
}

function f1() {
  f2();
}

export function main() {
  f1();
}
