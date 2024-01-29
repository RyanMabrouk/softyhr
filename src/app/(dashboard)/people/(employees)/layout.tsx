import { ReactNode } from "react";
import SectionTitleIconBox from "../components/SectionTitleIconBox";
import { RiShareBoxFill } from "react-icons/ri";
import ButtonAdd from "../components/ButtonAdd";
import PeopleRouteLink from "../components/PeopleRouteLink";

interface EmployeesPropsType {
  children: ReactNode;
}

function layout({ children }: EmployeesPropsType) {
  return (
    <div className="mx-auto mt-6 w-files_screen">
      <div className="flex items-center justify-between border-b border-gray-4 pb-4">
        <div className="flex flex-col  gap-6">
       {/*<SectionTitleIconBox />*/}
          <ButtonAdd name={"New Employee"} />
        </div>
        <div className="flex flex-col items-end gap-8">
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-color5-500 hover:text-fabric-600 hover:underline "
          >
            <RiShareBoxFill className={"text-sm text-color5-500 "} />
            Quick Access to the Directory
          </a>
          <div className="-mb-4 flex items-center gap-8">
            <PeopleRouteLink href={"/people/list"} />
            <PeopleRouteLink href={"/people/directory"} />
            <PeopleRouteLink href={"/people/orgchart"} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
export default layout;
