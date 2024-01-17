import { InvalidDate } from "./date.helpers";
export function formatCustomDate(inputDate: string) {
  const date = new Date(inputDate);
  if (InvalidDate(date)) return;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
