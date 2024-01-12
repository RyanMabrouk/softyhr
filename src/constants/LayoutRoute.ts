export const LayoutRoute: LayoutRouteType[] = [
  {
    label: "Home",
    pathFn: (currentPath) => currentPath.includes("/home"),
    defaultPath: () => "/home",
  },
  {
    label: "My info",
    pathFn: (currentPath, employeId) =>
      currentPath.includes(`/people/${employeId}`),
    defaultPath: (employeId: string) => `/people/${employeId}/personnal`,
  },
  {
    label: "People",
    pathFn: (currentPath, employeId) =>
      currentPath.includes("/people") &&
      !currentPath.includes(`/people/${employeId}`),
    defaultPath: () => "/people",
  },
  {
    label: "Hiring",
    pathFn: (currentPath) => currentPath.includes("/Hiring"),
    defaultPath: () => "/Hiring",
  },
  {
    label: "Reports",
    pathFn: (currentPath) => currentPath.includes("/Reports"),
    defaultPath: () => "/Reports",
  },
  {
    label: "Files",
    pathFn: (currentPath) => currentPath.includes("/Files"),
    defaultPath: () => "/Files",
  },
];

export interface LayoutRouteType {
  label: string;
  pathFn: (currentPath: string, arg0: string) => boolean;
  defaultPath: (arg0: string) => string;
}
