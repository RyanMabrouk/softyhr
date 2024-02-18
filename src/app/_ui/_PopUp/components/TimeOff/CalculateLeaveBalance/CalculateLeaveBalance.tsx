"use client";
import React, { useEffect, useState } from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/app/_ui/Button";
import useEmployeeData from "@/hooks/useEmloyeeData";
import default_avatar from "/public/default_avatar.jpeg";
import Image from "next/image";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import {
  database_profile_leave_balance_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";
import usePolicy from "@/hooks/TimeOff/usePolicy";
import {
  formatTotalHoursToTimeUnit,
  numberOfdaysInArrayOfDatesBeforeDay,
} from "@/helpers/leave.helpers";
import useData from "@/hooks/useData";
export default function CalculateLeaveBalance() {
  const Router = useRouter();
  const pathname = usePathname();
  const {
    user_profile: { data: user_profile },
  } = useData();
  const employeeId = useParams().employeeId ?? user_profile?.user_id;
  const policy_id = useSearchParams().get("policy_id");
  const { category: initial_category } = usePolicy({
    policy_id: Number(policy_id),
  });
  const [policyId, setPolicyId] = useState<string | null>(policy_id);
  const [chalendarDate, setCalendarDate] = React.useState<Date>(new Date());
  const {
    leave_balance: { data: leave_balance },
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: String(employeeId) });
  const current_policy_balance:
    | database_profile_leave_balance_type
    | undefined = leave_balance?.find(
    (balance: database_profile_leave_balance_type) =>
      balance.policy_id === Number(policyId),
  );
  const [balance, setBalance] = useState<number>(
    current_policy_balance?.balance ?? 0,
  );
  const { policy, category } = usePolicy({ policy_id: Number(policyId) });
  const {
    leave_categories: { data: leave_categories },
  } = useLeaveData();
  useEffect(() => {
    setBalance(
      (current_policy_balance?.balance ?? 0) +
        numberOfdaysInArrayOfDatesBeforeDay(
          policy?.accrual_days?.map((date) => new Date(date)) ?? [],
          chalendarDate,
        ) *
          (policy?.accrual_value_in_hours ?? 0),
    );
  }, [chalendarDate, policy, current_policy_balance]);
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  return (
    <PopUpSkeleton
      title="Calculate Time Off"
      className="flex w-full min-w-[50rem] flex-col items-start  gap-4 self-stretch px-8 py-4"
    >
      <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
        <Image
          src={employee_profile?.picture ?? default_avatar}
          className="h-12 w-12 rounded-full"
          alt=""
          width={80}
          height={80}
        />
        <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
          {first_name + " " + last_name}
        </div>
      </header>
      <main className="mb-5 mt-3 flex flex-col justify-center gap-6 px-5">
        <div className="flex flex-row items-center gap-6">
          <SelectGeneric
            className=" !h-[2.625rem]"
            label="Time Odd Category"
            defaultValue={{
              label: initial_category?.name,
              value: Number(initial_category?.id),
            }}
            setValueInParent={(value) => setPolicyId(value)}
            options={leave_balance?.map(
              (balance: database_profile_leave_balance_type) => ({
                label: leave_categories?.find(
                  (category: databese_leave_categories_type) =>
                    balance.categories_id === category.id,
                )?.name,
                value: balance.policy_id,
              }),
            )}
          />
          <CalendarGeneric
            name="date"
            label="As of Date"
            required
            defaultValue={new Date()}
            setValueInParent={setCalendarDate}
            allowPreviousDates={false}
          />
        </div>
        <div className="flex w-full flex-row items-center gap-2 rounded-sm border border-gray-18 px-8 py-1 text-fabric-700">
          <span className=" text-[2.25rem] font-bold">
            {formatTotalHoursToTimeUnit(
              balance,
              category?.track_time_unit ?? "",
              {
                remove_time_unit: true,
              },
            )}
          </span>
          <span className="-mb-1 text-2xl">
            {category?.track_time_unit ?? ""}
          </span>
        </div>
      </main>
      <hr className="h-[3px] w-full bg-primary-gradient" />
      <Button
        className="ml-5 !max-w-[10rem] self-start"
        type="button"
        onClick={() => Router.push(pathname)}
      >
        Close
      </Button>
    </PopUpSkeleton>
  );
}
