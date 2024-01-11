export function monthsAgo(inputDate:string) {
  // Parse the input date
  console.log(inputDate);
  const date = new Date(inputDate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in months
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
