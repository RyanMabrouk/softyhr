import { ReactNode } from "react";
import OrgChartContainer from "./_ui/OrgChartContainer";
interface EmployeesPropsType {
  children: ReactNode;
}
function layout({ children }: EmployeesPropsType) {
  return (
    <div className="mx-auto mt-12 w-files_screen">
      <OrgChartContainer />
    </div>
  );
}
export default layout;
