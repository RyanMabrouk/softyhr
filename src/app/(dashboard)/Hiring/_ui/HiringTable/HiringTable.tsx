"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Selection,
  Pagination,
} from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import Empty from "./components/Empty";
import { FaTrash } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import TopContent from "./components/TopContent";
import { HiringTableType, statusOptionsType } from "./Hiringtable.types";
import Link from "next/link";
import PublishButton from "./components/PublishButton";
import EditCard from "./components/EditCard";
import { formatCustomDate, monthsAgo } from "@/helpers/date.helpers";
import { CiLink } from "react-icons/ci";
import { GetJobUrl } from "@/helpers/Hiring/GetJobUrl.helper";
import EditJobOpening from "./EditJobOpening/EditJobOpening";
import useToast from "@/hooks/useToast";
import CopieJobLink from "./components/CopieJobLink";

const columns = [
  { name: "id", uid: "id" },
  { name: "Candiates", uid: "Candiates", sortable: true },
  { name: "Job Opening", uid: "job_opening", sortable: true },
  { name: "Hiring Lead", uid: "hiring_lead", sortable: true },
  { name: "Created On", uid: "CreatedOn", sortable: true },
  { name: "NewCandidates", uid: "NewCandidates" },
  { name: "Status", uid: "status", sortable: true },
  { name: "actions", uid: "actions" },
  { name: "", uid: "publish" },
];

const statusOptions = [
  { name: "Open", uid: "Open" },
  { name: "Draft", uid: "Draft" },
  { name: "On Hold", uid: "On Hold" },
  { name: "Filled", uid: "Filled" },
  { name: "All", uid: "All" },
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
  "publish",
];
interface HiringTablePropsType {
  Hiring: HiringTableType[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  filter: string | null;
  setFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function HiringTable({
  Hiring,
  page,
  filter,
  setPage,
  totalPages,
  setFilter,
}: HiringTablePropsType) {
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const { toast } = useToast();
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

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
                <p>{user.department} - </p>
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
            <div className="ease flex items-center justify-start gap-2 duration-150 ">
              <EditJobOpening id={user?.id} />
              <Link
                data-tip="delete job"
                href={`?popup=DELETE_JOB&id=${user?.id}`}
                className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
              >
                <FaTrash className="!text-gray-15 cursor-pointer" />
              </Link>
              <CopieJobLink id={user?.id}/>
            </div>
          );
        case "publish":
          return (
            <div className="flex items-center justify-end">
              <PublishButton id={user?.id} status={user?.status} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
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
        <Pagination
          isCompact
          showControls
          variant={"faded"}
          showShadow
          color="success"
          total={Math.ceil(totalPages / 6)}
          page={page}
          onChange={setPage}
        />
      }
      topContent={
        <TopContent
          filter={filter}
          statusOptions={statusOptions}
          setFilter={setFilter}
          Hiring={Hiring}
          totalpages={totalPages}
        />
      }
      topContentPlacement="outside"
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
        items={Hiring || []}
      >
        {(item) => (
          <TableRow
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
