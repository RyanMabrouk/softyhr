"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useMemo, useState } from "react";
import { HiOutlineDuplicate } from "react-icons/hi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
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
import TopContent from "./components/TopContent";
import {
  HiringPropsType,
  HiringTableType,
  statusOptionsType,
} from "./Hiringtable.types";
import Link from "next/link";
import Paggination from "./components/Pagination";
import useHiring from "@/hooks/useHiring";
import { useQueryClient } from "@tanstack/react-query";
import { GetJobOpening } from "@/actions/hiring/GetJobOpening";
import PublishButton from "./components/PublishButton";
import EditCard from "./components/EditCard";

const columns = [
  { name: "id", uid: "id" },
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

const INITIAL_VISIBLE_COLUMNS = [
  "Candiates",
  "job_opening",
  "hiring_lead",
  "CreatedOn",
  "status",
  "actions",
];
interface HiringTablePropsType {
  Hiring: HiringTableType[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function HiringTable({
  Hiring,
  page,
  setPage,
}: HiringTablePropsType) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const queryClient = useQueryClient();
  const [ShowEdit, setShowEdit] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const rowsPerPage = 7;

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...Hiring];
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
  }, [Hiring, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: HiringTableType, b: HiringTableType) => {
      const first = a[sortDescriptor.column as keyof HiringTableType] as number;
      const second = b[
        sortDescriptor.column as keyof HiringTableType
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: HiringTableType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof HiringTableType];
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
              <Link
                href={`/Hiring/jobs/${user?.id}`}
                className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline"
              >
                {user.job_opening}
              </Link>
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
            <div className="ease flex items-center justify-end gap-2 opacity-0 duration-150 group-hover:!opacity-100">
              <div className="relative">
                <div
                  onClick={() => setShowEdit(true)}
                  className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
                >
                  <MdModeEditOutline
                    className="text-lg"
                    cursor={"pointer"}
                    fill={"gray"}
                  />
                </div>
                {ShowEdit && <EditCard />}
              </div>
              <Link
                href={`?popup=DELETE_JOB&id=${user?.id}`}
                className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
              >
                <FaTrash cursor={"pointer"} fill={"gray"} />
              </Link>
              <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
                <HiOutlineDuplicate cursor={"pointer"} />
              </div>
              {user?.status != "Open" && <PublishButton id={user?.id} />}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [ShowEdit],
  );
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
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      className="border-none !bg-white"
      classNames={classNames}
      bottomContent={
        <Paggination
          pages={Math.ceil(Hiring?.length / rowsPerPage)}
          page={page}
          setPage={setPage}
        />
      }
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          statusOptions={statusOptions}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          Hiring={Hiring}
        />
      }
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: statusOptionsType) => (
          <TableColumn
            {...(column.uid !== "actions" ? { allowsSorting: true } : {})}
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        //      loadingContent={isPending}
        emptyContent={<Empty />}
        items={sortedItems}
      >
        {(item) => (
          <TableRow
            className={item?.status != "Open" ? "group !opacity-50" : " group"}
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
