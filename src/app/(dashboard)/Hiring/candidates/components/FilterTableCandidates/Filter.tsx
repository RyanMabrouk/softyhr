import React, { useEffect, useState } from "react";
import DropDownSelectFilter from "./DropDownSelectFilter";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { jobStatusOptions } from "../config";
import { GlobalFilterState, GlobalRangeState } from "../types";
import useHiring from "@/hooks/Hiring/useHiring";
import useCandidateSources from "@/hooks/Hiring/useCandidateSources";
import useCandidateStatus from "@/hooks/Hiring/useCandidateStatus";
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
    'id, job_information, Hiring_Leader("Basic Information","user_id")',
  );
  const { data: data_sources, isPending: pending_sources } =
    useCandidateSources();
  const { data: data_status, isPending: pending_status } = useCandidateStatus();


  const jobOpportunityOptions = hiringData?.map(
    (item: { [x: string]: { [x: string]: { [x: string]: any } } }) => {
      return {
        label: item?.["job_information"]?.["Posting Title"],
        value: item?.id,
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
  const dataSourceOptions = data_sources?.map((item) => {
    return {
      label: item?.name || "",
      value: item?.name || "",
    };
  });

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
            options={jobStatusOptions}
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
            options={dataSourceOptions}
            title="Source"
            filter={filter.jobSourse}
            setFilter={(newFilter) =>
              setFilter((prevFilter: any) => ({
                ...prevFilter,
                jobSourse: newFilter,
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
            range={range.ratings}
            setRange={(newFilter) => {
              setRange((prevFilter: any) => ({
                ...prevFilter,
                ratings: newFilter,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
