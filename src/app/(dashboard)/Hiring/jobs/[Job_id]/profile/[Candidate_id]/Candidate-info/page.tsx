"use client";
import TabsPannelGeneric from "@/app/_ui/TabsPannelGeneric";
import React from "react";
import dynamic from "next/dynamic";
import ApplicationQuestions from "./Components/ApplicationQuestions";
import useCandidate from "@/hooks/Hiring/useCandidate";
import { useParams } from "next/navigation";
import PdfViewer from "./Components/pdfViewer";
import Loader from "@/app/_ui/Loader/Loader";
import { Empty } from "antd";

function Page() {
  const params = useParams();
  const { Candidate_id } = params;
  const {
    candidates: { data, isPending },
  } = useCandidate({ id: Candidate_id });
console.log(data?.[0]?.metadata?.Resume);
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-start">
          <div className="flex w-3/5 flex-col items-start justify-center gap-[2rem]">
            {data?.[0]?.metadata?.Resume ||
            data?.[0]?.metadata?.["Cover Letter"] ? (
              <TabsPannelGeneric
                TabsPannel={[
                  {
                    label: "Resume",
                    Component: () =>
                      data?.[0]?.metadata?.Resume ? (
                        <PdfViewer url={data?.[0]?.metadata?.Resume} />
                      ) : (
                        <div className="flex min-h-full w-full items-center justify-center rounded-md bg-gray-14 py-8 pt-4">
                          <Empty description="No Resume Available." />
                        </div>
                      ),
                  },
                  {
                    label: "Cover Letter",
                    Component: () =>
                      data?.[0]?.metadata?.["Cover Letter"] ? (
                        <PdfViewer
                          url={data?.[0]?.metadata?.["Cover Letter"]}
                        />
                      ) : (
                        <div className="flex min-h-full w-full items-center justify-center rounded-md bg-gray-14 py-8 pt-4">
                          <Empty description="No Cover Letter Available." />
                        </div>
                      ),
                  },
                ]}
              />
            ) : (
              <></>
            )}
            <ApplicationQuestions candidate={data?.[0]} />
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
