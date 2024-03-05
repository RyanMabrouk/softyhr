"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppQuestion from "./components/AppQuestion";
import ApplicationQuestionsList from "./components/ApplicationQuestionsList";
import AdditionalQuestions from "./components/AdditionalQuestions";
import AskGovermentJob from "./components/AskGovermentJob";
import ChangesSection from "@/app/(dashboard)/people/components/ChangesSection/ChangesSection";
import StepsProvider, { StepsContext } from "../../add/context/StepsContext";
import useToast from "@/hooks/useToast";
import useHiring from "@/hooks/Hiring/useHiring";
import Loader from "@/app/_ui/Loader/Loader";
import UnsavedChanges from "@/app/_ui/_PopUp/components/Hiring/UnsavedChanges/UnsavedChanges";
import { CgNotes } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { EditApplicationDetails } from "@/actions/hiring/EditApplicationDetails";
import { Application_Details_type } from "@/types/database.tables.types";
import { useQueryClient } from "@tanstack/react-query";
import EditApplicationProvider, {
  EditApplicationContext,
} from "./context/EditApplicationDetailsContext";

function ApplicationDetails() {
  const { ApplicationDetails, Update_ApplicationDetails } = useContext(
    EditApplicationContext,
  );
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id");
  const [Show, setShow] = useState<boolean>(false);
  const QueryClient = useQueryClient();
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });
  const { toast } = useToast();

  useEffect(() => {
    if (!Hiring_isPending && Hiring_data?.[0]?.Application_Details) {
      Update_ApplicationDetails({ values: Hiring_data[0].Application_Details });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Hiring_data, Hiring_isPending]);

  async function EditApplicationDetailsHandler(formdata: FormData) {
    console.log("submis", ApplicationDetails);
    const response = await EditApplicationDetails(
      {
        ...ApplicationDetails?.values,
        "Job Category": formdata?.get("Job Category"),
      },
      id,
    );
    if (response?.error) toast.error(response?.error?.Message);
    else toast.success("Application details Updated Successfully");
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    QueryClient.invalidateQueries({ queryKey: ["Hiring", id] });
    router.push("/Hiring/jobs");
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    QueryClient.invalidateQueries({ queryKey: ["Hiring", id] });
  }
  return (
    <>
      {Hiring_isPending ? (
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
                Application details
              </h1>
              <h1 className="pt-2 text-lg text-gray-29">
                {Hiring_data?.[0]?.job_information?.["Posting Title"]}
              </h1>
            </div>
            <form action={EditApplicationDetailsHandler}>
              <ApplicationQuestionsList />
              <AdditionalQuestions />
              <AskGovermentJob />
              <ChangesSection OnCancelLink="/Hiring/jobs" />
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

export default function Page() {
  return (
    <EditApplicationProvider>
      <ApplicationDetails />
    </EditApplicationProvider>
  );
}
