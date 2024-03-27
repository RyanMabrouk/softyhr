import React, { useState } from "react";
import StatusCard from "./StatusCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateStatus } from "@/actions/settings/Hiring/createCandidateStatus";
import useToast from "@/hooks/useToast";

function AddStatus({ group_name }: { group_name: string }) {
  const [isAdding, setAdding] = useState(false);
  const [value, setValue] = useState<string>("");
  const [Error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const QueryClient = useQueryClient();
  const { mutateAsync: AddStatus, isPending } = useMutation({
    mutationFn: async () => {
      const error = await createCandidateStatus({
        name: value?.trim(),
        group_name,
      });
      if (error?.Error) {
        toast.error(error?.message);
        QueryClient.invalidateQueries({ queryKey: ["candidate_statuses"] });
        setAdding(false);
      }
    },
    onSuccess: () => {
      setAdding(false);
      setValue("")
      QueryClient.invalidateQueries({ queryKey: ["candidate_statuses"] });
    },
    onError: (Error) => {
      toast.error("something went wrong !");
    },
  });
  return (
    <div>
      {!isAdding ? (
        <div className="-b px- flex w-full items-center justify-start border-b border-gray-18 px-2">
          <p
            onClick={() => setAdding(true)}
            className="cursor-pointer py-3 text-color5-500 duration-200 ease-linear hover:text-color-primary-8"
          >
            + Add Status
          </p>
        </div>
      ) : (
        <form
          action={(formData: FormData) => {
            if (String(formData.get("status"))?.trim() === "") {
              setError("Status is required!");
              return;
            }
            AddStatus();
          }}
          className="flex min-h-[3.5rem] w-full items-start justify-between gap-[1rem] rounded-sm border-b border-gray-18 bg-white px-4 pt-4"
        >
          <div className="flex w-full flex-col items-start justify-center">
            <div className="flex w-full items-center justify-center gap-[1rem]">
              <input
                name={"status"}
                value={value?.trim()}
                type="text"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="peer h-[2.5rem] w-full overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal !text-gray-13 outline-none"
              />
            </div>
            <p
              className={`pl-8 text-sm font-medium text-red-500 ${Error ? "opacity-100" : "opacity-0"}`}
            >
              {Error || "ERROR"}
            </p>
          </div>
          <div className="mt-[0.2rem] flex items-center justify-center  gap-[1rem]">
            <button
              className="col-span-2 w-full min-w-[9rem] space-x-8 rounded-md border bg-color-primary-8 px-2 py-1 font-semibold capitalize text-white shadow-sm transition-all ease-linear first-letter:capitalize hover:bg-fabric-600   hover:shadow-md "
              type="submit"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
            <button onClick={() => setAdding(false)} type="button">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddStatus;
