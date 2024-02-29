import { Hiring_type } from "@/types/database.tables.types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import SubmitButton from "./SubmitButton";
import { CreateCandidate } from "@/actions/hiring/CreateCandidate";
import useToast from "@/hooks/useToast";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import ApplyFormSection from "@/app/careers/[career_id]/components/AppliymentForm/ApplyFormSection";
import { usePathname, useRouter } from "next/navigation";
import useHiringGuest from "@/app/careers/hooks/useHiringGuest";
import { FormulateFormData } from "@/app/(dashboard)/Hiring/components/HiringTable/helpers/CountNewCandidates";
import { GetQuestions } from "@/helpers/Hiring/GetQuestions";

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
  const { toast } = useToast();
  const {
    Hiring: { data, isPending },
  } = useHiringGuest({ id: job?.id });
  const QueryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const Base_url = "https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/hiring/";
  const SubmitForm = async (formdata: FormData) => {

    const identifient = uuidv4();
    const Formdata = new FormData();
    const uploadPromises: any = [];

    //----upload_candidates_attachement-----
    try {
      formdata.forEach(async function (value: FormDataEntryValue, key: string) {
        if (typeof formdata.get(key) == "object") {
          const uploadPromise = UploadImage(
            formdata,
            key + identifient,
            "hiring",
            key,
          );
          uploadPromises.push(uploadPromise);
          Formdata.set(key, Base_url + key + identifient);
        } else {
          Formdata.set(key, value);
        }
      });
      await Promise.all(uploadPromises);
    } catch (error) {
      toast.error("something went Wrong");
    }
    const candidate = FormulateFormData(Formdata);
    const Questions = GetQuestions(candidate, job?.Questions || {});
    const response = await CreateCandidate({
      ...candidate,
      job_id: job?.id,
      "Hiring Lead": job?.job_information?.["Hiring Lead"],
      Questions,
    });
    if (response?.Submitted) {
      QueryClient.invalidateQueries({ queryKey: ["Candidates"] });
      if (!pathname.includes("careers")) {
        router.push(`/Hiring/jobs/${job?.id}`);
      } else router.push(`/careers`);
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
            <div className=" w-full border-b border-gray-18 pb-8">
              {data[0]?.Form?.map((FieldsArray: any, index: number) => {
                console.log(FieldsArray);
                return (
                  <div
                    className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem]"
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
              {data[0]?.Questions?.map((FieldsArray: any, index: number) => {
                return (
                  <div
                    className="gap-[2rem mt-4 flex w-full flex-col place-items-start justify-center "
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
            </div>
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
