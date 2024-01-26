"use client";

import React, { useEffect, useRef } from "react";

import "d3-org-chart";
import "d3-flextree";
import OrgChart from "d3-org-chart";

const OrgChartComponent = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        new OrgChart()
          .container(chartContainerRef.current)
          .data(data)
          .initialZoom(0.6)
          .onNodeClick((d) => console.log(d + " node clicked"))
          .render();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return <div ref={chartContainerRef} className="" />;
};

export default OrgChartComponent;
