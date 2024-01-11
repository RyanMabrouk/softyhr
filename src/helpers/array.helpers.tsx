export function removeDuplicateObjectsFromArray(array: any[], key: string) {
  return array.filter(
    (obj, index, self) => index === self.findIndex((t) => t[key] === obj[key]),
  );
}
export function checkIfOjectValuesAreEmpty(obj: any) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "") return false;
  }
  return true;
}
