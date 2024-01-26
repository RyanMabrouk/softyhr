import ToggleLeaveCategorieStatus from "@/actions/settings/leave/ToggleLeaveCategorieStatus";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdEye } from "react-icons/io";

export default function EnableLeaveCategory() {
  const { toast } = useToast();
  const Router = useRouter();
  const categories_id = useSearchParams().get("categories_id");
  // enable category mutation
  const queryClient = useQueryClient();
  const { mutate: enable, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await ToggleLeaveCategorieStatus({
        id: Number(categories_id),
        disabled: false,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Category enabled successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_categories"] });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      title="Just checking..."
      className=" flex max-w-[35rem] flex-col items-center gap-2 px-8 py-6"
    >
      <IoMdEye className="text-[3.6rem] text-fabric-700" />
      <p className="text-center text-lg text-gray-27">
        {`Are you sure you want to enable this category?`}
      </p>
      <p className="text-center opacity-70">
        <strong>Enabled categories</strong> will be visible from the Time Off
        page and will be available for selection in the Time Off Request form.
      </p>
      <form
        action={() => enable()}
        className="flex w-full flex-col items-center gap-2"
      >
        <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
        <div className="flex flex-row gap-4 self-start pt-3">
          <SubmitBtn disabled={isPending}>Enable Category</SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
