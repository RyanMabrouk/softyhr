import { ReactNode } from "react";
interface EmployeesPropsType {
  children: ReactNode;
  params: { employeeId: string };
}
export default function layout({ children, params }: EmployeesPropsType) {
  return children;
}
