"use client";
import TabsPannelGeneric from "@/app/_ui/TabsPannelGeneric";
import React from "react";
import dynamic from "next/dynamic";
import ApplicationQuestions from "./Components/ApplicationQuestions";
import useCandidate from "@/hooks/Hiring/useCandidate";
import { useParams } from "next/navigation";
import PdfViewer from "./Components/pdfViewer";

function Page() {
  const params = useParams();
  const { Candidate_id } = params;
  const {
    candidates: { data, isPending },
  } = useCandidate({ id: Candidate_id });

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex w-3/5 flex-col items-start justify-center gap-[2rem]">
        <TabsPannelGeneric
          TabsPannel={[
            {
              label: "Resume",
              Component: () => <PdfViewer url={data[0]?.metadata?.Resume} />,
            },
            {
              label: "Cover Letter",
              Component: () => (
                <PdfViewer url={data[0]?.metadata?.["Cover Letter"]} />
              ),
            },
          ]}
        />
        <ApplicationQuestions candidate={data[0]} />
      </div>
    </div>
  );
}

export default Page;
