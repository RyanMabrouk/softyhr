import useProfilesData from "@/hooks/useProfilesData";
import { TableCell } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function RenderCellUser({ id }: { id: string }) {
  const {
    profiles: { data, isPending },
  } = useProfilesData({ match: { user_id: id } });
  console.log(data);
  return (
    <>
      {isPending ? (
        <div></div>
      ) : (
        <TableCell key={uuidv4()} sx={{ whiteSpace: "noWrap" }} align="left">
          {`${data?.[0]?.["Basic Information"]?.["First name"]}     ${data?.[0]?.["Basic Information"]?.["Last name"]} ` ||
            "---"}
        </TableCell>
      )}
    </>
  );
}

export default RenderCellUser;
