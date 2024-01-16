import React from "react";
import { Menu, MenuItem } from "@mui/material";
import Link from "next/link";
/*
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};
*/
/*
aria-controls={open ? "editPolicyMenu" + id : undefined}
aria-haspopup="true"
aria-expanded={open ? "true" : undefined}
onClick={handleClick}
*/
export function MenuLinksGeneric({
  id,
  options,
  anchorEl,
  setAnchorEl,
}: {
  id: string;
  options: {
    name: string;
    link: {
      pathname: string;
      query: { [key: string]: string | number };
    };
  }[];
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  const open = Boolean(anchorEl);
  return (
    <Menu
      className="shadow-green"
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
          key={e.name + i}
          className="hover:!bg-fabric-700 hover:text-white"
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          <Link href={e.link}>
            <span className="text-sm">{e.name}</span>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}
