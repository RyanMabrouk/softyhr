"use client";
import React from "react";
import OrgChartComponent from "./OrgChart";

import useProfilesOrgChart from "@/hooks/useProfilesOrgChart";
import LoaderFiles from "@/app/(dashboard)/Files/_ui/components/Loader/LoaderFiles";

const OrgChartBody = () => {
  const { profiles } = useProfilesOrgChart();
  const isPending: any = profiles.isPending;
  const wantedData: any = [];

  const allProfiles = !isPending ? profiles?.data : null;
  !isPending &&
    allProfiles.forEach((prof: any) => {
      wantedData.push({
        name:
          prof?.["Basic Information"]?.["First name"] +
          prof?.["Basic Information"]?.["Last name"],
        imageUrl: `${
          prof?.picture
            ? prof?.picture
            : "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
        }`,
        profileUrl: "http://facebook.com",
        office: prof?.["Job Information"]?.[0]?.["Department"],
        tags: "CEO",
        isLoggedUser: false,
        positionName: prof?.["Job Information"]?.[0]?.["Job Title"],
        id: prof?.user_id ? prof?.user_id : "",
        parentId: prof?.supervisor_id,
        size: "",
      });
    });
  return (
    <>
      {isPending ? (
        <LoaderFiles />
      ) : (
        <div className="mt-10 ">
          <OrgChartComponent data={wantedData} />
        </div>
      )}
    </>
  );
};

export default OrgChartBody;
