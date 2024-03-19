"use client";
import React from "react";
import OrgChartComponent from "./components/OrgChart/OrgChart";
import useProfilesOrgChart from "@/hooks/files/useProfilesOrgChart";
import LoaderFiles from "@/app/(dashboard)/Files/_ui/components/Loader/LoaderFiles";

const OrgChartContainer = () => {
  const {
    profiles: { data: allProfiles, isPending },
  } = useProfilesOrgChart();
  const wantedData = allProfiles?.map((p) => ({
    name:
      p?.["Basic Information"]?.["First name"] +
      p?.["Basic Information"]?.["Last name"],
    imageUrl: `${
      p?.picture ??
      "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
    }`,
    profileUrl: "http://google.com",
    office: p?.department,
    tags: "CEO",
    isLoggedUser: false,
    positionName: p?.["Job Information"]?.[0]?.["Job Title"],
    id: p?.user_id ? p?.user_id : "",
    parentId: p?.supervisor_id,
    size: "",
  }));
  return (
    <>
      {isPending ? (
        <LoaderFiles />
      ) : (
        <div className="mt-0">
          <OrgChartComponent data={wantedData ?? []} />
        </div>
      )}
    </>
  );
};

export default OrgChartContainer;
