export const wrapArray = <V>(value: V | V[]): V[] =>
  Array.isArray(value) ? value : [value]
