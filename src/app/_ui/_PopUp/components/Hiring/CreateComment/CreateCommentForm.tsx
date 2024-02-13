import { CandidateStatusOptions } from "@/app/(dashboard)/Hiring/jobs/[Job_id]/components/CandidatesTable/components/config";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import Textarea from "@/app/(dashboard)/people/components/Fileds/textarea/textarea";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import SubmitButton from "@/app/careers/[career_id]/components/AppliymentForm/SubmitButton";
import React, { useRef } from "react";
import useToast from "@/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CreateNewComment } from "@/actions/hiring/Comment/CreateNewComment";
import useUserProfile from "@/hooks/useUserProfile";

function CreateCommentForm({ id }: { id: string | null }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const QueryClient = useQueryClient();

  const {
    profiles: { data, isPending },
  } = useUserProfile();

  async function CreateNewCommentHandler(formdata: FormData) {
    const response = await CreateNewComment(
      String(formdata?.get("newComment")),
      data?.data[0]?.user_id,
      id || "",
    );
    if (response?.Submitted) {
      toast.success(response?.message);
      QueryClient.invalidateQueries({ queryKey: ["candidate_comments"] });
      formRef.current?.reset();
      router.push(pathname);
    } else toast.error(response?.message);
  }

  return (
    <>
      {!isPending && (
        <form
          action={CreateNewCommentHandler}
          className="flex w-full flex-col items-start justify-center gap-[1rem] px-6 py-4"
        >
          <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
            <div className="w-full rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
              <label className="sr-only">Your comment</label>
              <textarea
                rows={4}
                className="w-full border-0 bg-white px-0 text-base text-gray-900 outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required
                name="newComment"
              ></textarea>
            </div>
          </div>
          <div className="flex items-start justify-center gap-[1rem]">
            <SubmitButton text="Save" textSubmitting="Saving..." />
          </div>
        </form>
      )}
    </>
  );
}

export default CreateCommentForm;
