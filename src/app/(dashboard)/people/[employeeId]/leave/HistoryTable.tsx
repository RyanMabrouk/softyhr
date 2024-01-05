import React from "react";
import { Hr } from "./_ui/Hr";
export function HistoryTable({
  Headers,
  data,
  layout,
}: {
  data: { [key: string]: any }[];
  Headers: string[];
  layout: string;
}) {
  return (
    <section className="flex flex-row">
      <div className="flex w-full flex-col">
        <div
          className={`group grid w-full flex-row bg-gray-17 px-2 transition-all ease-linear ${layout}`}
        >
          {Headers.map((key, index) => (
            <header
              key={"header" + key + index}
              className="relative box-border h-12 w-full border-transparent bg-gray-17 px-4 pb-[11px] pt-3 text-left align-top font-semibold text-gray-25 transition-[background-color] duration-[0.15s] ease-[ease-in-out]"
            >
              {key}
            </header>
          ))}
        </div>
        {data && data?.length > 0 ? (
          data?.map((row: { [key: string]: any }, index2) => (
            <div className="flex w-full flex-col" key={"row" + index2}>
              <div
                className={`group grid w-full  flex-row px-2 transition-all ease-linear hover:bg-gray-14 ${layout} `}
              >
                {Object.keys(row).map((key, index) =>
                  key === " " ? (
                    row[key]
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
