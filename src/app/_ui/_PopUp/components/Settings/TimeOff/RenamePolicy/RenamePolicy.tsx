import changeLeavePolicyName from "@/actions/settings/leave/changeLeavePolicyName";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import usePolicy from "@/hooks/TimeOff/usePolicy";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function RenamePolicy() {
  const { toast } = useToast();
  const Router = useRouter();
  const { policy_id } = useParams();
  const { category, policy } = usePolicy({ policy_id: Number(policy_id) });
  // save policy name mutation
  const queryClient = useQueryClient();
  const { mutate: changeName, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await changeLeavePolicyName({
        policy_id: Number(policy_id),
        formData: formData,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Policy name changed successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_policies"] });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      title="Rename this Policy"
      className=" flex w-full min-w-[40rem] flex-col items-center gap-2 px-8 py-10"
    >
      <form
        action={changeName}
        className="flex w-full max-w-[35rem] flex-col items-center gap-3"
      >
        <section className="flex w-full flex-row items-center gap-3">
          <InputGeneric
            name="name"
            label="Enter a new name for this policy"
            className="!min-w-[17.5rem]"
            defaultValue={policy?.name}
          />
          <div className="-mb-5 flex flex-row items-center gap-1 ">
            <span>
              {generateLeaveCategorieIcon({
                categorie: category,
                className: "w-5 h-5 text-gray-21",
              })}
            </span>
            <span className="text-sm text-gray-21">{`This is a ${capitalizeFirstLetter(category?.name ?? "")} policy`}</span>
          </div>
        </section>
        <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
        <div className="flex flex-row gap-4 self-start pt-3">
          <SubmitBtn disabled={isPending}>Save</SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
