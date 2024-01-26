import { ReactNode } from "react";
interface EmployeesPropsType {
  children: ReactNode;
}
function layout({ children }: EmployeesPropsType) {
  return <div className="mx-auto mt-12 w-files_screen">{children}</div>;
}
export default layout;
