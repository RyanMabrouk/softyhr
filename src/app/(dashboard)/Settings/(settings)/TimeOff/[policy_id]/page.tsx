"use client";
import { HistoryTable } from "@/app/(dashboard)/people/[employeeId]/TimeOff/HistoryTable";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import useData from "@/hooks/useData";
import {
  database_profile_leave_balance_type,
  database_profile_type,
} from "@/types/database.tables.types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import {
  MdOutlineAddCircle,
  MdOutlineMoreTime,
  MdTimelapse,
} from "react-icons/md";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";
import usePolicy from "@/hooks/useCategory";
import { EmployyeSettingsBtn } from "./EmployyeSettingsBtn";
import useLeaveData from "@/hooks/useLeaveData";
import { BsPlusSlashMinus } from "react-icons/bs";
export default function Page() {
  const pathname = usePathname();
  const { policy_id } = useParams();
  const {
    all_users_leave_balance: { data: all_users_leave_balance },
  } = useLeaveData();
  const {
    all_profiles_basic_info: { data: all_profiles_basic_info },
  } = useData();
  const { policy, category } = usePolicy({ policy_id: Number(policy_id) });
  const policy_type =
    policy?.type === "traditional" ? (
      <>
        <MdTimelapse className="h-5 w-5" />
        <span>Accruing Policy</span>
      </>
    ) : policy?.type === "manual" ? (
      <>
        <BsPlusSlashMinus className="h-5 w-5" />
        <span>Manually Updated Policy</span>
      </>
    ) : (
      <>
        <MdOutlineMoreTime className="h-5 w-5" />
        <span>Flexible Policy</span>
      </>
    );
  return (
    <div className="flex h-full min-w-full flex-col px-6 py-4">
      <header className="flex flex-row items-center gap-1">
        {generateLeaveCategorieIcon({
          categorie: category,
          className: "h-6 w-6 text-fabric-700",
        })}
        <span className="text-xl text-black opacity-85">{policy?.name}</span>
      </header>
      <section className="flex-rox mb-4 flex items-center justify-between">
        <div className="mb-1 mt-5 flex flex-row gap-4 ">
          <Link
            href={{
              pathname: pathname,
              query: { popup: "ADD_EMPLOYEES_TO_POLICY" },
            }}
            className=" flex h-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-fabric-600 px-2 py-1 text-center text-[0.9rem] font-semibold text-fabric-700 shadow-sm transition-all ease-linear hover:border-fabric-600 hover:text-fabric-600 hover:shadow-md"
          >
            <MdOutlineAddCircle />
            <span>Add Employees</span>
          </Link>
          <Link
            href={{
              pathname: pathname,
              query: { popup: "EDIT_POLICY_NAME" },
            }}
            className=" flex h-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-gray-21 px-2 py-1 text-center text-[0.9rem] font-semibold text-gray-21 shadow-sm transition-all ease-linear hover:shadow-md"
          >
            <FaPen />
            <span>Edit Policy</span>
          </Link>
        </div>
        <div className="mb-1 mt-5 flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-0.5 text-gray-21">
            {policy_type}
          </div>
          <Link
            href={{
              pathname: pathname,
              query: { popup: "DELETE_LEAVE_POLICY_DATA" },
            }}
            className="flex h-9 w-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-gray-21 px-2 py-1 text-center text-[0.9rem] font-semibold text-gray-21 shadow-sm transition-all ease-linear hover:shadow-md"
          >
            <FaTrash />
          </Link>
        </div>
      </section>
      {
        <HistoryTable
          emptyMessage="No employees in this policy"
          Headers={["Name", "Status", "Balance", " "]}
          layout="grid-cols-[1fr,1fr,1fr,1fr]"
          data={
            all_users_leave_balance
              ?.filter(
                (p: database_profile_leave_balance_type) =>
                  p.policy_id === Number(policy_id),
              )
              ?.map((e: database_profile_leave_balance_type) => {
                const user = all_profiles_basic_info?.find(
                  (p: database_profile_type) => p.user_id === e.user_id,
                );
                const username = `${user?.["Basic Information"]?.["First name"]} ${user?.["Basic Information"]?.["Last name"]}`;
                return {
                  Name: (
                    <Link
                      href={{
                        pathname: `/people/${e.user_id}/personnal`,
                      }}
                    >
                      <UnderlinedLink>{username}</UnderlinedLink>
                    </Link>
                  ),
                  Status: e.status,
                  Balance: e.balance,
                  " ": (
                    <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
                      <EmployyeSettingsBtn employeeId={e.user_id} />
                    </div>
                  ),
                };
              }) ?? []
          }
        />
      }
    </div>
  );
}
