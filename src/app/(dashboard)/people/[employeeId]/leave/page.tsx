import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { PolyciesSwiper } from "./PolyciesSwiper";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Hr } from "./_ui/Hr";
import { History } from "./History";
import { HistoryTableFiltersProvider } from "./_context/historyTableFilters";
import { UnderlinedLink } from "./_ui/UnderlinedLink";
import { formatDate } from "@/helpers/date";
export default function Page() {
  const upcoming_vacations = [
    {
      id: 1,
      start_at: "2022-12-01",
      end_at: "2022-12-1",
      policy_title: "Winter Vacation",
      duration: "8 hours",
      icon: <FaBusinessTime className="h-11 w-11 text-fabric-700" />,
    },
    {
      id: 2,
      start_at: "2023-06-15",
      end_at: "2023-06-30",
      policy_title: "Summer Break",
      duration: "16 hours",
      icon: <FaBusinessTime className="h-11 w-11 text-fabric-700" />,
    },
    {
      id: 3,
      start_at: "2023-09-20",
      end_at: "2023-09-25",
      policy_title: "Short Getaway",
      duration: "32 hours",
      icon: <FaBusinessTime className="h-11 w-11 text-fabric-700" />,
    },
  ];
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
        <div className="flex flex-col">
          {upcoming_vacations?.map((vacation) => (
            <div className="flex w-full flex-col " key={vacation.id}>
              <div className="group flex w-full flex-row items-center justify-between py-6 pl-6 pr-4 transition-all ease-linear hover:bg-gray-14 ">
                <div className="flex flex-row items-center gap-3">
                  <div>{vacation.icon}</div>
                  <div className="flex flex-col justify-center">
                    <div className="m-0 font-bold leading-[1.467rem] text-gray-27">
                      {formatDate(vacation.start_at, vacation.end_at)}
                    </div>
                    <div className="m-0 -mt-1 flex flex-row items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap  text-sm leading-[1.467rem] text-gray-21">
                      <span>{vacation.duration}</span>
                      <span> of </span>
                      <span>{vacation.policy_title}</span>
                    </div>
                  </div>
                </div>
                <MdModeEdit
                  aria-label="Edit"
                  className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                />
              </div>
              <Hr />
            </div>
          ))}
        </div>
      </section>
      <HistoryTableFiltersProvider>
        <History />
      </HistoryTableFiltersProvider>
    </main>
  );
}
