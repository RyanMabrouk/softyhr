"use client";
import TabsPannelGeneric from "@/app/_ui/TabsPannelGeneric";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import PdfViewer from "./Components/pdfViewer";

function Page() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="w-3/5">
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
      <div>
      </div>
    </div>
  );
}

export default Page;
