import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import React from "react";
import PopUpSkeleton from "../../PopUpSkeleton";
import { IoWarning } from "react-icons/io5";
import useData from "@/hooks/useData";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useEmployeeData from "@/hooks/useEmloyeeData";
import {
  database_leave_policies_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import deleteCategorie from "@/actions/leave/deleteCategorie";
export default function DeleteLeavePolicy() {
  const { toast, toastContainer } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const policy_id = useSearchParams().get("policy_id");
  const queryClient = useQueryClient();
  const {
    leave_policies: { data: leave_policies },
    leave_categories: { data: leave_categories },
  } = useData();
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  const policy: database_leave_policies_type = leave_policies?.find(
    (p: database_leave_policies_type) => p.id == Number(policy_id),
  );
  const category: databese_leave_categories_type = leave_categories?.find(
    (c: databese_leave_categories_type) => c.id == policy?.categories_id,
  );
  // Mutation to delete Category
  const { mutate: deleteCat, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await deleteCategorie({
        categories_id: category?.id,
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
        queryKey: ["profiles", employeeId],
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
      {toastContainer}
      <PopUpSkeleton
        className="flex max-w-[45rem] flex-col items-center gap-4 px-8 py-4"
        title="Request Comments"
      >
        <IoWarning className="h-16 w-16 text-color9-500 " />
        <div className=" max-w-[30rem] text-center text-[1.25rem] leading-6  text-gray-27">
          <span>
            {`Are you sure you want to remove ${
              first_name + " " + last_name
            } from “${policy?.name}” ? `}
          </span>
        </div>
        <div className=" max-w-[70%] text-center text-[15px] leading-[22px] text-gray-20">
          {`${first_name} will lose access to their history for this policy and will no longer be able to request time off from the ${category?.name} category.`}
        </div>
        <form
          action={() => deleteCat()}
          className="flex w-full flex-col gap-2 px-2 pt-3"
        >
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <SubmitBtn className="!w-[10rem] !px-2">{`Yes, Remove ${first_name}`}</SubmitBtn>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              type="button"
              onClick={() => Router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
