import { useSettings } from "@/hooks/Settings/useSettings";
import { Hiring_type } from "@/types/database.tables.types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import SubmitButton from "./SubmitButton";
import { CreateCandidate } from "@/actions/hiring/CreateCandidate";
import { FormulateFormData } from "@/helpers/Hiring/CountNewCandidates";
import useToast from "@/hooks/useToast";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import ApplyFormSection from "@/app/careers/[career_id]/components/AppliymentForm/ApplyFormSection";
import { usePathname, useRouter } from "next/navigation";

interface AppliymentFormPropsType {
  job: Hiring_type;
  ButtonText: string;
  SubmittingButtonText: string;
  SuccessMessage: string;
}

function AppliymentForm({
  job,
  ButtonText,
  SuccessMessage,
  SubmittingButtonText,
}: AppliymentFormPropsType) {
  const { toastContainer, toast } = useToast();
  const { data, isPending } = useSettings("AppliementForm");
  const QueryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const SubmitForm = async (formdata: FormData) => {
    const identifient = uuidv4();
    const Formdata = new FormData();
    const uploadPromises: any = [];

    //----upload_candidates_attachement-----
    /* try{
    formdata.forEach(async function (value: FormDataEntryValue, key: string) {
      if (typeof formdata.get(key) == "object") {
        const uploadPromise = UploadImage(
          formdata,
          key + identifient,
          "hiring",
          key,
        );
        uploadPromises.push(uploadPromise);
        Formdata.set(key, key + identifient);
      } else {
        Formdata.set(key, value);
      }
    });
    await Promise.all(uploadPromises);
    }catch(error){
      toast.error("something went Wrong");
    }*/
    formdata.set(
      "Cover Letter",
      "https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/hiring/Resumea6fc2c85-b250-4179-9048-e03b59fbe9cd?t=2024-01-31T09%3A45%3A11.663Z",
    );
    formdata.set(
      "Resume",
      "https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/hiring/Resumea6fc2c85-b250-4179-9048-e03b59fbe9cd?t=2024-01-31T09%3A45%3A11.663Z",
    );
    const response = await CreateCandidate({
      ...FormulateFormData(formdata),
      job_id: job?.id,
      "Hiring Lead": job?.job_information?.["Hiring Lead"],
    });
    if (response?.Submitted) {
      console.log("Candidates", job?.id);
      QueryClient.invalidateQueries({ queryKey: ["Candidates"] });
      if (!pathname.includes("careers")) {
        router.push(`/Hiring/jobs/${job?.id}`);
      }
        toast.success(SuccessMessage);
    } else toast.error(response?.Msg);
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="h-full w-full">
          <form
            className="flex flex-col items-start justify-center gap-[1rem]"
            action={SubmitForm}
          >
            {data?.map((FieldsArray: any, index: number) => {
              return (
                <div
                  className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                  key={index}
                >
                  <div className="flex flex-col items-start justify-center gap-[1rem]">
                    <ApplyFormSection
                      key={uuidv4()}
                      FieldsCheck={job?.Application_Details}
                      FieldsArray={FieldsArray}
                    />
                  </div>
                </div>
              );
            })}
            <div className="-mt-4 flex items-center justify-center gap-[2rem]">
              <SubmitButton
                textSubmitting={SubmittingButtonText}
                text={ButtonText}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AppliymentForm;
