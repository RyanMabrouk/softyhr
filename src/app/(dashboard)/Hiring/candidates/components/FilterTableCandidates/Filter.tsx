import React, { useEffect, useState } from "react";
import DropDownSelectFilter from "./DropDownSelectFilter";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { GlobalFilterState, GlobalRangeState } from "../types";
import useHiring from "@/hooks/Hiring/useHiring";

import { removeEmptyAndDuplicates } from "../../helpers/removeEmptyAndDuplicates";
import CollapseCheckboxFilter from "./CollapseCheckboxFilter";
import CollapseRatingFilter from "./CollapseRatingFilter";
import CollapseDatesFilter from "./CollapseDatesFilter";

type FilterProps = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filter: GlobalFilterState;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  range: GlobalRangeState;
  setRange: React.Dispatch<React.SetStateAction<any>>;
};

function Filter({
  selectedFilter,
  setSelectedFilter,
  filter,
  setFilter,
  range,
  setRange,
}: FilterProps) {
  const {
    Hiring: { data: hiringData, isPending, meta, isPlaceholderData },
  } = useHiring(
    {},
    'id, job_information, job_Boards,"Job Status", Hiring_Leader("Basic Information","user_id")',
  );

  const jobOpportunityOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label: item?.["job_information"]?.["Posting Title"],
        value: item?.id,
      };
    },
  );
  const jobLocationOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label: item?.["job_information"]?.["Location"],
        value: item?.id,
      };
    },
  );
  const jobSourceOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label: item?.["job_Boards"],
        value: item?.["job_Boards"],
      };
    },
  );
  const jobStatusOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label: item?.["Job Status"],
        value: item?.["Job Status"],
      };
    },
  );
  const hiringLeaderOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label:
          item?.["Hiring_Leader"]?.["Basic Information"]?.["Preferred name"],
        value: item?.["Hiring_Leader"]?.["user_id"],
      };
    },
  );

  return (
    <div>
      <DropDownSelectFilter
        filter={selectedFilter}
        setFilter={setSelectedFilter}
      />
      <div className=" my-5 bg-gray-17 pb-4">
        <div className="flex items-center justify-between bg-gray-10 pl-2 text-white">
          <p>Filtrer les résultats</p>
          <IconButton>
            <StarIcon sx={{ color: "white", fontSize: "20px" }} />
          </IconButton>
        </div>
        <div className="px-3">
          <CollapseCheckboxFilter
            options={removeEmptyAndDuplicates(jobStatusOptions)}
            title="Job Status"
            filter={filter?.jobStatus}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobStatus: newFilter,
              }))
            }
          />
          <CollapseCheckboxFilter
            options={jobOpportunityOptions}
            title="Job Opportunity"
            filter={filter.jobName}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobName: newFilter,
              }))
            }
          />
          <CollapseCheckboxFilter
            options={removeEmptyAndDuplicates(hiringLeaderOptions)}
            title="Hiring Leader"
            filter={filter.hiringLeader}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                hiringLeader: newFilter,
              }))
            }
          />

          <CollapseCheckboxFilter
            options={removeEmptyAndDuplicates(jobSourceOptions)}
            title="Source"
            filter={filter.jobSourse}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobSourse: newFilter,
              }))
            }
          />
          <CollapseCheckboxFilter
            options={removeEmptyAndDuplicates(jobLocationOptions)}
            title="Location"
            filter={filter.jobLocation}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobLocation: newFilter,
              }))
            }
          />
          <CollapseRatingFilter
            title="Star Rating"
            range={range.ratings}
            setRange={(newFilter) => {
              setRange((prevFilter: any) => ({
                ...prevFilter,
                ratings: newFilter,
              }));
            }}
          />
          <CollapseDatesFilter
            title="Application Dates"
            range={range.dates}
            setRange={(newFilter) => {
              setRange((prevFilter: any) => ({
                ...prevFilter,
                dates: newFilter,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
