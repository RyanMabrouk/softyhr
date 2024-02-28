import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import icons from "@/constants/icons";
import { databese_leave_categories_type } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertLeaveCategorie from "@/actions/settings/leave/insertLeaveCategorie";
import useToast from "@/hooks/useToast";
import updateLeaveCategory from "@/actions/settings/leave/updateLeaveCategory";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { CheckBoxGeneric } from "../../../../../CheckBoxGeneric";
import ItemsDropdownGeneric from "../../../../../ItemsDropdownGeneric";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
export default function EditLeaveCategory() {
  const { toast } = useToast();
  const SearchParams = useSearchParams();
  const pathname = usePathname();
  const categories_id = SearchParams.get("categories_id");
  const Router = useRouter();
  const {
    leave_categories: { data: leave_categories },
  } = useLeaveData();
  const categories_data: databese_leave_categories_type =
    leave_categories?.find(
      (c: databese_leave_categories_type) => c.id === Number(categories_id),
    );
  function turnIconsObjectToArray(object: any) {
    return Object.entries(object).map(([key, icon]: any) => ({
      value: key,
      label: icon("h-8 w-8 p-1 text-gray-25 hover:text-fabric-700"),
    }));
  }
  const icons_table = turnIconsObjectToArray(icons);
  // update the category mutation
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await updateLeaveCategory({
        formData,
        id: Number(categories_id),
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Category Updated Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_categories"] });
      Router.push(pathname);
    },
  });
  // insert the category mutation
  const { mutate: insert, isPending: isPending2 } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await insertLeaveCategorie({
        formData,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Category Added Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_categories"] });
      Router.push(pathname);
    },
  });
  return (
    <PopUpSkeleton
      className="flex max-w-[50rem] flex-col gap-4 px-12 py-8"
      title={
        categories_id
          ? `Edit ${capitalizeFirstLetter(categories_data?.name)}`
          : "Add Time Off Category"
      }
    >
      <form
        className="flex w-full flex-col justify-center gap-5"
        action={(formData: FormData) =>
          categories_id ? update(formData) : insert(formData)
        }
      >
        <section className="flex flex-col justify-center gap-3">
          <InputGeneric
            name="category_name"
            label="Category Name"
            required={true}
            defaultValue={categories_data?.name}
            className="  !w-full !max-w-[15rem]"
          />
          <div className="text-sm text-gray-27 opacity-80">
            People will see this name when requesting time off for the policies
            in this Category.
          </div>
          <div className="flex flex-col gap-1 opacity-85">
            <CheckBoxGeneric
              name="paid_category"
              defaultValue={categories_data?.paid}
            >
              Time off policies in this Category are paid policies
            </CheckBoxGeneric>
            {/*<CheckBoxGeneric name="paid_category">
              Make this Category name publicly visible on the calendar
  </CheckBoxGeneric>*/}
          </div>
        </section>
        <hr className="h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        <section className="flex flex-row items-center justify-start gap-6">
          <SelectGeneric
            className=" !text-[0.95rem] !text-gray-27"
            defaultValue={
              categories_data?.track_time_unit
                ? {
                    label: categories_data?.track_time_unit,
                    value: categories_data?.track_time_unit,
                  }
                : {
                    label: "Hours",
                    value: "hours",
                  }
            }
            options={[
              { label: "Hours", value: "hours" },
              { label: "Days", value: "days" },
            ]}
            name="time_unit"
            label="Track time in.."
          />
          <ItemsDropdownGeneric
            name="icon"
            defaultValue={icons_table?.find(
              (e) => e.value === categories_data?.icon,
            )}
            items={icons_table}
            label="Icon"
          />
        </section>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn disabled={isPending || isPending2} className="!w-fit">
            Save
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
