export const LayoutRoute = [
  { label: "Home", pathFn: () => "/home" },
  {
    label: "My info",
    pathFn: (firstPath: string, employeId: number) =>
      `/people/${employeId}/${firstPath}`,
  },
  { label: "People", pathFn: () => "/people" },
  { label: "Hiring", pathFn: () => "/Hiring" },
  { label: "Reports", pathFn: () => "/Reports" },
  { label: "Files", pathFn: () => "/Files" },
];

export interface LayoutRouteType {
  label: string;
  pathFn: (arg0: string, arg1: number) => string;
}
