import deleteLeavePolicyData from "@/actions/settings/leave/deleteLeavePolicyData";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import usePolicy from "@/hooks/usePolicy";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import useToast from "@/hooks/useToast";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
export default function DeleteLeavePolicyData() {
  const [safeWord, setSafeWord] = React.useState("");
  const { toast } = useToast();
  const Router = useRouter();
  const { policy_id } = useParams();
  const {
    all_users_leave_balance: { data: all_users_leave_balance },
  } = useLeaveData();
  const { policy } = usePolicy({ policy_id: Number(policy_id) });
  const number_of_employees = all_users_leave_balance?.filter(
    (b: database_profile_leave_balance_type) =>
      b.policy_id === Number(policy_id),
  ).length;
  // delete category mutation
  const queryClient = useQueryClient();
  const { mutate: deletePol, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await deleteLeavePolicyData({ id: Number(policy_id) });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Policy deleted successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_policies"] });
      queryClient.invalidateQueries({ queryKey: ["leave_balance"] });
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      queryClient.invalidateQueries({ queryKey: ["leave_accrued"] });
      Router.push("/Settings/TimeOff");
    },
  });
  return (
    <PopUpSkeleton
      title="Delete Time Off Policy"
      className=" flex min-w-[40rem] flex-col items-center gap-2 px-8 py-6"
    >
      <FaRegTrashCan className="text-[3.6rem] text-color9-600" />
      <p className="text-center text-lg text-gray-27">
        {`Are you sure you want to delete the "${policy?.name}" time off
        policy?`}
      </p>

      <form
        action={() => deletePol()}
        className="flex w-full flex-col items-center gap-2"
      >
        <div className="mt-4 flex w-11/12 flex-col items-center gap-2 rounded-md bg-gray-14 px-6 py-6">
          <p className="text-center text-sm text-color2-500">
            <strong>{`${number_of_employees} employees`}</strong> will be
            removed from this policy.
          </p>
          <p className="text-center text-color2-500">
            Type <strong>"Delete"</strong> to continue
          </p>
          <InputGeneric
            label=""
            type="text"
            name="delete"
            placeholder="Delete"
            setValueInParent={setSafeWord}
            shadow="red"
          />
        </div>
        <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
        <div className="flex flex-row gap-4 self-start px-6 pt-3">
          <SubmitBtn disabled={isPending} blocked={!(safeWord === "Delete")}>
            Delete Policy
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
