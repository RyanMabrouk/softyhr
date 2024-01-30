import rejectLeaveRequest from "@/actions/leave/rejectLeaveRequest";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import useData from "@/hooks/useData";
import useToast from "@/hooks/useToast";
import { database_profile_type } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BiSolidDislike } from "react-icons/bi";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { TextFeildGeneric } from "@/app/_ui/TextFeildGeneric";

export default function RejectLeaveRequest() {
  const { toast } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const leave_request_id = useSearchParams().get("leave_request_id");
  const {
    user_profile: { data: user_profile },
  }: { [key: string]: { data: database_profile_type } } = useData();
  const queryClient = useQueryClient();
  const { mutate: reject, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await rejectLeaveRequest({
        request_id: Number(leave_request_id),
        reviewed_by: user_profile?.user_id,
        reviewed_comment: (formData.get("note") as string) ?? "",
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request rejected", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      Router.back();
    },
  });
  return (
    <>
      <PopUpSkeleton
        className=" flex w-full min-w-[35rem] flex-col items-center px-8 py-6"
        title="Denied Time Off Request"
      >
        <form
          action={reject}
          className="flex w-full flex-col items-center justify-center gap-6"
        >
          <BiSolidDislike className="-mb-4 h-24 w-24 text-fabric-700 " />
          <div className="text-[1.2rem] font-semibold  leading-[1.733rem] text-gray-27">
            Okay, You will denie this request.
          </div>
          <div className="-mt-4 text-[15px] leading-[22px] text-gray-20">
            You can leave a comment on it if you would like to.
          </div>
          <TextFeildGeneric
            name="note"
            label="Comment (Optional)"
            required={false}
          />
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
            <SubmitBtn disabled={isPending} className="!w-fit">
              Save
            </SubmitBtn>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              type="button"
              onClick={() => Router.back()}
            >
              No Thanks
            </button>
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
