import React, { ReactNode } from "react";
import { Footer } from "@/app/_ui/Footer";
import UserInfo from "../../components/UserInfo/UserInfo";
import { EmplyoeeDataHydration } from "@/provider/EmplyoeeDataHydration";
import { Profile } from "./Profile";
interface EmployePropsType {
  params: { employeeId: string };
  children: ReactNode;
}
export default async function Layout({
  params: { employeeId },
  children,
}: EmployePropsType) {
  return (
    <EmplyoeeDataHydration employeeId={employeeId}>
      <div className="flex h-full w-screen flex-col">
        <Profile />
        <div className="flex h-fit w-full grow pl-[12%] pr-[15%]">
          <UserInfo employeeId={employeeId} />
          {children}
        </div>
        <Footer />
      </div>
    </EmplyoeeDataHydration>
  );
}
