interface FormdataObjectType {
  [key: string]: FormDataEntryValue;
}

export function FormdataToObject(formdata: FormData) {
  var object: FormdataObjectType = {};
  formdata.forEach(function (value: FormDataEntryValue, key: string) {
    object[key] = value;
  });
  return object;
}
