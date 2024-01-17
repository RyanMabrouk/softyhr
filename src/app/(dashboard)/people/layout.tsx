import { ReactNode } from "react";
interface EmployeesPropsType {
  children: ReactNode;
}
function layout({ children }: EmployeesPropsType) {
  return children;
}
export default layout;
