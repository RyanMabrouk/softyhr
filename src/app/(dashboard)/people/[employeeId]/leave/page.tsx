"use client";
import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { PolyciesSwiper } from "./PolyciesSwiper";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { Span } from "next/dist/trace";
import { MdDelete } from "react-icons/md";

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
    <main className="flex h-full w-full flex-col gap-2 py-4 pl-8">
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
            <span className="cursor-pointer text-color5-600 hover:text-fabric-700 hover:underline ">
              12/02/2020
            </span>
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
          {upcoming_vacations?.map((vacation, index) => (
            <div className="flex w-full flex-col " key={vacation.id}>
              <div className="group flex w-full flex-row items-center justify-between py-6 pl-6 pr-4 transition-all ease-linear hover:bg-gray-14 ">
                <div className="flex flex-row items-center gap-3">
                  <div>{vacation.icon}</div>
                  <div className="flex flex-col justify-center">
                    <div className="text-gray-27 m-0 font-bold leading-[1.467rem]">
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
      <section className="mt-8 flex flex-col justify-center gap-1">
        <div className="mb-2 flex flex-row items-center gap-2">
          <FaHistory className="h-5 w-5" />
          <h1 className="font-bold">History</h1>
        </div>
        <HistoryTable />
      </section>
    </main>
  );
}
function Hr() {
  return (
    <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-18" />
  );
}
function formatDate(start_at: string, end_at: string) {
  const start = new Date(start_at);
  const end = new Date(end_at);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  });
  if (sameDay(start, end)) {
    return formatter.format(start);
  }
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}
function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function HistoryTable() {
  const data = [
    {
      id: 1,
      Date: "2022-01-10",
      description: (
        <>
          <span>Annual Vacation</span>
          <span> - </span>
          <span className="whitespace-pre text-sm text-gray-21">
            Taking kids on a beach vacation.
          </span>
        </>
      ),
      "Used (-)": "",
      "Accrued (+)": "10 hours",
      Balance: "20 hours",
    },
    {
      id: 2,
      Date: "2022-01-15",
      description: (
        <>
          <span>Annual Vacation</span> <span> - </span>
          <span className="text-sm text-gray-21">
            Taking kids on a beach vacation.Taking kids on a beach
            vacation.Taking kids on a beach vacation.Taking kids on a beach
            vacation.
          </span>
        </>
      ),
      "Used (-)": "10 hours",
      "Accrued (+)": "",
      Balance: "10 hours",
    },
    {
      id: 3,

      Date: "2022-05-20",
      description: (
        <>
          <span>Sick Leave</span> <span> - </span>
          <span className="text-sm text-gray-21">
            Taking kids on a beach vacation.
          </span>
        </>
      ),
      "Used (-)": "2 hours",
      "Accrued (+)": "",
      Balance: "8 hours",
    },
    {
      id: 4,

      Date: "2022-09-10",
      description: (
        <>
          <span>Family Vacation</span>
        </>
      ),
      "Used (-)": "7 hours",
      "Accrued (+)": "",
      Balance: "1 hours",
    },
    {
      id: 5,

      Date: "2022-12-25",
      description: (
        <>
          <span>Christmas Holiday</span>
        </>
      ),
      "Used (-)": "3 hours",
      "Accrued (+)": "",
      Balance: "6 hours",
    },
    {
      id: 5,

      Date: "2023-03-10",
      description: (
        <>
          <span>Personal Day</span>
        </>
      ),
      "Used (-)": "1 hours",
      "Accrued (+)": "",
      Balance: "5 hours",
    },
    {
      id: 6,
      Date: "2023-07-01",
      description: (
        <>
          <span>Summer Vacation</span>
        </>
      ),
      "Used (-)": "10 hours",
      "Accrued (+)": "",
      Balance: "-5 hours",
    },
    {
      id: 7,

      Date: "2023-09-15",
      description: (
        <>
          <span>Study Leave</span>
        </>
      ),
      "Used (-)": "5 hours",
      "Accrued (+)": "",
      Balance: "-10 hours",
    },
    {
      id: 8,
      Date: "2023-11-20",
      description: (
        <>
          <span>National Holiday</span>
        </>
      ),
      "Used (-)": "0 hours",
      "Accrued (+)": "",
      Balance: "-10 hours",
    },
    {
      id: 9,
      Date: "2024-02-05",
      description: (
        <>
          <span>Winter Break</span>
        </>
      ),
      "Used (-)": "8 hours",
      "Accrued (+)": "",
      Balance: "-18 hours",
    },
    {
      id: 10,
      Date: "2024-06-30",
      description: (
        <>
          <span>Vacation Trip</span>
        </>
      ),
      "Used (-)": "12 hours",
      "Accrued (+)": "",
      Balance: "-30 hours",
    },
  ];
  return (
    <div>
      <section></section>
      <section className="flex  flex-row">
        {data?.length > 0 && (
          <>
            {Object.keys(data[0]).map((key, index) => (
              <div
                key={"header" + key + index}
                className=" flex  w-full flex-col"
              >
                <header className="relative box-border h-10 w-full min-w-[8rem] border-transparent bg-gray-17 px-4 pb-[11px] pt-3 text-left align-top font-bold text-gray-25 transition-[background-color] duration-[0.15s] ease-[ease-in-out]">
                  {key}
                </header>
                {data?.map((row: { [key: string]: any }, index2) => (
                  <div
                    className="flex w-full flex-col"
                    key={"row_el" + key + index2}
                  >
                    <div className="text-gray-27 whitespace-wrap relative  box-border line-clamp-2 h-[4.25rem] w-max  w-max max-w-[25rem] overflow-hidden text-ellipsis px-4 pt-3 text-left align-top  ">
                      {row[key]}
                    </div>
                    <Hr />
                  </div>
                ))}
              </div>
            ))}
            <div className="group flex  w-full flex-col">
              <header className="relative box-border h-10 w-full border-transparent bg-gray-17 px-4 pb-[11px] pt-3 text-left align-top font-bold text-gray-25 transition-[background-color] duration-[0.15s] ease-[ease-in-out]"></header>
              {data?.map((row: { [key: string]: any }, index2) => (
                <div className="flex w-full flex-col" key={"row_el" + index2}>
                  <div className="text-gray-27 whitespace-wrap relative box-border flex h-[4.25rem] w-20  flex-row items-center gap-1  px-4 pt-3 text-left align-top  ">
                    <MdDelete
                      aria-label="Delete"
                      className="hidden h-12 w-12 cursor-pointer rounded-md border border-transparent transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                    />
                    <MdModeEdit
                      aria-label="Edit"
                      className="hidden h-12 w-12 cursor-pointer rounded-md border border-transparent p-0.5 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                    />
                  </div>
                  <Hr />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
