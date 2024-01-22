import { useSettings } from "@/hooks/useSettings";
import { Hiring_type } from "@/types/database.tables.types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import AppliymentFormSection from "./AplliyementFormSection";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import SubmitButton from "./SubmitButton";
import { CreateCandidate } from "@/actions/hiring/CreateCandidate";
import { FormulateFormData } from "@/helpers/CountNewCandidates";
import useToast from "@/hooks/useToast";
import { test } from "@/actions/test";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { FormdataToObject } from "@/helpers/object.helpers";

interface AppliymentFormPropsType {
  job: Hiring_type;
}

function AppliymentForm({ job }: AppliymentFormPropsType) {
  const { toastContainer, toast } = useToast();
  const { data, isPending } = useSettings("AppliementForm");

  const SubmitForm = async (formdata: FormData) => {
    const identifient = uuidv4();
    const Formdata = new FormData();
    const uploadPromises: any = [];

    //----upload_candidates_attachement-----
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


      const response = await CreateCandidate({
      ...FormulateFormData(Formdata),
      job_id: job?.id,
      });
     response?.Msg ? toast.success(response?.Msg) : null;
  };

  return (
    <>
      {toastContainer}
      {isPending ? (
        <Loader />
      ) : (
        <div className="h-full w-full">
          <form
            className="flex flex-col items-start justify-center gap-[1rem]"
            action={SubmitForm}
          >
            {data?.map((FieldsArray: any, index: number) => {
              console.log(FieldsArray);
              return (
                <div
                  className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                  key={index}
                >
                  <div className="flex flex-col items-start justify-center gap-[1rem]">
                    <AppliymentFormSection
                      key={uuidv4()}
                      FieldsCheck={job?.Application_Details}
                      FieldsArray={FieldsArray}
                    />
                  </div>
                </div>
              );
            })}
            <div className="-mt-4 flex items-center justify-center gap-[2rem]">
              <SubmitButton />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AppliymentForm;
