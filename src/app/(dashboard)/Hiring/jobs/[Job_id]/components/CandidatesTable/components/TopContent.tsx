import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import React from "react";
import { FaRegEdit, FaSortDown, FaUserCircle } from "react-icons/fa";
import AddCollaborate from "./AddCollaborate";
import CandidateReports from "./CandidateReports";
import HiringInfos from "./HiringInfos";
import AddCandidate from "./AddCandidate";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Mail from "./Mail/Mail";
import { CandidateStatusOptions } from "./config";
import Settings from "./Settings/Settings";
import { PiCertificateFill } from "react-icons/pi";
import { MdEventNote } from "react-icons/md";
import { usePathname } from "next/navigation";
import { BsBriefcaseFill } from "react-icons/bs";
import { Hiring_type } from "@/types/database.tables.types";

interface TopContent {
  Hiring: Hiring_type;
  totalPages: number;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

function TopContent({ Hiring, totalPages, filter, setFilter }: any) {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-4 pt-4">
      <div className="flex w-full items-center justify-between gap-[1rem]">
        <div className="flex w-full items-center justify-start gap-[1rem]">
          <div>
            <DropDownGeneric
              DropDownButton={() => (
                <div className="flex cursor-pointer flex-row items-start justify-start gap-1 rounded-sm border border-color-primary-8 px-2 py-1.5 transition-all ease-linear hover:shadow-md">
                  <FaRegEdit className="text-2xl text-color-primary-8 " />
                  <h1 className=" ">
                    Edit Job Opening
                  </h1>
                </div>
              )}
              options={[
                {
                  Component: () => (
                    <div className="flex items-center justify-start gap-4">
                      <BsBriefcaseFill className="text-lg !text-color-primary-7" />
                      <h1 className="group-hover:text-white">
                        Edit Job Information...
                      </h1>
                    </div>
                  ),
                  link: {
                    pathname: `/Hiring/jobs/edit/Information-Job`,
                    query: {
                      id: String(Hiring?.id),
                    },
                  },
                },
                {
                  Component: () => (
                    <div className="flex items-center justify-start gap-4">
                      <MdEventNote className="text-lg !text-color-primary-7" />
                      <h1 className="group-hover:text-white">
                        Edit Application Details...
                      </h1>
                    </div>
                  ),
                  link: {
                    pathname: pathname,
                    query: {
                      popup: "EDIT_APPLICATION_DETAILS",
                    },
                  },
                },
                {
                  Component: () => (
                    <div className="flex items-center justify-start gap-4">
                      <PiCertificateFill className="text-lg !text-color-primary-7" />
                      <h1 className="group-hover:text-white">
                        Manage Job Boards...
                      </h1>
                    </div>
                  ),
                  link: {
                    pathname: pathname,
                    query: {
                      popup: "EDIT_JOB_BOARDS",
                    },
                  },
                },
              ]}
            />
          </div>
          <AddCollaborate />
          <CandidateReports />
          <div className="flex cursor-pointer rounded-sm flex-row items-center justify-center gap-1 border border-gray-25 px-2  py-[0.3rem] shadow-sm transition-all ease-linear hover:shadow-md"><p className="font-semibold text-gray-29">Preview Job Listing</p></div>
        </div>
        <HiringInfos Hiring={Hiring} />
      </div>
      <div className="flex w-full items-end justify-between gap-3 border-t border-gray-18 pt-2">
        <div className="flex w-full items-center justify-start gap-[0.5rem] text-lg font-semibold text-color-primary-7">
          <FaUserCircle className=" text-3xl font-semibold !text-color-primary-8" />
          <h1>{totalPages} Candidates</h1>
          <AddCandidate />
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-normal font-medium ">status</h1>
            <Dropdown className="">
              <DropdownTrigger className="hidden min-w-40 items-center justify-between border border-gray-15 !bg-white py-[0.13rem] text-gray-11 sm:flex">
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
                selectedKeys={filter}
                selectionMode="multiple"
                onSelectionChange={(selected: any) => {

                  setFilter(selected?.anchorKey);
                }}
              >
                {CandidateStatusOptions.map((status: any) => (
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
          <Mail />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default TopContent;
