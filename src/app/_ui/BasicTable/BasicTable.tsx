import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";

interface BasicTablePropsType {
  TableRows: string[];
  data: {}[];
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
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#EBEBEB" }}>
            <TableRow>
              {TableRows?.map((title: string) => {
                return (
                  <TableCell
                    key={uuidv4()}
                    className="font-bold text-gray-25"
                    align="left"
                  >
                    {title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => {
              return (
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
