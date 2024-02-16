import updateData from "@/api/updateData";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface PublishButtonPropsType {
  id: string;
}

function PublishButton({ id }: PublishButtonPropsType) {
  const QueryClient = useQueryClient();
  async function PublishJob(){
   const response = await updateData("Hiring",{ "Job Status": "Open"}, {id});
   QueryClient.invalidateQueries({queryKey:['Hiring']})
  }

  return (
    <form action={PublishJob}>
      <button className=" me-2 z-20 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Publish
      </button>
    </form>
  );
}

export default PublishButton;
