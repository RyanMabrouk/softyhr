"use client";
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useContext,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Job_locationElementType } from "../Information-Job/components/AdditionnalInputs";
import { SiIndeed } from "react-icons/si";
import { GiOfficeChair } from "react-icons/gi";
import LocationCard from "../Information-Job/components/LocationCard";
import Loader from "@/app/_ui/Loader/Loader";
import { useQueryClient } from "@tanstack/react-query";
import useHiring from "@/hooks/Hiring/useHiring";
import useToast from "@/hooks/useToast";
import { EditJobBoard } from "@/actions/hiring/EditJobBoard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import UnsavedChanges from "@/app/_ui/_PopUp/components/Hiring/UnsavedChanges/UnsavedChanges";
import ChangesSection from "@/app/(dashboard)/people/components/ChangesSection/ChangesSection";

function Page() {
  const router = useRouter();
  const [post, setPost] = useState<string>("");
  const params = useSearchParams();
  const id = params?.get("id");
  const [Show, setShow] = useState<boolean>(false);
  const QueryClient = useQueryClient();
  const { toast } = useToast();

  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });

  const Job_post: Job_locationElementType[] = [
    { label: "Indeed & Glassdoor", Icon: SiIndeed },
    { label: "ZipRecruiter", Icon: GiOfficeChair },
  ];

  async function EditJobBoardsHandler() {
    const response = await EditJobBoard(
        post,
       id || "",
    );
    if (response?.error) toast.error(response?.error?.Message);
    else toast.success("Application details Updated Successfully");
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    QueryClient.invalidateQueries({ queryKey: ["Hiring", id] });
    router.push("/Hiring/jobs");
    QueryClient.invalidateQueries({ queryKey: ["Hiring"] });
    QueryClient.invalidateQueries({ queryKey: ["Hiring", id] });
  }

  return (
    <>
      {Hiring_isPending ? (
        <Loader />
      ) : (
        <>
          <div className="flex min-h-full min-w-full items-center justify-center py-8">
            <div className="flex min-h-full w-11/12 flex-col items-start justify-start gap-[1.5rem] rounded-xl p-2 px-12 py-6">
              <button
                onClick={() => setShow(true)}
                className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-11"
              >
                <FaArrowLeftLong fontSize="0.7rem" />
                <h1 className="hover:underline">Job Opening</h1>
              </button>
              <div className="flex w-full items-start justify-start gap-2 border-b border-gray-18 pb-2">
                <CgNotes className="text-3xl text-color-primary-8" />
                <h1 className="text-semibold text-3xl text-color-primary-8">
                  Job information
                </h1>
                <h1 className="pt-2 text-lg text-gray-29">
                  {Hiring_data[0]?.job_information?.["Posting Title"]}
                </h1>
              </div>
              <div className="flex h-full w-full flex-col items-start justify-start gap-[0.4rem]">
                <div>
                  <h1 className="font-semibold">Get the Word Out</h1>
                  <p>
                    You can choose to auto-post this job to other job sites.
                  </p>
                </div>
                <h1 className="mt-2 font-medium text-gray-29">
                  Post this job to:
                </h1>
                <form
                  action={EditJobBoardsHandler}
                  className="flex items-center justify-center gap-[1rem]"
                >
                  {Job_post?.map(({ label, Icon }, index) => (
                    <LocationCard
                      key={index}
                      setLocation={setPost}
                      label={label}
                      show={Show || false}
                      selected={
                        label == post || label == Hiring_data?.[0]?.job_Boards
                      }
                      Icon={Icon}
                    />
                  ))}
                  <input
                    readOnly
                    autoFocus
                    hidden
                    name={"Job_post"}
                    value={post === "" ? Hiring_data?.[0]?.job_Boards : post}
                  />
                  <ChangesSection OnCancelLink="/Hiring/jobs" />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {Show && (
        <div className="fixed top-0 z-30 flex h-screen w-screen items-center justify-center">
          <div
            className="absolute z-50 h-full w-full bg-gray-14"
            onClick={() => setShow(false)}
          />
          <UnsavedChanges setShow={setShow} />
        </div>
      )}
    </>
  );
}

export default Page;
