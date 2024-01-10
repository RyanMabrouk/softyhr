import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { SortByDate } from "@/helpers/sort.helper";
import { MdModeEditOutline } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";

interface BasicTablePropsType {
  TableRows: string[];
  data: any;
  champ: string;
}

export default function BasicTable({
  TableRows,
  data,
  champ,
}: BasicTablePropsType) {
  return (
    <div className="border-gray h-full w-full border-b">
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 1100 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#EBEBEB" }}>
            <TableRow>
              {TableRows?.map((title: string) => {
                return (
                  <TableCell
                    sx={{ paddingBottom: "11px" }}
                    key={uuidv4()}
                    align="left"
                  >
                    <h1 className="relative box-border w-full  border-transparent bg-gray-17 text-left align-top font-semibold text-gray-25 transition-[background-color] duration-[0.15s] ease-[ease-in-out]">
                      {title}
                    </h1>
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.sort(
                (a: any, b: any) =>
                  new Date(b?.Date || b?.["Effective Date"]).getTime() -
                  new Date(a?.Date || a?.["Effective Date"]).getTime(),
              )
              ?.map((row: any) => {
                const last_changes = SortByDate(data);
                console.log(data);

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
                      {Object?.values(TableRows).map((key: string) => {
                        return (
                          <TableCell
                            key={uuidv4()}
                            sx={{ whiteSpace: "noWrap" }}
                            align="left"
                          >
                            {row[key] || "---"}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        key={uuidv4()}
                        align="left"
                        sx={{ whiteSpace: "noWrap" }}
                      >
                        <div className=" flex items-center justify-end gap-2 opacity-0 duration-200 ease-in-out group-hover:opacity-100">
                          <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
                            <MdModeEditOutline
                              className="rounded-sm text-lg"
                              cursor={"pointer"}
                              fill={"gray"}
                            />
                          </div>
                          <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
                            <FaTrash
                              className="rounded-sm"
                              cursor={"pointer"}
                              fill={"gray"}
                            />
                          </div>
                          <div className="duration-250 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22">
                            <HiOutlineDuplicate
                              className="rounded-sm"
                              cursor={"pointer"}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
