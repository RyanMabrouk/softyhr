export function removeDuplicateObjectsFromArray(array: any[], key: string) {
  return array.filter(
    (obj, index, self) => index === self.findIndex((t) => t[key] === obj[key]),
  );
}
