"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { HiOutlineDuplicate } from "react-icons/hi";
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
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { monthsAgo } from "@/helpers/MonthAgo";
import { formatCustomDate } from "@/helpers/Formatdate";
import Empty from "./components/Empty";
import { FaSortDown, FaTrash } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";

const columns = [
  { name:"id", uid:"id"},
  { name: "Candiates", uid: "Candiates", sortable: true },
  { name: "Job Opening", uid: "job_opening", sortable: true },
  { name: "Hiring Lead", uid: "hiring_lead", sortable: true },
  { name: "Created On", uid: "CreatedOn", sortable: true },
  { name: "NewCandidates", uid: "NewCandidates" },
  { name: "Status", uid: "status", sortable: true },
  { name: "", uid: "actions" },
];

const statusOptions = [
  { name: "Open", uid: "Open" },
  { name: "Draft", uid: "Draft" },
  { name: "On Hold", uid: "On Hold" },
  { name: "Filled", uid: "Filled" },
  { name: "all", uid: "all" },
  { name: "Canceled", uid: "Canceled" },
];

export { columns, statusOptions };

const statusMap: Object = {
  Open: "Open",
  Draft: "Draft",
  "On Hold": "On Hold",
  Filled: "Filled",
  all: "all",
  Canceled: "Canceled",
};

const INITIAL_VISIBLE_COLUMNS = [
  "Candiates",
  "job_opening",
  "hiring_lead",
  "CreatedOn",
  "status",
  "actions",
];

type User = any;

export default function HiringTable({ users }: any) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(users.length);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (
      !(
        (statusFilter instanceof Set && statusFilter.has("all")) ||
        statusFilter == "all"
      )
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }
    return filteredUsers;
  }, [users, hasSearchFilter, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "Candiates":
        return (
          <User
            className="!text-color-primary-8 "
            classNames={{
              description: "",
            }}
            description={
              user?.NewCandidates > 0 && user?.NewCandidates + " NEW"
            }
            name={cellValue}
          >
            <div className="flex items-center justify-center gap-[0rem]">
              <CgProfile
                fontSize="1rem"
                className="border border-color-primary-8 text-color-primary-8"
              />
              <h1>{user.Candiates}</h1>
            </div>
          </User>
        );
      case "job_opening":
        return (
          <div className="flex flex-col items-start justify-center gap-[0.2rem]">
            <p className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline">
              {user.job_opening}
            </p>
            <div className="flex items-center justify-center text-sm font-normal text-gray-11">
              <p>{user.department}</p>
              <p>{user.Location}</p>
            </div>
          </div>
        );
      case "hiring_lead":
        return (
          <div className="flex flex-col">
            <p className="text-normal font-normal capitalize text-gray-11">
              {user.hiring_lead}
            </p>
          </div>
        );
      case "CreatedOn":
        return (
          <p className="text-gra-14 gap-1 border-none capitalize">
            <h1 className="text-normal font-medium capitalize text-gray-11">
              {formatCustomDate(user.CreatedOn)}
            </h1>
            <h1 className="text-normal font-normal text-gray-15">
              {monthsAgo(user.CreatedOn)}
            </h1>
          </p>
        );
      case "status":
        return (
          <div className="flex flex-col">
            <p className="text-normal font-normal capitalize text-gray-11">
              {user.status}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
              <MdModeEditOutline
                className="text-lg"
                cursor={"pointer"}
                fill={"gray"}
              />
            </div>
            <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
              <FaTrash cursor={"pointer"} fill={"gray"} />
            </div>
            <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
              <HiOutlineDuplicate cursor={"pointer"} />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between  gap-4">
        <div className="flex items-center justify-between">
          <span className="text-normal  text-gray-11">
            Total {users.length} Job opening
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-normal font-medium ">
            {users?.filter((job: any) => job?.status == "Open")?.length || 0} of{" "}
            {users?.length || 0} open · Show
          </h1>
          <div className="flex  min-w-16 ">
            <Dropdown className="w-full">
              <DropdownTrigger className="hidden w-full min-w-40 items-center justify-between border border-gray-15 !bg-white text-gray-11   sm:flex">
                <Button size="sm">
                  <h1 className="pl-4">{statusFilter}</h1>
                  <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center bg-gray-14 duration-150 ease-in-out">
                    <FaSortDown fill="gray" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="w-full min-w-40  gap-[1.5rem] border border-gray-15 !bg-white "
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={true}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status: any) => {
                  return (
                    <DropdownItem
                      className="py-1 capitalize text-gray-11"
                      key={status.uid}
                    >
                      {status.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
            <FaFileDownload fill="gray" />
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return;
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
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      tr: ["border-b border-gray-14"],
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
        // changing the rows border radius
        // first

        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
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
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      className="border-none !bg-white"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn
            {...(column.uid !== "actions" ? { allowsSorting: true } : {})}
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={<Empty />} items={sortedItems}>
        {(item) => (
          <TableRow
            className={
              item?.status == "Draft"
                ? "!opacity-50"
                : "" 
            }
            key={uuidv4()}
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
