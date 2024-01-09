import rejectLeaveRequest from "@/actions/leave/rejectLeaveRequest";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import useData from "@/hooks/useData";
import useToast from "@/hooks/useToast";
import { database_profile_type } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BiSolidDislike } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

export default function RejectLeaveRequest() {
  const { toast } = useToast();
  const Router = useRouter();
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
        reviewed_comment: formData.get("reviewed_comment") as string,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request rejected", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      Router.back();
    },
  });
  return (
    <>
      <div className="z-50 flex flex-col gap-2">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Denied Time Off Request
            </h1>
            <div onClick={() => Router.back()}>
              <CgClose className="cursor-pointer text-3xl text-gray-15" />
            </div>
          </div>
        </div>
        <div className="shadow-popup flex w-full min-w-[35rem] flex-col items-center bg-white px-8 py-6">
          <form
            action={reject}
            className="flex w-full flex-col items-center justify-center gap-6"
          >
            <BiSolidDislike className="-mb-4 h-24 w-24 text-fabric-700 " />
            <div className="text-[1.2rem] font-semibold  leading-[1.733rem] text-gray-27">
              Okay, You have successfully denied this request.
            </div>
            <div className="-mt-4 text-[15px] leading-[22px] text-gray-20">
              You can leave a comment on it if you would like to.
            </div>
            <div className="flex w-full  flex-col gap-1">
              <label htmlFor="note" className="text-sm text-gray-21">
                Comment (Optional)
              </label>
              <textarea
                name="note"
                className="focus:shadow-green w-full rounded-md border  border-gray-18 px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none "
                id="note"
                cols={10}
                rows={5}
                draggable
              />
            </div>
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
        </div>
      </div>
    </>
  );
}
