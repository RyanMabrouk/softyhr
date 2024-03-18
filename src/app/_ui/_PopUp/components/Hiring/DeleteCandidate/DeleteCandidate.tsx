import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import PopUpSkeleton from "../../../PopUpSkeleton";
import Link from "next/link";
import { deleteJobOpening } from "@/actions/hiring/DeleteJobOpening";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import useHiring from "@/hooks/Hiring/useHiring";
import { Hiring_type } from "@/types/database.tables.types";
import SubmitBtn from "../DeleteJob/SubmitBtn";
import useCandidate from "@/hooks/Hiring/useCandidate";
import { deleteCandidate } from "@/actions/hiring/DeleteCandidate";

function DeleteCandidate() {
  const [Value, setValue] = useState<string>();
  const params = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const { Job_id } = useParams();
  const queryClient = useQueryClient();
  const id = Number(params?.get("id")) || 0;
  const {
    candidates: { data, isPending },
  } = useCandidate("", { id });

  async function delete_candidate() {
    const response = await deleteCandidate(id);
    if (response?.Error) toast.error(response?.Msg);
    else toast.success(response?.Msg);
    router.push(`/Hiring/jobs/${Job_id}`);
    queryClient.invalidateQueries({ queryKey: ["Candidates"] });
  }

  return (
    <PopUpSkeleton title="Just Checking...">
      <form
        action={delete_candidate}
        className="flex min-w-[35rem] flex-col items-center justify-center gap-[1rem] px-5 py-6 "
      >
        <FaRegTrashAlt className="!text-6xl !text-red-700" />
        <h1 className="w-[30rem] text-center text-lg">
          Are you sure you want to delete this candidate?
        </h1>
        <div className="flex flex-col items-center justify-start gap-[0.5rem] bg-gray-14 px-12 py-4">
          <div className="flex flex-col items-center justify-start">
            <h1>{data?.["First Name"]}</h1>
            <h1 className="text-sm font-light text-gray-29">
              {data?.["Last Name"]}
            </h1>
            <div className="flex items-center justify-center gap-[0.5rem] text-sm font-light text-gray-29">
              <RxAvatar className="text-lg !text-color-primary-8" />
            </div>
          </div>
          <h1 className="text-sm text-red-700">
            Type "Delete" to permanently delete this candidate.
          </h1>
          <input
            className="focus:shadow-green h-[2rem] w-[8rem] pl-2 outline-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
            name="Delete"
          />
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
        <div className="flex items-center justify-start gap-[1rem] self-start">
          <SubmitBtn
            PendingText="Deleting..."
            text=" Delete Job Opening"
            className={
              "border border-gray-14 bg-white px-4 py-1 text-lg text-gray-14 " +
              (Value == "Delete"
                ? " cursor-pointer !bg-color-primary-8"
                : "cursor-not-allowed")
            }
            disabled={Value != "Delete"}
          />
          <Link href="/" className=" bg-gray-17 px-4 py-1 text-lg text-gray-29">
            Keep Job Opening
          </Link>
        </div>
      </form>
    </PopUpSkeleton>
  );
}

export default DeleteCandidate;
