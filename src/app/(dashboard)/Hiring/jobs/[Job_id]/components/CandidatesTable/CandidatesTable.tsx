"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  ChipProps,
} from "@nextui-org/react";
import { columns, CandidateStatusOptions, TableCandidateType } from "./components/config";
import { FaSortDown } from "react-icons/fa6";
import Mail from "./components/Mail/Mail";
import Settings from "./components/Settings/Settings";
import { FaRegEdit, FaUserCircle } from "react-icons/fa";
import AddCandidate from "./components/AddCandidate";
import AddCollaborate from "./components/AddCollaborate";
import CandidateReports from "./components/CandidateReports";
import HiringInfos from "./components/HiringInfos";
import EditJobOpening from "@/app/(dashboard)/Hiring/_ui/HiringTable/EditJobOpening/EditJobOpening";
import { renderCell } from "./components/renderCell";
import { VscTriangleDown } from "react-icons/vsc";
import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { CandidateType } from "@/types/candidate.types";
import { Hiring_type } from "@/types/database.tables.types";

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "Candidate Info",
  "Status",
  "Rating",
  "Applied",
  "Changes Status",
  "Last Email",
  "actions",
];

export interface CandidateTablePropsType {
  data: TableCandidateType[];
  Job_id: string;
  setpage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  Hiring: Hiring_type;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
}

export default function CandiatesTable({
  data,
  Job_id,
  setpage,
  page,
  Hiring,
  filter,
  setFilter,
  totalPages,
}: CandidateTablePropsType) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const pathname = usePathname();
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex w-full items-center justify-between gap-[1rem]">
          <div className="flex w-full items-center justify-start gap-[1rem]">
            <div>
              <DropDownGeneric
                DropDownButton={() => (
                  <div className="flex cursor-pointer flex-row items-start justify-start gap-1 rounded-sm border border-color-primary-8 px-2 py-1.5 transition-all ease-linear hover:shadow-md">
                    <FaRegEdit className="text-2xl text-color-primary-8 " />
                    <h1 className="font-semibold text-color-primary-8">
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
  }, []);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          variant={"faded"}
          showShadow
          color="success"
          page={page}
          total={Math.ceil(totalPages / 6)}
          className=""
          onChange={setpage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${totalPages} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, totalPages, page]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      tr: [
        "border-b border-gray-14",
        "hover:!bg-color-primary-12",
        "ease-linear duration-200 ",
      ],
      th: [
        "cursor-pointer",
        "py-2",
        "!bg-gray-17",
        "hover:!bg-gray-14",
        "text-gray-11",
        "border-b",
        "border-divider",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      style={{
        height: "auto",
        minWidth: "100%",
      }}
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          label: "!opacity-100 duration-200 ease-linear",
          icon: "shadow-inner rounded-sm duration-200  ease-linear border border-gray-15 w-[1.3rem] h-[1.3rem] !opacity-100 ",
          wrapper:
            "overflow-visible after:!bg-color-primary-8 before:!bg-red-500 text-color-primary-8",
          base: "!text-red-500",
        },
      }}
      color="default"
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="single"
      showSelectionCheckboxes={true}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No candidate found"} items={data || []}>
        {(item: TableCandidateType) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(Hiring, item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

