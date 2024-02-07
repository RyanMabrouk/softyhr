import { ReactNode } from "react";
import SectionTitleIconBox from "../components/SectionTitleIconBox";
import { RiShareBoxFill } from "react-icons/ri";
import ButtonAdd from "../components/ButtonAdd";
import PeopleRouteLink from "../components/PeopleRouteLink";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";

interface EmployeesPropsType {
  children: ReactNode;
}

function layout({ children }: EmployeesPropsType) {
  return (
    <div className="mt-6">
      <div className="mx-auto flex w-[85rem] items-center justify-between border-b border-gray-4 pb-4 ">
        <div className="flex flex-col  gap-6">
          <SectionTitleIconBox />
          <Link
            href="/people/NewEmployee"
            className={`focus-within:shadow-green flex w-36 items-center justify-center gap-1 rounded-md border border-fabric-700 px-2 py-1 text-[0.95rem] font-semibold text-fabric-700 duration-200 ease-linear hover:bg-fabric-700 hover:text-white`}
          >
            <IoMdAddCircleOutline className="h-5 w-5" />
            <span>New Employee</span>
          </Link>
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
