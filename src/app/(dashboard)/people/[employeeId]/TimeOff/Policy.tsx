import React from "react";
import { IoMdSettings } from "react-icons/io";
import { AddLeaveRequestBtn } from "./_ui/Buttons/AddLeaveRequestBtn";
import { AdjustLeavePolicyBalanceBtn } from "./_ui/Buttons/AdjustLeavePolicyBalanceBtn";
import { FaCalculator } from "react-icons/fa6";
import { databese_leave_categories_track_time_unit_type } from "@/types/database.tables.types";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
export function Policy({
  id,
  icon,
  hours_scheduled,
  hours_available,
  name,
  title,
  category_time_unit,
}: {
  id: number;
  icon: React.ReactNode;
  hours_scheduled: number;
  hours_available: number;
  name: string;
  title: string;
  category_time_unit: databese_leave_categories_track_time_unit_type;
}) {
  return (
    <div className="group relative flex h-fit w-fit  flex-col items-center justify-between gap-1 pt-6 ">
      <div className="flex min-w-[20rem] flex-col items-center justify-center gap-1 rounded-md  bg-gray-14 px-[auto] py-3 group-hover:rounded-b-none  group-hover:bg-gray-17">
        <span className="mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold capitalize leading-[1.467rem] text-[rgb(34,34,34)]">
          {title}
        </span>
        <div className="flex flex-row items-center gap-1">
          {icon}
          <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-[2.266rem] font-bold leading-[2.8rem]  text-fabric-700 ">
            {formatTotalHoursToTimeUnit(hours_available, category_time_unit, {
              remove_time_unit: true,
            })}
          </span>
        </div>
        <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold capitalize leading-[1.467rem] text-fabric-700">
          {`${category_time_unit} Available`}
        </span>
        <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal leading-[1.467rem] text-gray-21">
          {`${formatTotalHoursToTimeUnit(
            hours_scheduled,
            category_time_unit,
          )} scheduled`}
        </span>
      </div>
      <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap pb-4 pt-1  text-sm font-normal leading-[1.467rem] text-gray-21">
        {name}
      </span>
      <div className="absolute bottom-2 box-border flex h-11 w-full -translate-y-5 flex-row-reverse items-center justify-center gap-1  rounded-b-md border-2 border-solid border-gray-17 bg-[white] py-3  text-center capitalize text-gray-21 opacity-0 transition-all delay-[0s] duration-[0.15s] ease-[ease-in-out] group-hover:translate-y-0 group-hover:opacity-100">
        <span className="peer cursor-pointer text-sm hover:text-fabric-700">
          chnage policy
        </span>
        <IoMdSettings className="order-0 h-4 w-4 peer-hover:text-fabric-700" />
      </div>
      <div className="absolute -top-2 box-border flex  w-full -translate-x-5 translate-y-10 flex-row items-center justify-center gap-2 rounded-[0px_0px_8px_8px] border-solid  border-[10px_2px_2px] py-3 text-center text-gray-25 opacity-0 transition-all delay-[0s] duration-[0.1s] ease-[ease-in-out] group-hover:translate-x-0 group-hover:translate-y-0  group-hover:opacity-100">
        <AddLeaveRequestBtn id={id} />
        <FaCalculator className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-black bg-white px-2 text-center " />
        <AdjustLeavePolicyBalanceBtn id={id} />
      </div>
    </div>
  );
}
