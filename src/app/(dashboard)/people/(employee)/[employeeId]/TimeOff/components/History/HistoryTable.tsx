"use client";
import React, { ReactNode } from "react";
import { Hr } from "../Hr";
import useTranslation from "@/hooks/useTranslation";

interface ISorter<T> {
  property: Extract<keyof T, string | number | Date>;
  isDescending: boolean;
}
function genericSort<T>(objectA: T, objectB: T, sorter: ISorter<T>) {
  const result = () => {
    if (objectA[sorter.property] > objectB[sorter.property]) {
      return 1;
    } else if (objectA[sorter.property] < objectB[sorter.property]) {
      return -1;
    } else {
      return 0;
    }
  };
  return sorter.isDescending ? result() * -1 : result();
}
export function HistoryTable({
  Headers,
  data,
  layout,
  emptyMessage,
}: {
  data: { [key: string]: any }[] | undefined;
  Headers: ReactNode[];
  layout: string;
  emptyMessage?: string;
}) {
  const { lang } = useTranslation();
  // Headers Must Match the Keys in the data
  return (
    <section className="flex flex-row">
      <div className="flex w-full flex-col">
        <div
          className={`group grid w-full flex-row transition-all ease-linear ${layout}`}
        >
          {Headers.map((key, index) => (
            <header
              key={"header" + key + index}
              className="relative box-border h-12 w-full  cursor-pointer border-transparent bg-gray-17 pb-[11px] pl-4 pr-7 pt-3 text-left align-top font-semibold text-gray-25 transition-[background-color] duration-150 ease-linear first-letter:capitalize hover:bg-gray-19 max-1860:pr-2 max-1860:text-sm"
            >
              {key}
            </header>
          ))}
        </div>
        {data && data?.length > 0 ? (
          data.map((row: { [key: string]: any }, index) => (
            <div className="flex w-full flex-col " key={"row" + index}>
              <div
                className={`group grid w-full  flex-row transition-all ease-linear hover:bg-gray-14 ${layout} `}
              >
                {Object.keys(row).map((key, index2) =>
                  key === " " ? (
                    <div
                      className="w-full text-center"
                      key={"row_el" + key + index2}
                    >
                      {row[key]}
                    </div>
                  ) : (
                    <div
                      key={"row_el" + key + index2}
                      className="relative box-border line-clamp-2 h-[4.25rem] w-full max-w-[25rem]  overflow-hidden  text-ellipsis  px-4 pt-3 text-left align-top text-gray-27 max-1690:h-20 max-1690:px-2  max-1690:pt-1"
                    >
                      {row[key]}
                    </div>
                  ),
                )}
              </div>
              <Hr />
            </div>
          ))
        ) : (
          <>
            <div className=" relative box-border line-clamp-2  h-[3.25rem] w-max  max-w-[25rem]  overflow-hidden text-ellipsis px-4 pt-3 text-left align-top text-gray-27  ">
              {emptyMessage ??
                lang?.["Time Off"][
                  "There is no Data History for the selected filters.."
                ]}
            </div>
            <Hr />
          </>
        )}
      </div>
    </section>
  );
}
