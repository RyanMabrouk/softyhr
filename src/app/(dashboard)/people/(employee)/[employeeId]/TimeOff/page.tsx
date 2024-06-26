import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { PolyciesSwiper } from "./components/PolyciesSwiper";
import { MdOutlineWatchLater } from "react-icons/md";
import { Hr } from "./components/Hr";
import { History } from "./components/History/History";
import { HistoryTableFiltersProvider } from "./context/historyTableFilters";
import { UpcomingTimeOff } from "./components/UpcomingTimeOff";
import { ChangeAccrualStartBtn } from "./components/Buttons/ChangeAccrualStartBtn";
import { AddTimeOffPolicyBtn } from "./components/Buttons/AddTimeOffPolicyBtn";
import { ToggleDateSortContextProvider } from "./context/toggleDateSortContext";
import { LeaveDataHydration } from "../../../../../../provider/LeaveDataHydration";
import RoleGuard from "@/app/_ui/RoleGuard";
import getTranslation from "@/translation/getTranslation";
export default async function Page() {
  const { lang } = await getTranslation();
  return (
    <RoleGuard permissions={["read:Employees policies"]}>
      <LeaveDataHydration>
        <main className="flex h-full w-full flex-col gap-2 py-4 pb-20 pl-8">
          <header className="w-full">
            <div className="flex flex-row items-center justify-between py-1">
              <div className="flex flex-row items-center gap-1">
                <FaBusinessTime className="h-8 w-8 text-fabric-700" />
                <div className="text-2xl font-normal text-fabric-700 ">
                  {lang?.["Time Off"]?.["Time Off"]}
                </div>
              </div>
              <RoleGuard permissions={["access:/Settings/TimeOff"]}>
                <div className="flex flex-row items-center gap-2 leading-8 text-gray-25">
                  <span className=" max-h-[2rem] whitespace-nowrap">
                    {lang?.["Time Off"]["Accrual Level Start Date:"]}
                  </span>
                  <ChangeAccrualStartBtn />
                  <AddTimeOffPolicyBtn />
                </div>
              </RoleGuard>
            </div>
          </header>
          <Hr />
          <RoleGuard permissions={["read:Employees policies"]}>
            <PolyciesSwiper />
          </RoleGuard>
          <RoleGuard permissions={["read:Employees upcoming time off"]}>
            <section className="mt-4 flex flex-col justify-center gap-1">
              <div className="mb-2 flex flex-row items-center gap-1">
                <MdOutlineWatchLater className="h-6 w-6" />
                <h1 className="font-bold">
                  {lang?.["Time Off"]["Upcoming Time Off"]}
                </h1>
              </div>
              <Hr />
              <UpcomingTimeOff />
            </section>
          </RoleGuard>
          <RoleGuard permissions={["read:Employees history"]}>
            <HistoryTableFiltersProvider>
              <ToggleDateSortContextProvider>
                <History />
              </ToggleDateSortContextProvider>
            </HistoryTableFiltersProvider>
          </RoleGuard>
        </main>
      </LeaveDataHydration>
    </RoleGuard>
  );
}
