import { ReactNode } from "react";
interface EmployeesPropsType {
  children: ReactNode;
}
export default function layout({ children }: EmployeesPropsType) {
  return <>{children}</>;
}
