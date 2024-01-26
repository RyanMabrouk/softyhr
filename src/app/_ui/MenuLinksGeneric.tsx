import React from "react";
import { Menu, MenuItem } from "@mui/material";
import Link from "next/link";
export function MenuLinksGeneric({
  id,
  options,
  children,
  setOpenValueInParent,
}: {
  id: string;
  options: {
    name: string | React.ReactNode;
    disabled?: boolean;
    link: {
      pathname: string;
      query?: { [key: string]: string | number };
    };
  }[];
  setOpenValueInParent?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    if (setOpenValueInParent) {
      setOpenValueInParent(open);
    }
  }, [open, setOpenValueInParent]);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div
        className="h-fit w-fit"
        role="button"
        id={id}
        aria-controls={open ? "editPolicyMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {children}
      </div>
      <Menu
        className="[&_.MuiPopover-paper]:shadow-green mt-1"
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options?.map((e, i) => (
          <MenuItem
            key={i}
            className="hover:!bg-fabric-700 hover:text-white"
            onClick={() => {
              setAnchorEl(null);
            }}
            disabled={e.disabled ?? false}
          >
            <Link href={e.link}>
              <span className="text-sm">{e.name}</span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
