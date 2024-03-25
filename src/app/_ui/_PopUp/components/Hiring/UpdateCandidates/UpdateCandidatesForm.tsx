import { CandidateStatusOptions } from "@/app/(dashboard)/Hiring/jobs/[Job_id]/components/CandidatesTable/components/config";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import Textarea from "@/app/(dashboard)/people/components/Fileds/textarea/textarea";
import SubmitButton from "@/app/careers/[career_id]/components/AppliymentForm/SubmitButton";
import { FormdataToObject } from "@/helpers/object.helpers";
import React from "react";
import EditCandidate from "@/actions/Candidate/EditCandidate";
import useToast from "@/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function UpdateCandidatesForm({ id }: { id: string | null }) {
  const { toast } = useToast();
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const UpdateCandidateHandler = async (formdata: FormData) => {
    const { status, comment } = FormdataToObject(formdata);
    const response = await EditCandidate(String(status), String(comment), id);
    if (response?.status == "success") toast?.success(response?.Message);
    else toast?.error(response?.Message);
    Router.push(pathname);
    queryClient.invalidateQueries({ queryKey: ["Candidates"] });
  };

  return (
    <form
      action={UpdateCandidateHandler}
      className="flex w-full flex-col items-start justify-center gap-[1rem] px-6 py-4"
    >
      <SelectInput
        RowField={{
          type:"select",
          name: "status",
          required: true,
          options: CandidateStatusOptions.filter((e) => e?.name != "All"),
        }}
      />
      <Textarea RowField={{ name: "comment" }} />
      <h1 className="text-[14px] text-gray-29">
        This will be posted to the comments feed on each candidate.
      </h1>
      <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
      <div className="flex items-start justify-center gap-[1rem]">
        <SubmitButton text="Save" textSubmitting="Saving..." />
      </div>
    </form>
  );
}

export default UpdateCandidatesForm;
