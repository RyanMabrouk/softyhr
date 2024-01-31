export function NewCandidates(array: any) {
  const current_date = new Date();
  current_date.setDate(current_date.getDate() - 3);
  const NewCandidates = array?.filter((candidate: any) => {
    if (
      new Date(candidate?.date).getFullYear() == current_date.getFullYear() &&
      new Date(candidate?.date).getMonth() == current_date.getMonth() &&
      new Date(candidate?.date).getDay() > current_date.getDay() - 3
    ) {
      return candidate;
    }
  });
  return NewCandidates?.length || 0;
}

export function FormulateFormData(formdata: FormData) {
  let metadata: any = {};
  let data: any = {};
  data["First Name"] = formdata.get("First Name");
  data["Last Name"] = formdata.get("Last Name");
  data["Email"] = formdata.get("Email");
  data["Phone"] = formdata.get("Phone");
  formdata.delete("First Name");
  formdata.delete("Last Name");
  formdata.delete("Email");
  formdata.delete("Phone");
  formdata.forEach(function (value: FormDataEntryValue, key: string) {
    console.log(key, value);
    metadata[key] = value;
  });
  return { ...data, metadata };
}
