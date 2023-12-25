export const LayoutRoute = [
  { label: "acceuil", pathFn: () => "/acceuil" },
  {
    label: "mes infos",
    pathFn: (firstPath: string, employeId: number) =>
      `/employees/${employeId}/${firstPath}`,
  },
  { label: "individus", pathFn: () => "/employees" },
  { label: "recrutement", pathFn: () => "/recrutement" },
  { label: "rapports", pathFn: () => "/rapports" },
  { label: "fichers", pathFn: () => "/fichers" },
];

export interface LayoutRouteType {
  label: string;
  pathFn: (arg0: string, arg1: number) => string;
}
