export function NewCandidates(array: any) {
  const current_date = new Date();
  current_date.setDate(current_date.getDate() - 3);
  const NewCandidates = array?.filter((candidate: any) => {
    if (
      new Date(candidate?.created_at).getFullYear() == current_date.getFullYear() &&
      new Date(candidate?.created_at).getMonth() == current_date.getMonth() &&
      new Date(candidate?.created_at).getDay() > current_date.getDay() - 3
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
