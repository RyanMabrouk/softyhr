"use client";
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import Input from "../../Input/Input";
import useCandidateFullName from "@/hooks/Hiring/useCandidateFullName";
import { useSearchParams } from "next/navigation";
import isUrl from "is-url";
import Link from "next/link";

function EmailPlaceHolders() {
  const params = useSearchParams();
  const id = params.get("id");
  const { FullName, isPending, data } = useCandidateFullName(id);

  const [SearchValue, setSearchValue] = useState<string>("");

  return (
    <div className="flex h-full w-[20rem] min-w-[20rem] flex-col items-start justify-start gap-[1rem] self-start bg-gray-14 p-4">
      <div className="flex items-center justify-center gap-2">
        <IoIosMail className="text-2xl text-gray-15" />
        <h1 className="text-base text-gray-29">Email placeHolder</h1>
      </div>
      <p className="border-b border-gray-18 pb-4 text-sm font-light text-gray-29">
        You can insert these into the email and they will be replaced with the
        actual values when the email is sent.
      </p>
      <div className="w-full border-b border-gray-18 pb-4">
        <Input
          className="w-[15rem]"
          RowField={{
            name: "search",
            Icon: "IOSEARCHSHARP",
            placeHolder: "Filter PlaceHolders...",
          }}
          setSelectedKeys={setSearchValue}
        />
        <div className="flex w-full flex-col items-center justify-center py-2">
          {Object?.entries(data?.metadata || {})?.filter((Object: any) =>
            Object[0]?.toUpperCase()?.includes(SearchValue?.toUpperCase()),
          ).length > 0 ? (
            Object?.entries(data?.metadata || {})
              ?.filter((Object: any) =>
                Object[0]?.toUpperCase()?.includes(SearchValue?.toUpperCase()),
              )
              ?.map((Object: any, index: number) => {
                if (Object[0]?.toUpperCase() == "QUESTIONS") return;
                return isUrl(Object[1]) ? (
                  <div
                    key={index}
                    className="flex w-full cursor-pointer flex-col items-start justify-center rounded-sm border border-gray-14 p-3 duration-150  ease-linear hover:!border-gray-18 hover:bg-gray-0"
                  >
                    <h1 className="text-base capitalize text-gray-13">
                      {Object[0]}
                    </h1>
                    <Link
                      target="_blank"
                      href={Object[1]}
                      className="flex w-full cursor-pointer flex-row items-center gap-2 truncate pr-2 text-sm font-light  text-color5-600 hover:text-fabric-700 hover:underline"
                    >
                      {Object[1] || "---"}
                    </Link>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex w-full cursor-pointer flex-col items-start justify-center rounded-sm border border-gray-14 p-3 duration-150  ease-linear hover:!border-gray-18 hover:bg-gray-0"
                  >
                    <h1 className="text-base capitalize text-gray-13">
                      {Object[0]}
                    </h1>
                    <h1 className="w-full truncate pr-2 text-sm font-light text-gray-15">
                      {Object[1] || "---"}
                    </h1>
                  </div>
                );
              })
          ) : (
            <h1 className="flex w-full items-center justify-center whitespace-nowrap border-t border-gray-18 p-3 pt-4 text-sm font-light text-gray-15">{`No placeHolders match your search...`}</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailPlaceHolders;
