export const LayoutRoute = [
    {key:"acceuil",label:"acceuil", pathFn:() => "/acceuil"},
    {key:"mes ",label:"mes infos", pathFn:(firstPath :string, employeId :number)=> `/employees/${employeId}/${firstPath}`},
    {key:"acceuil",label:"individus", pathFn:() =>"/employees"},
    {key:"acceuil",label:"recrutement", pathFn:() =>"/recrutement"},
    {key:"acceuil",label:"rapports", pathFn:() =>"/rapports"},
    {key:"acceuil",label:"fichers", pathFn:() =>"/fichers"},
]

export interface LayoutRouteType {
  label: string;
  pathFn: (arg0: string , arg1: number) => string;
}