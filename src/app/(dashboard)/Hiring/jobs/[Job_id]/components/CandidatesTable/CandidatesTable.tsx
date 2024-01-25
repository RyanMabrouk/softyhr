"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { FaSortDown } from "react-icons/fa6";
import Mail from "./Mail/Mail";
import Settings from "./Settings/Settings";
import { RxAvatar } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddCandidate from "./AddCandidate";
import { formatCustomDate } from "@/helpers/Formatdate";
import { Rating } from "@mui/material";
import EditJobOpening from "@/app/(dashboard)/Hiring/_ui/HiringTable/EditJobOpening/EditJobOpening";
import { TbH1 } from "react-icons/tb";
import AddCollaborate from "./AddCollaborate";
import CandidateReports from "./CandidateReports";
import Avatar from "./Avatar";
import HiringInfos from "./HiringInfos";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import updateData from "@/api/updateData";
import { useQueryClient } from "@tanstack/react-query";
import { BiCommentAdd } from "react-icons/bi";
import HireStatus from "./HireStatus";
import RatingGeneric from "./RatingGeneric";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "Candidate Info",
  "Status",
  "Rating",
  "Applied",
  "Changes Status",
  "actions",
];

type User = any;

export default function CandiatesTable({ candidate, Hiring }: any) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(candidate.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);
  const queryClient = useQueryClient();
  const filteredItems = React.useMemo(() => {
    console.log(candidate);
    let filteredUsers = [...candidate];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [candidate, filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  console.log(Hiring);
  const renderCell = (user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "Candidate Info":
        return (
          <h1 className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline">
            {user?.["Candidate Info"]}
          </h1>
        );
      case "Status":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.Status}</p>
            <p className="text-default-500 font-base text-base capitalize text-gray-15">
              {user.Status_update}
            </p>
          </div>
        );
      case "Rating":
        console.log(user?.Rating);
        return (
         <RatingGeneric DefaultValue={user?.Rating} id={user?.id} tableName="candidates" />
        );
      case "Applied":
        return (
          <div className="text-default-600 gap-1 border-none capitalize">
            {formatCustomDate(user.Applied)}
          </div>
        );
      case "Changes Status":
        console.log("objectobject");
        return (
          <div className=" flex items-center justify-start gap-2 z-10">
           <HireStatus Hiring={user}/>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown className="border-1 border-default-200 flex items-center justify-center bg-background">
              <DropdownTrigger>
                <Button
                  className="flex items-center justify-center"
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="light"
                >
                  <PiDotsThreeOutlineVerticalFill />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="shadow-green ">
                <DropdownItem className="group hover:!bg-color-primary-8">
                  <div className="flex items-end justify-center gap-[0.5rem] duration-200 ease-linear">
                    <BiCommentAdd className="text-xl text-color-primary-7 group-hover:!text-white" />
                    <h1 className="text-black group-hover:!text-white">
                      Add Comment
                    </h1>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  console.log(Hiring);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex w-full items-center justify-between gap-[1rem]">
          <div className="flex w-full items-center justify-start gap-[1rem]">
            <EditJobOpening />
            <AddCollaborate />
            <CandidateReports />
          </div>
          <HiringInfos Hiring={Hiring} />
        </div>
        <div className="flex w-full items-end justify-between gap-3 border-t border-gray-18 pt-2">
          <div className="flex w-full items-center justify-start gap-[0.5rem] text-lg font-semibold text-color-primary-7">
            <FaUserCircle className=" text-3xl font-semibold !text-color-primary-8" />
            <h1>
              {candidate?.length} Candidates {"( 1 New )"}
            </h1>
            <AddCandidate />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-normal font-medium ">status</h1>
              <Dropdown className="">
                <DropdownTrigger className="hidden min-w-40 items-center justify-between border border-gray-15 !bg-white py-[0.13rem] text-gray-11 sm:flex">
                  <Button size="sm">
                    <h1 className="pl-4">{statusFilter}</h1>
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
                  selectedKeys={statusFilter}
                  selectionMode="single"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status: any) => (
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
  }, [statusFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
      selectionMode="multiple"
      showSelectionCheckboxes={true}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
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
      <TableBody emptyContent={"No candidate found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
