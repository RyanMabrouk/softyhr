//Check if date is valid
export function InvalidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime()) ? "" : "Invalid Date";
}
// format date to DD/MM/YYYY
export function formatDDMMYYYY(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  return new Date(date).toLocaleDateString("en-GB");
}
// format date to YYYY-MM-DD
export function formatYYYYMMDD(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  return new Date(date).toISOString().split("T")[0];
}
// format date to MMDD - MMDD
export function formatDateMMDD(start_at: Date, end_at: Date) {
  if (InvalidDate(start_at)) return InvalidDate(start_at);
  if (InvalidDate(end_at)) return InvalidDate(end_at);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  });
  if (sameDay(start_at, end_at)) {
    return formatter.format(start_at);
  }
  return `${formatter.format(start_at)} - ${formatter.format(end_at)}`;
}
// Check if two dates are the same day
export function sameDay(d1: Date, d2: Date) {
  if (InvalidDate(d1)) return InvalidDate(d1);
  if (InvalidDate(d2)) return InvalidDate(d2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
// calculate the difference between two dates in hours
export function timeDiffInHours(start: Date, end: Date) {
  if (InvalidDate(start)) return InvalidDate(start);
  if (InvalidDate(end)) return InvalidDate(end);
  return Math.abs(end.getTime() - start.getTime()) / 36e5;
}
// format date to 'day of the week,month day' short format
export function formatDateToDayMonDD(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
  return formatter.format(date);
}

// get the diff of years between two dates
export function getYearDiff(startDate: Date, endDate: Date) {
  const ms = endDate.getTime() - startDate.getTime();

  const date = new Date(ms);

  return Math.abs(date.getUTCFullYear() - 1970);
}

export function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Format the string with leading zeroes
  const clockStr = `${hours.toString().padStart(2, "0")} : ${minutes
    .toString()
    .padStart(2, "0")}`;

  return String(clockStr);
}
