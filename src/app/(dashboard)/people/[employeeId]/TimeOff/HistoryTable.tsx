import React, { ReactNode } from "react";
import { Hr } from "./_ui/Hr";

export function HistoryTable({
  Headers,
  data,
  layout,
}: {
  data: { [key: string]: any }[] | undefined;
  Headers: ReactNode[];
  layout: string;
}) {
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
              className="relative box-border h-12 w-full cursor-pointer border-transparent bg-gray-17 px-6 pb-[11px] pt-3 text-left align-top font-semibold text-gray-25 transition-[background-color] duration-[0.15s] ease-[ease-in-out] hover:bg-gray-19"
            >
              {key}
            </header>
          ))}
        </div>
        {data && data?.length > 0 ? (
          data?.map((row: { [key: string]: any }, index) => (
            <div className="flex w-full flex-col" key={"row" + index}>
              <div
                className={`group grid w-full  flex-row px-2 transition-all ease-linear hover:bg-gray-14 ${layout} `}
              >
                {Object.keys(row).map((key, index2) =>
                  key === " " ? (
                    <div key={"row_el" + key + index2}>{row[key]}</div>
                  ) : (
                    <div
                      key={"row_el" + key + index2}
                      className=" relative box-border line-clamp-2  h-[4.25rem] w-max  max-w-[25rem]  overflow-hidden text-ellipsis px-4 pt-3 text-left align-top text-gray-27  "
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
              There is no Data History for the selected filters..
            </div>
            <Hr />
          </>
        )}
      </div>
    </section>
  );
}
