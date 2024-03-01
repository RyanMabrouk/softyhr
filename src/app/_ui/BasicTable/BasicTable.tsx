import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { SortByDate } from "@/helpers/Hiring/sort.helper";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import Link from "next/link";
import { RowFieldType } from "@/types/database.tables.types";
import RenderCellUser from "./components/RenderCellUser";
import RenderCellDepartment from "./components/RenderCellDepartment";
import { TablePagination } from "@mui/material";

interface BasicTablePropsType {
  TableRows: RowFieldType[];
  data: DataTableType[];
  champ: string;
}

interface DataTableType {
  [key: string]: any;
}
export default function BasicTable({
  TableRows,
  data,
  champ,
}: BasicTablePropsType) {
  const [page, setPage] = React.useState(0);
  return (
    <div className="flex h-full w-full flex-col items-start justify-center">
      <div className="border-gray h-full w-full border-b">
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table
            sx={{ minWidth: 1100 }}
            aria-label="simple table"
            className={data?.length == 0 || !data ? "bg-gray-14" : ""}
          >
            <TableHead sx={{ backgroundColor: "#EBEBEB" }}>
              <TableRow>
                {TableRows?.map((RowField: RowFieldType) => {
                  return (
                    <TableCell
                      sx={{ paddingBottom: "11px" }}
                      key={uuidv4()}
                      align="left"
                    >
                      <h1 className="relative box-border w-full  border-transparent bg-gray-17 text-left align-top font-semibold text-gray-25 transition-[background-color] duration-150 ease-linear">
                        {RowField?.name}
                      </h1>
                    </TableCell>
                  );
                })}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {data?.length == 0 || !data ? (
              <div className="text-semibold bg-gray-14 py-2 pl-4 text-lg text-gray-15">
                No {champ} entries have been added.
              </div>
            ) : (
              <TableBody key={uuidv4()}>
                {data
                  .slice(page * 4, page * 4 + 4)
                  ?.sort(
                    (a: DataTableType, b: DataTableType) =>
                      new Date(b?.Date || b?.["Effective Date"]).getTime() -
                      new Date(a?.Date || a?.["Effective Date"]).getTime(),
                  )
                  ?.map((row: any) => {
                    const last_changes = SortByDate(data);
                    return (
                      <>
                        {last_changes == row?.id && (
                          <div className="absolute mt-7 h-[0.5rem] w-[0.5rem] rounded-full bg-color-primary-8" />
                        )}
                        <TableRow
                          key={uuidv4()}
                          onMouseLeave={() => {}}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className={
                            last_changes != row?.id &&
                            (row?.Date || row?.["Effective Date"])
                              ? "group cursor-pointer opacity-50"
                              : "group cursor-pointer"
                          }
                        >
                          {TableRows?.map((RowField: RowFieldType) => {
                            if (RowField?.type?.toUpperCase() == "SELECT_USERS")
                              return (
                                <RenderCellUser id={row?.[RowField?.name]} />
                              );
                            if (
                              RowField?.type?.toUpperCase() ==
                              "SELECT_DEPARTMENT"
                            )
                              return (
                                <RenderCellDepartment
                                  id={row?.[RowField?.name]}
                                />
                              );
                            return (
                              <TableCell
                                key={uuidv4()}
                                sx={{ whiteSpace: "noWrap" }}
                                align="left"
                              >
                                {row[RowField?.name] || "---"}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            key={uuidv4()}
                            align="left"
                            sx={{ whiteSpace: "noWrap" }}
                          >
                            <div className=" flex items-center justify-end gap-2 opacity-0 duration-200 ease-in-out group-hover:opacity-100">
                              <Link
                                data-tip="Edit"
                                href={`?popup=EDIT_ENTRY&section=${champ}&id=${row?.id}`}
                                className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-sm duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-14"
                              >
                                <MdModeEditOutline
                                  className="rounded-sm text-lg"
                                  cursor={"pointer"}
                                  fill={"gray"}
                                />
                              </Link>
                              <Link
                                data-tip="Delete"
                                href={`?popup=DELETE_ENTRY&section=${champ}&id=${row?.id}`}
                                className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-sm duration-200 ease-in-out hover:border hover:border-gray-27 hover:!bg-gray-14"
                              >
                                <FaTrash
                                  className="rounded-sm"
                                  cursor={"pointer"}
                                  fill={"gray"}
                                />
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        className="self-end"
        component="div"
        count={data?.length}
        rowsPerPage={4}
        rowsPerPageOptions={[]}
        page={page}
        onPageChange={(event: unknown, newPage: number) => setPage(newPage)}
      />
    </div>
  );
}
