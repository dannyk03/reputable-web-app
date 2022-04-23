export function XOR(a: boolean, b: boolean) {
  return (a || b) && !(a && b);
}

export function convertMinsToHrsMins(mins: number) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  return `${h} hr ${m} min`;
}
