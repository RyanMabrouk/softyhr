//Check if date is valid
export function InvalidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime()) ? "" : "Invalid Date";
}
// format date to 31/12/2024
export function formatDDMMYYYY(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  return new Date(date).toLocaleDateString("en-GB");
}
// format date to 2024-12-31
export function formatYYYYMMDD(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// format date to Jan 31 - Jul 02
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
// format date to 'Mon, 31' short format
export function formatDateToDayMonDD(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
  return formatter.format(date);
}
// get the days in between two dates
export function getDaysInBetween(startDate: Date, endDate: Date) {
  if (InvalidDate(startDate)) return [];
  if (InvalidDate(endDate)) return [];
  let dates: Date[] = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate <= endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
}
// add one day to a date
export function addOneDay(date: Date) {
  return new Date(date.setDate(date.getDate() + 1));
}
// format date to 'Feb 17, 2021' format
export function formatDateToMonDDYYYY(date: Date) {
  if (InvalidDate(date)) return InvalidDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatter.format(date);
}
