import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination } from "@mui/material";

interface BasicTablePropsType {
  TableRows: string[];
  data: {}[];
}

export default function BasicTable({ TableRows, data }: BasicTablePropsType) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#EBEBEB" }}>
          <TableRow>
            {TableRows?.map((title: string) => {
              return <TableCell align="left">{title}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object?.values(row).map((attribute: string) => {
                  console.log(attribute);
                  return (
                    <TableCell sx={{ whiteSpace: "noWrap" }} align="left">
                      {attribute || "---"}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
