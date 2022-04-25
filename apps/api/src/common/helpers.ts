export function XOR(a: boolean, b: boolean) {
  return (a || b) && !(a && b);
}

export function convertMinsToHrsMins(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hr ${m} min`;
}

export function mapFromArray<T extends Record<string, any>>(
  arr: T[],
  keyMapperFn: (obj: T) => string,
) {
  const map = new Map<string, T>();
  arr.map((object) => {
    map.set(keyMapperFn(object), object);
  });
  return map;
}
