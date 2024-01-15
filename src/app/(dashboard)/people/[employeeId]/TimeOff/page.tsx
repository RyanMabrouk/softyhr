import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { PolyciesSwiper } from "./PolyciesSwiper";
import { MdOutlineWatchLater } from "react-icons/md";
import { Hr } from "./_ui/Hr";
import { History } from "./History";
import { HistoryTableFiltersProvider } from "./_context/historyTableFilters";
import { UnderlinedLink } from "../../../../_ui/UnderlinedLink";
import { UpcomingTimeOff } from "./UpcomingTimeOff";

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col gap-2 py-4 pb-20 pl-8">
      <header className="w-full">
        <div className="flex flex-row items-center justify-between py-1">
          <div className="flex flex-row items-center gap-1">
            <FaBusinessTime className="h-8 w-8 text-fabric-700" />
            <div className="text-2xl font-normal text-fabric-700 ">
              Time Off
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 leading-8 text-gray-25">
            <span className=" max-h-[2rem] whitespace-nowrap">
              Accrual Level Start Date:
            </span>
            <UnderlinedLink>12/02/2020</UnderlinedLink>
            <button className="relative m-0 box-border inline-flex h-full w-full min-w-0 cursor-pointer select-none appearance-none items-center justify-center rounded border border-solid border-gray-25 bg-transparent px-[15px] py-[5px] align-middle text-[0.9375rem] font-bold normal-case  leading-[1.75] text-gray-25 no-underline shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px]">
              Add Time Off Policy
            </button>
          </div>
        </div>
        <div></div>
      </header>
      <Hr />
      <PolyciesSwiper />
      <section className="mt-4 flex flex-col justify-center gap-1">
        <div className="mb-2 flex flex-row items-center gap-1">
          <MdOutlineWatchLater className="h-6 w-6" />
          <h1 className="font-bold">Upcoming Time Off</h1>
        </div>
        <Hr />
        <UpcomingTimeOff />
      </section>
      <HistoryTableFiltersProvider>
        <History />
      </HistoryTableFiltersProvider>
    </main>
  );
}
