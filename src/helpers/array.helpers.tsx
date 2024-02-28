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
// A function to extract value as an array and compare them
export function equalsCheck(a: any, b: any) {
  if (a?.length != b?.length) {
    return false;
  } else {
    let result = false;
    for (let i = 0; i < a?.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      } else {
        result = true;
      }
    }
    return result;
  }
}
