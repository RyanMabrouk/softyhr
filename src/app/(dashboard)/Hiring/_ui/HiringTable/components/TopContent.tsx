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
  setStatusFilter: Dispatch<any>;
  statusFilter: "all" | Iterable<Key | any>  ;
  Hiring: HiringTableType[];
}

const TopContent: React.FC<TopContentPropsType> = React.memo(
  ({ statusOptions, setStatusFilter, statusFilter, Hiring }) => {
    return (
      <div className="flex items-center justify-between  gap-4">
        <div className="flex items-center justify-between">
          <span className="text-normal  text-gray-11">
            Total {Hiring.length} Job opening
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-normal font-medium ">
            {Hiring?.filter((job: HiringTableType) => job?.status === "Open")
              ?.length || 0}{" "}
            of {Hiring?.length || 0} open · Show
          </h1>
          <div className="flex min-w-16">
            <Dropdown className="w-full">
              <DropdownTrigger className="hidden w-full min-w-40 items-center justify-between border border-gray-15 !bg-white text-gray-11 sm:flex">
                <Button size="sm">
                  <h1 className="pl-4">{statusFilter}</h1>
                  <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center bg-gray-14 duration-150 ease-in-out">
                    <FaSortDown fill="gray" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="w-full min-w-40  gap-[1.5rem] border border-gray-15 !bg-white"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={true}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.statusFilter === nextProps.statusFilter &&
      prevProps.Hiring === nextProps.Hiring
    );
  },
);

export default TopContent;
