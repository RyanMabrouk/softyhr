export function allowDrop(ev: React.DragEvent<HTMLElement>) {
  ev.preventDefault();
}
export function drag(ev: React.DragEvent<HTMLDivElement>) {
  ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}
