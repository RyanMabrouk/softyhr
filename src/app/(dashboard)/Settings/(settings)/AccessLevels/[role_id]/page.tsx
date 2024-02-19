"use client";
import { HistoryTable } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/components/HistoryTable";
import useRoles from "@/hooks/useRoles";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { FaLock, FaPen } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import useProfiles from "@/hooks/useProfiles";
import useAllPermissions from "@/hooks/useAllPermissions";
import { sameDay } from "@/helpers/date.helpers";
import { SettingsBtn } from "./components/SettingsBtn";
import { EmployyeSettingsBtn } from "./components/EmployyeSettingsBtn";
import { EmployeeProfileLink } from "./components/EmployeeProfileLink";
export default function Page() {
  const { role_id } = useParams();
  const pathname = usePathname();
  const {
    roles: { data: roles },
  } = useRoles();
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const {
    permissions: { data: permissions },
  } = useAllPermissions();
  const role = roles?.find((role) => role.id === Number(role_id));
  const role_users = permissions
    ?.filter((p) => p.role_id === role?.id)
    .map((p) => p.user_id);
  const role_users_data = profiles?.filter((p) =>
    role_users?.includes(p.user_id),
  );
  return (
    <div className="flex h-full min-w-full flex-col gap-4 px-6 py-4">
      <div className="flex flex-col gap-2">
        <header className="flex flex-row items-center gap-1.5">
          <FaLock className="h-5 w-5 text-fabric-700" />
          <span className="text-xl text-black opacity-85 first-letter:capitalize">
            {role?.name}
          </span>
        </header>
        <span className=" text-[0.90rem] ">{role?.description ?? ""}</span>
      </div>
      <section className="flex-rox flex items-center justify-between">
        <div className="flex flex-row gap-4 ">
          <Link
            href={{
              pathname: pathname,
              query: { popup: "ADD_EMMPLOYEES_TO_ROLE" },
            }}
            className=" flex h-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-fabric-600 px-2 py-1 text-center text-[0.9rem] font-semibold text-fabric-700 shadow-sm transition-all ease-linear hover:border-fabric-600 hover:text-fabric-600 hover:shadow-md"
          >
            <MdOutlineAddCircle />
            <span>Add Employees</span>
          </Link>
          <Link
            href={{
              pathname: pathname,
              query: { popup: "" },
            }}
            className=" flex h-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-gray-21 px-2 py-1 text-center text-[0.9rem] font-semibold text-gray-21 shadow-sm transition-all ease-linear hover:shadow-md"
          >
            <FaPen />
            <span>Edit Access Level</span>
          </Link>
        </div>
        <SettingsBtn />
      </section>
      {
        <HistoryTable
          emptyMessage="No employees with this Access Level yet."
          Headers={["Name", "Last login", " "]}
          layout="grid-cols-[3fr,2fr,1fr]"
          data={role_users_data?.map((user) => ({
            Name: (
              <EmployeeProfileLink user_id={user.user_id}>
                {user?.["Basic Information"]?.["First name"] +
                  " " +
                  user?.["Basic Information"]?.["Last name"]}
              </EmployeeProfileLink>
            ),
            "Last login": user.last_signed_in
              ? sameDay(new Date(user.last_signed_in), new Date())
                ? "Today at " +
                  new Date(user.last_signed_in).toLocaleTimeString()
                : new Date(user.last_signed_in).toLocaleDateString() +
                  " at " +
                  new Date(user.last_signed_in).toLocaleTimeString()
              : "Never",
            " ": (
              <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
                <EmployyeSettingsBtn employeeId={user.user_id} />
              </div>
            ),
          }))}
        />
      }
    </div>
  );
}
