import { ReactNode } from "react";
interface EmployeesPropsType {
  children: ReactNode;
}
function layout({ children }: EmployeesPropsType) {
  return <div className="mx-auto mt-12 w-[85rem]">{children}</div>;
}
export default layout;
