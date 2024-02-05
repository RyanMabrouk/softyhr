import deleteLeaveCategorie from "@/actions/settings/leave/deleteLeaveCategorie";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import useToast from "@/hooks/useToast";
import { databese_leave_categories_type } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
export default function DeleteLeaveCategory() {
  const [safeWord, setSafeWord] = React.useState("");
  const { toast } = useToast();
  const categories_id = useSearchParams().get("categories_id");
  const {
    leave_categories: { data: leave_categories },
  } = useLeaveData();
  const Router = useRouter();
  const category_data: databese_leave_categories_type = leave_categories?.find(
    (e: databese_leave_categories_type) => e.id === Number(categories_id),
  );
  // delete category mutation
  const queryClient = useQueryClient();
  const { mutate: deleteCat, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await deleteLeaveCategorie({
        id: Number(categories_id),
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Category deleted successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_categories"] });
      queryClient.invalidateQueries({ queryKey: ["leave_balance"] });
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      queryClient.invalidateQueries({ queryKey: ["leave_accrued"] });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      title="Delete Time Off Category"
      className=" flex max-w-[35rem] flex-col items-center gap-2 px-8 py-6"
    >
      <FaRegTrashCan className="text-[3.6rem] text-color9-600" />
      <p className="text-center text-lg text-gray-27">
        {`Are you sure you want to delete the "${category_data?.name}" time off
        category?`}
      </p>
      <form
        action={() => deleteCat()}
        className="flex w-full flex-col items-center gap-2"
      >
        <div className="mt-4 flex w-11/12 flex-col items-center gap-2 rounded-md bg-gray-14 px-6 py-6">
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
            Delete Category
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
