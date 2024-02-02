import React, { Dispatch, Key, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownTrigger,
  Button,
  Dropdown,
  DropdownItem,
} from "@nextui-org/react";
import { FaSortDown } from "react-icons/fa6";
import {
  HiringPropsType,
  HiringTableType,
  statusOptionsType,
} from "../Hiringtable.types";
import { FaFileDownload } from "react-icons/fa";

interface TopContentPropsType {
  statusOptions: statusOptionsType[];
  Hiring: HiringTableType[];
  totalpages:number;
  filter:string | null;
  setFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TopContent({
  statusOptions,
  Hiring,
  filter,
  totalpages,
  setFilter
}: TopContentPropsType) {
  return (
    <div className="flex items-center justify-between  gap-4">
      <div className="flex items-center justify-between">
        <span className="text-normal  text-gray-11">
          Total {totalpages} Job opening
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-normal font-medium ">
       {`${Hiring?.filter((job: HiringTableType) => job?.status === "Open")
            ?.length || 0} of ${Hiring?.length || 0} open · Show`}
        </h1>
        <div className="flex min-w-16">
          <Dropdown className="w-full">
            <DropdownTrigger className="hidden w-full min-w-40 items-center justify-between border border-gray-15 !bg-white text-gray-11 sm:flex">
              <Button size="sm">
                <h1 className="pl-4">{filter}</h1>
                <div className="-mt-1 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center bg-gray-14 duration-150 ease-in-out">
                  <FaSortDown fill="gray" />
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="w-full min-w-40  gap-[1.5rem] border border-gray-15 !bg-white"
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={true}
              selectionMode="single"
               onSelectionChange={(selected:any) => {
                    setFilter(selected?.anchorKey);
                  }}
            >
              {statusOptions.map((status: statusOptionsType) => (
                <DropdownItem
                  className="py-1 capitalize text-gray-11"
                  key={status.uid}
                >
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
          <FaFileDownload fill="gray" />
        </div>
      </div>
    </div>
  );
}
