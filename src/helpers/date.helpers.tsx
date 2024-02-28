//Check if date is valid
export function InvalidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime()) ? "" : "Invalid Date";
}
// format date to 31/12/2024
export function formatDDMMYYYY(date: Date) {
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
// format date to 'Wed, Jul 31' short format
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
// Check if a date range is in an array of date ranges
export function DateRangeIsInAnArrayOfDateRanges(
  date_range: { start_at: Date; end_at: Date },
  array_of_date_ranges: { start_at: Date; end_at: Date }[],
): boolean {
  array_of_date_ranges.map((date_range_in_array) => {
    if (
      (+date_range.start_at >= +date_range_in_array.start_at &&
        +date_range.end_at <= +date_range_in_array.end_at) ||
      (+date_range.start_at <= +date_range_in_array.start_at &&
        +date_range.end_at >= +date_range_in_array.end_at)
    ) {
      return true;
    }
  });
  return false;
}
// get the diff of years between two dates
export function getYearDiff(startDate: Date, endDate: Date) {
  const ms = endDate.getTime() - startDate.getTime();

  const date = new Date(ms);

  return Math.abs(date.getUTCFullYear() - 1970);
}
// Format the string with leading zeroes
export function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const clockStr = `${hours.toString().padStart(2, "0")} : ${minutes
    .toString()
    .padStart(2, "0")}`;
  return String(clockStr);
}
// get the format DD/MM/YYYY from supabase created at format

export function formatDateFiles(date: any) {
  const day = date?.slice(8, 10);
  const month = date?.slice(5, 7);
  const year = date?.slice(0, 4);

  return `${day}/${month}/${year}`;
}
// get the years and days since a date
export function YearsAndDaysSinceDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  return `${years}y - ${days - years * 365}d`;
}
export function formatCustomDate(inputDate: string) {
  const date = new Date(inputDate);
  if (InvalidDate(date)) return;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
export function monthsAgo(inputDate: string) {
  const date = new Date(inputDate);

  const currentDate = new Date();

  const monthsDifference =
    (currentDate.getFullYear() - date.getFullYear()) * 12 +
    currentDate.getMonth() -
    date.getMonth();

  if (monthsDifference === 0) {
    return "This month";
  } else if (monthsDifference === 1) {
    return "1 month ago";
  } else if (monthsDifference > 1) {
    return `${monthsDifference} months ago`;
  } else {
    return "Invalid date";
  }
}
export function DaysAgo(inputDate: string) {
  const date = new Date(inputDate);
  const currentDate = new Date();

  const differenceInMillis = currentDate.getTime() - date.getTime();
  const differenceInSeconds = differenceInMillis / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays === 0) {
    if (differenceInHours < 1) {
      if (differenceInMinutes < 1) {
        return "just now";
      } else {
        return `${Math.floor(differenceInMinutes)} minutes ago`;
      }
    } else if (differenceInHours < 24) {
      return `${Math.floor(differenceInHours)} hours ago`;
    }
  } else if (differenceInDays === 1) {
    return "yesterday";
  } else if (differenceInDays >= 2 && differenceInDays <= 7) {
    return `${differenceInDays} days ago`;
  } else {
    // If it's more than 7 days ago, return the actual date
    const options: any = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
}
// get the date of the last day of the week
export function getSaturday(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 6 - date.getDay(),
  );
}
// get the date of the last day of the month
export function lastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
// get the date of the first day of the month
export function firstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
// get the date of the first day of the week
export function getSunday(date: Date) {
  const day = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
}

//calculate the years difference between date and current date
export function calculateYearDiff(dateString: string) {
  var birthday = new Date(dateString);
  var today = new Date();

  var age = today.getFullYear() - birthday.getFullYear();
  var monthDiff = today.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}
