"use client";
import TabsPannelGeneric from "@/app/_ui/TabsPannelGeneric";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import PdfViewer from "./Components/pdfViewer";

function page() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <TabsPannelGeneric
        TabsPannel={[
          {
            label: "Resume",
            Component: () => (
              <PdfViewer url="https://shrifiles.b-cdn.net/samples-doc/sample-corporate-resume.pdf" />
            ),
          },
          {
            label: "Cover Letter",
            Component: () => (
              <PdfViewer url="https://shrifiles.b-cdn.net/samples-doc/sample-corporate-resume.pdf" />
            ),
          },
        ]}
      />
    </div>
  );
}

export default page;
