import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { IoWarning } from "react-icons/io5";
import useData from "@/hooks/useData";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmployeeData from "@/hooks/useEmloyeeData";
import deleteCategorie from "@/actions/leave/deleteCategorie";
import usePolicy from "@/hooks/useCategory";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
export default function DeleteLeavePolicy() {
  const { toast } = useToast();
  const Router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const employeeId = params.employeeId ?? searchParams.get("employeeId");
  const policy_id = searchParams.get("policy_id") ?? params.policy_id;
  const queryClient = useQueryClient();
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  const { policy, category } = usePolicy({ policy_id: Number(policy_id) });
  // Mutation to delete Category
  const { mutate: deleteCat, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await deleteCategorie({
        categories_id: category?.id ?? 0,
        user_id: employeeId,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Policy Deleted Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_balance"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", employeeId],
      });
      Router.back();
    },
  });
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  return (
    <>
      <PopUpSkeleton
        className="flex max-w-[35rem] flex-col items-center gap-4 px-8 py-4"
        title="Just Checking..."
      >
        <IoWarning className="h-16 w-16 text-color9-500 " />
        <div className=" max-w-[30rem] text-center text-[1.25rem] leading-6  text-gray-27">
          <span>
            {"Are you sure you want to remove "}
            <strong>{first_name + " " + last_name}</strong>
            {` from “${policy?.name}” ? `}
          </span>
        </div>
        <div className=" max-w-[85%] text-center text-[15px] leading-[22px] text-gray-20">
          {`${first_name} will lose access to their history for this policy and will no longer be able to request time off from the ${category?.name} category.`}
        </div>
        <form
          action={() => deleteCat()}
          className="flex w-full flex-col gap-2 px-2 pt-3"
        >
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <SubmitBtn
              className="!max-w-[20rem] !w-fit !px-2"
              disabled={isPending}
            >{`Yes, Remove ${first_name}`}</SubmitBtn>
            <CancelBtnGeneric />
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
