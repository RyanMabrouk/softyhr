"use client";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import useData from "@/hooks/useData";
import AdditionnalInputs from "./components/AdditionnalInputs";
import useHiring from "@/hooks/Hiring/useHiring";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "@/app/careers/[career_id]/components/AppliymentForm/SubmitButton";
import { CgNotes } from "react-icons/cg";
import { Edit_JobOpening } from "@/actions/hiring/EditJobOpening";
import useToast, { ToastContainer } from "@/hooks/useToast";
import { TiClipboard } from "react-icons/ti";
import { useQueryClient } from "@tanstack/react-query";
import ChangesSection from "@/app/(dashboard)/people/components/ChangesSection/ChangesSection";
import { FaArrowLeftLong } from "react-icons/fa6";
import UnsavedChanges from "@/app/_ui/_PopUp/components/Hiring/UnsavedChanges/UnsavedChanges";
import Loader from "@/app/_ui/Loader/Loader";
import { useSettings } from "@/hooks/Settings/useSettings";

function Page() {
  const params = useSearchParams();
  const id = params?.get("id");
  const QueryClient = useQueryClient();
  const [touched, setTouched] = useState<boolean>(false);
  const router = useRouter();
  const [Show, setShow] = useState<boolean>(false);
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });
  const { toast } = useToast();
  const {  data, isPending  } = useSettings("Hiring");

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
        <Loader />
      ) : (
        <div className="flex min-h-full min-w-full items-center justify-center  py-8">
          <div className="flex min-h-full w-11/12 flex-col items-start justify-start gap-[1.5rem] rounded-xl p-2 px-12 py-6">
            <button
              onClick={() => setShow(true)}
              className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-11"
            >
              <FaArrowLeftLong fontSize="0.7rem" />
              <h1 className="hover:underline">Job Opening</h1>
            </button>
            <div className="flex w-full items-start justify-start gap-2 border-b border-gray-18 pb-2">
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
                  setTouched={setTouched}
                  FieldsArray={data?.["Fields"]}
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
              <ChangesSection setTouched={setTouched} />
            </form>
          </div>
        </div>
      )}
      {Show && (
        <div className="fixed top-0 z-30 flex h-screen w-screen items-center justify-center">
          <div
            className="absolute z-50 h-full w-full bg-gray-14"
            onClick={() => setShow(false)}
          />
          <UnsavedChanges setShow={setShow} />
        </div>
      )}
    </>
  );
}

export default memo(Page);
