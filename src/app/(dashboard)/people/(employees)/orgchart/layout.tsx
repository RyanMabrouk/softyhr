import { ReactNode } from "react";
import OrgChartContainer from "./_ui/OrgChartContainer";
interface EmployeesPropsType {
  children: ReactNode;
}
function layout({ children }: EmployeesPropsType) {
  return (
    <div className="mt-4">
      <OrgChartContainer />
    </div>
  );
}
export default layout;
