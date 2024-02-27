import updateData from "@/api/updateData";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface PublishButtonPropsType {
  id: string;
  status: string;
}

function PublishButton({ id, status }: PublishButtonPropsType) {
  const QueryClient = useQueryClient();
  const { toast } = useToast();
  async function PublishOrKeepJob() {
    const response = await updateData(
      "Hiring",
      { "Job Status": status == "Open" ? "Draft" : "Open" },
      { id },
    );
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    if (response?.error) toast.error("something went wrong !");
  }

  return (
    <form action={PublishOrKeepJob}>
      <SubmitBtn
        className={` ${status == "Open" ? "!bg-color-primary-8" : "!bg-color-primary-7"} z-20 me-2 rounded-lg  px-3 py-1.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none dark:bg-green-700 dark:hover:bg-green-800`}
      >
        {status != "Open" ? "Publish" : "UnPublish"}
      </SubmitBtn>
    </form>
  );
}

export default PublishButton;
