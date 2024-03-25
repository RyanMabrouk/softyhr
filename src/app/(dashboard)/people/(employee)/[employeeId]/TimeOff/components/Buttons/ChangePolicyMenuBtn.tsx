"use client";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { MenuLinksGeneric } from "../../../../../../../_ui/MenuLinksGeneric";
import useTranslation from "@/translation/useTranslation";
export function ChangePolicyMenuBtn({ id }: { id: number }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { lang } = useTranslation();
  /*--------------------------------*/
  const options = [
    {
      name: lang?.["Time Off"]["Move To Another Policy"],
      link: {
        pathname: pathname,
        query: { policy_id: id, popup: "CHANGE_LEAVE_POLICY" },
      },
    },
    {
      name: lang?.["Time Off"]["Remove From This Policy"],
      link: {
        pathname: pathname,
        query: { policy_id: id, popup: "DELETE_LEAVE_POLICY" },
      },
    },
  ];
  return (
    <div
      className={`absolute inset-x-0 bottom-2 box-border flex  h-11  w-full  flex-row-reverse items-center justify-center gap-1  rounded-b-md  border-2 border-solid border-gray-17 bg-[white] py-3 text-center  capitalize text-gray-21  transition-all delay-0 duration-150 ease-in-out  ${
        open
          ? ""
          : "-translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      }`}
    >
      <MenuLinksGeneric
        id={"editPolicyMenu" + id}
        options={options}
        setOpenValueInParent={setOpen}
      >
        <div className="flex h-full w-full flex-row-reverse items-center justify-center gap-1">
          <span className="peer cursor-pointer text-sm hover:text-fabric-700">
            {lang?.["Time Off"]["change policy"]}
          </span>
          <IoMdSettings className="order-0 h-4 w-4 peer-hover:text-fabric-700" />
        </div>
      </MenuLinksGeneric>
    </div>
  );
}
