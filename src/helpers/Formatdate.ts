export function formatCustomDate(inputDate: string) {
  const date = new Date(inputDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })?.format(date);

  return formattedDate;
}
