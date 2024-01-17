import React from "react";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { MenuLinksGeneric } from "../../../../_ui/MenuLinksGeneric";
export function ChangePolicyMenuBtn({ id }: { id: number }) {
  const pathname = usePathname();
  /*------------ Menu ---------------*/
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /*--------------------------------*/
  const options = [
    {
      name: "Move To Another Policy",
      link: {
        pathname: pathname,
        query: { policy_id: id, popup: "CHANGE_LEAVE_POLICY" },
      },
    },
    {
      name: "Remove From This Policy",
      link: {
        pathname: pathname,
        query: { policy_id: id, popup: "DELETE_LEAVE_POLICY" },
      },
    },
  ];
  return (
    <>
      <MenuLinksGeneric
        id={"editPolicyMenu" + id}
        options={options}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <div
        className={`absolute bottom-2 box-border flex h-11 w-full flex-row-reverse items-center justify-center gap-1 rounded-b-md  border-2 border-solid border-gray-17 bg-[white] py-3 text-center  capitalize text-gray-21  transition-all delay-[0s] duration-[0.15s] ease-[ease-in-out]  ${
          open
            ? ""
            : "-translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <span
          className="peer cursor-pointer text-sm hover:text-fabric-700"
          aria-controls={open ? "editPolicyMenu" + id : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          chnage policy
        </span>
        <IoMdSettings className="order-0 h-4 w-4 peer-hover:text-fabric-700" />
      </div>
    </>
  );
}
