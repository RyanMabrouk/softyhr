import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { IoSearchSharp } from "react-icons/io5";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar() {
  return (
    <Search className="group">
      <SearchIconWrapper>
        <IoSearchSharp className=" z-10 h-5 w-5  text-gray-15 group-focus-within:text-fabric-700" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        className="focus-within:shadow-green rounded-3xl bg-white  placeholder-gray-15"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
