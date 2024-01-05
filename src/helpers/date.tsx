export function formatDDMMYYYY(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}
export function formatDate(start_at: string, end_at: string) {
  const start = new Date(start_at);
  const end = new Date(end_at);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  });
  if (sameDay(start, end)) {
    return formatter.format(start);
  }
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}
export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
