import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import getCandidate from "@/api/Hiring/getCandidates";
import { CandidateType } from "@/types/candidate.types";
import _debounce from "lodash/debounce";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { log } from "util";

type searchProps = {
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
};

function Search({ search, setSearch }: searchProps) {
  const [searchArray, setSearchArray] = React.useState<string[]>();
  const [options, setOption] = React.useState<readonly string[]>([]);

  const handleChange = (newValue: string[]) => {
    setSearchArray(newValue);

    newValue.length > 0
      ? setSearch(
          "or" +
            newValue
              ?.map((keyword) => {
                return [
                  [`(Email.ilike.%${keyword}%)`],
                  [`(status.ilike.%${keyword}%)`],
                  [`(Phone.ilike.%${keyword}%)`],
                  [`(full_name.ilike.%${keyword}%)`],
                ];
              })
              .flat()
              .join(",or") || ("" as string),
        )
      : setSearch("");
  };
  const supabse = createClientComponentClient();

  const debouncedSearch = _debounce(async (searchValue) => {
    const querySearch =
      searchValue.length > 0
        ? `or(Email.ilike.%${searchValue}%),or(status.ilike.%${searchValue}%),or(Phone.ilike.%${searchValue}%),or(full_name.ilike.%${searchValue}%)`
        : "";
    const result = await supabse
      .from("candidates")
      .select("*")
      .or(querySearch ?? "");

    setOption(
      result?.data?.map((candidate: CandidateType) => {
        return candidate?.full_name;
      }) || [],
    );
  }, 300);

  return (
    <div className="my-4">
      <Autocomplete
        multiple
        id="tags-standard"
        options={options ?? []}
        value={searchArray}
        onChange={(_, newValue) => {
          handleChange(newValue);
        }}
        freeSolo
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
            variant="standard"
            placeholder="Search"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}

export default Search;
