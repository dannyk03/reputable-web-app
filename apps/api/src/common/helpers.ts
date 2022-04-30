export function XOR(a: boolean, b: boolean) {
  return (a || b) && !(a && b);
}

export function convertMinsToHrsMins(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hr ${m} min`;
}

export const makeArray = (v: any) => {
  return Array.isArray(v) ? v : [v];
};

export function mapFromArray<T extends Record<string, any>>(
  arr: T[],
  keyMapperFn: (obj: T) => string,
) {
  const map = new Map<string, T | T[]>();
  arr.map((object) => {
    const key = keyMapperFn(object);
    // Make value an array of objects if trying to set a key again.
    if (map.has(key)) {
      const v = map.get(key);
      const prevValue = Array.isArray(v) ? v : [v];
      map.set(key, [...prevValue, object]);
    } else {
      map.set(keyMapperFn(object), object);
    }
  });
  return map;
}
