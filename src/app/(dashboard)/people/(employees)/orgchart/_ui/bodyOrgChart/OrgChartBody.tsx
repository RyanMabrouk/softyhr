"use client";
import React from "react";
import useProfilesOrgChart from "@/hooks/files/useProfilesOrgChart";
import LoaderFiles from "@/app/(dashboard)/Files/_ui/components/Loader/LoaderFiles";
import OrgChartComponent from "../components/OrgChart/OrgChart";

const OrgChartBody = () => {
  const { profiles } = useProfilesOrgChart();
  const isPending: any = profiles.isPending;
  const allProfiles = !isPending ? profiles?.data : null;
  const data =
    allProfiles?.map((prof: any) => ({
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
    })) ?? [];
  return (
    <>
      {isPending ? (
        <LoaderFiles />
      ) : (
        <div className="mt-10 ">
          <OrgChartComponent data={data} />
        </div>
      )}
    </>
  );
};

export default OrgChartBody;
