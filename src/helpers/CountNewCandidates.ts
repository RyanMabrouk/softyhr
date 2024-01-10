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
