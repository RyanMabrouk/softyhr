"use client";
import { v4 as uuidv4 } from "uuid";
import React from "react";
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
import { RxAvatar } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { monthsAgo } from "@/helpers/MonthAgo";
import { formatCustomDate } from "@/helpers/Formatdate";

const columns = [
  { name: "Candiates", uid: "Candiates", sortable: true },
  { name: "Job Opening", uid: "job_opening", sortable: true },
  { name: "Hiring Lead", uid: "hiring_lead", sortable: true },
  { name: "Created On", uid: "CreatedOn", sortable: true },
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
  console.log(users);
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    console.log(statusFilter);
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
    console.log(columnKey);
    switch (columnKey) {
      case "Candiates":
        return (
          <User
            className="!text-color-primary-8 "
            classNames={{
              description: "",
            }}
            description={user.Candiates > 0 && user.Candiates + " NEW"}
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
            <p className="cursor-pointer text-color5-500 hover:underline">
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
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <h1>actions</h1>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          <span className="text-default-400 text-small">
            Total {users.length} Job opening
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex  min-w-16 ">
            <Dropdown className="w-full">
              <DropdownTrigger className="hidden w-full border border-gray-18 !bg-white px-12 py-1 sm:flex">
                <Button endContent={<h1 className="text-small" />} size="sm">
                  {statusFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="w-full gap-[1rem] border border-color1-500 !bg-white "
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status: any) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
      th: ["!bg-gray-17", "text-gray-15", "border-b", "border-divider"],
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
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={uuidv4()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
