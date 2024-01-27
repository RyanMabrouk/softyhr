import React from "react";

import OrgChartHeader from "./headerOrgChart/OrgChartHeader";
import OrgChartBody from "./bodyOrgChart/OrgChartBody";

export default function OrgChartContainer() {
  return (
    <div className="-mt-4">
      <OrgChartHeader />
      <OrgChartBody />
    </div>
  );
}
