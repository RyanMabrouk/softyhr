import React, { ReactNode } from "react";
import { Footer } from "@/app/_ui/Footer";
import UserInfo from "../../components/UserInfo/UserInfo";
import { EmplyoeeDataHydration } from "@/provider/EmplyoeeDataHydration";
import { Content } from "./Content";
import { usePathname } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { EmployeeRoute } from "@/constants/employeeRoute";
interface EmployePropsType {
  params: { employeeId: string };
  children: ReactNode;
}
export default function Layout({
  params: { employeeId },
  children,
}: EmployePropsType) {
  const { employee_profile: data } = useEmployeeData({ employeeId });
  const ActiveRoute =
    usePathname().split("/").slice(-1).join("") || EmployeeRoute[0]?.label;
    
  return (
    <EmplyoeeDataHydration employeeId={employeeId}>
      <div className="flex h-full w-full flex-col">
        <Content />
        <div className="flex h-fit w-full grow pl-[12%] pr-[15%]">
          <UserInfo employeeId={employeeId} />
          {children}
        </div>
        <Footer />
      </div>
    </EmplyoeeDataHydration>
  );
}
