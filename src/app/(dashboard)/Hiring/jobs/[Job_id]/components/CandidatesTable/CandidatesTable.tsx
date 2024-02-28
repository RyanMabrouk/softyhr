"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Selection
} from "@nextui-org/react";
import {
  columns,
  TableCandidateType,
} from "./components/config";
import { renderCell } from "./components/renderCell";
import { usePathname } from "next/navigation";
import { Hiring_type } from "@/types/database.tables.types";
import TopContent from "./components/TopContent";

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
  }, [selectedKeys, totalPages, page, setpage]);

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
        "hover:!bg-gray-18",
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
      topContent={
        <TopContent
          Hiring={Hiring}
          totalPages={totalPages}
          filter={filter}
          setFilter={setFilter}
        />
      }
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

