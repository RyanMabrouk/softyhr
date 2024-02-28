import useDepartment from '@/hooks/useDepartment';
import { TableCell } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from "uuid";


function RenderCellDepartment({ id }: { id: string}) {
  const {
    Department: { data, isPending },
  } = useDepartment({ match: { id }});
  return (
    <>
      {isPending ? (
        <div></div>
      ) : (
        <TableCell key={uuidv4()} sx={{ whiteSpace: "noWrap" }} align="left">
          {data?.[0]?.name ||
            "---"}
        </TableCell>
      )}
    </>
  );
}

export default RenderCellDepartment