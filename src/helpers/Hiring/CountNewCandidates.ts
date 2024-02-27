export function NewCandidates(array: any) {
  const current_date = new Date();
  current_date.setDate(current_date.getDate() - 3);
  const NewCandidates = array?.filter((candidate: any) => {
    if (
      new Date(candidate?.created_at).getFullYear() ==
        new Date(current_date).getFullYear() &&
      new Date(candidate?.created_at).getMonth() ==
        new Date(current_date).getMonth() &&
      new Date(candidate?.created_at).getDate() >
        new Date(current_date).getDate() - 3
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
    metadata[key] = value;
  });
  return { ...data, metadata };
}
