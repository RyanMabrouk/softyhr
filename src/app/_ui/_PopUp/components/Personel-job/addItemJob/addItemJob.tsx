"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { useSearchParams } from "next/navigation";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import { Hr } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/components/Hr";
import SubmitButton from "@/app/careers/[career_id]/components/AppliymentForm/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import { useSettings } from "@/hooks/useSettings";
import { AddItem } from "@/actions/personal-job/addItem/addItem";

function AddItemJob() {
  const params = useSearchParams();
  const section = params.get("section") || "";
  const name = params.get("name") || "";
  const toast = useToast();

  const { data, isPending } = useSettings("job");
  const queryClient = useQueryClient();
   const { mutateAsync } = useMutation({
     mutationFn: async (formdata: FormData) => {
      await AddItem(
        data?.Champs?.[0],
        "job",
        section,
        name,
        String(formdata.get(`add ${name}`)),
      );
      
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["files"] });
       queryClient.invalidateQueries({ queryKey: ["folders"] });
     },
   });
  return (
    <PopUpSkeleton title={`add ${section}`}>
      <form action={mutateAsync} className="">
        <Input RowField={{ name: `add ${name}` }} />
        <Hr />
        <SubmitButton textSubmitting="Adding..." text="Add" />
      </form>
    </PopUpSkeleton>
  );
}

export default AddItemJob;
