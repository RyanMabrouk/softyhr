import React from "react";
import TableSideBarFolderBox from "./TableSideBarFolderBox";
import AllFilesFolderBox from "./AllFilesFolderBox";

export default function TableSideBar({
  setCheckAll,
}: {
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  return (
    <div className=" min-h-[45rem]  w-80   bg-stone-100 py-4 pl-4">
      <AllFilesFolderBox setCheckAll={setCheckAll} />
      <hr className="m-2" />
      <TableSideBarFolderBox setCheckAll={setCheckAll} />
    </div>
  );
}
