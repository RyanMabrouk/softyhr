"use client";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import useData from "@/hooks/useData";
import AdditionnalInputs from "./components/AdditionnalInputs";
import useHiring from "@/hooks/useHiring";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "@/app/careers/[career_id]/components/AppliymentForm/SubmitButton";
import { CgNotes } from "react-icons/cg";
import { Edit_JobOpening } from "@/actions/hiring/EditJobOpening";
import useToast, { ToastContainer } from "@/hooks/useToast";
import { TiClipboard } from "react-icons/ti";
import { useQueryClient } from "@tanstack/react-query";

function Page() {
  const params = useSearchParams();
  const id = params?.get("id");
  const QueryClient = useQueryClient();
  const router = useRouter();
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });
  const { toast } = useToast();
  const {
    settings: { data, isPending },
  } = useData();

  async function EditJobInformation_Handler(formdata: FormData) {
    const response = await Edit_JobOpening(
      formdata,
      "job_information",
      id,
      Hiring_data[0]?.["Job Status"],
    );
    if (response?.error) toast.error(response?.error?.Message);
    else toast.success("job Information Updated Successfully");
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    router.push("/Hiring/jobs");
  }

  return (
    <>
      {isPending || Hiring_isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex min-h-full min-w-full items-center justify-center bg-gray-14 py-8">
          <div className="min-w-4/6 flex min-h-full flex-col items-start justify-start gap-[1.5rem] rounded-xl bg-white p-2 px-12 py-6">
            <div className="flex items-center justify-center gap-2">
              <CgNotes className="text-3xl text-color-primary-8" />
              <h1 className="text-semibold  text-3xl text-color-primary-8">
                Job Information
              </h1>
              <h1 className="pt-2 text-lg text-gray-29">
                {Hiring_data[0]?.job_information?.["Posting Title"]}
              </h1>
            </div>
            <form
              action={EditJobInformation_Handler}
              className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem] px-12 pb-6"
            >
              <div className="flex flex-col items-start justify-start gap-[1rem]">
                <FiledsChamps
                  FieldsArray={data[0]["Hiring"]["Fields"]}
                  champ={"hiring"}
                  user={{
                    hiring: {
                      ...Hiring_data[0]?.job_information,
                      "Job Status": Hiring_data[0]?.["Job Status"],
                    },
                  }}
                ></FiledsChamps>
                <AdditionnalInputs
                  LocationValue={
                    Hiring_data[0]?.job_information?.["Job Location"]
                  }
                  Job_locationValue={Hiring_data[0]?.job_information?.Location}
                />
              </div>

              <SubmitButton
                text="Edit Job Information"
                textSubmitting="Saving..."
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Page);
