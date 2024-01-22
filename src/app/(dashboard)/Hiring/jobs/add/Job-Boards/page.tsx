"use client";
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useContext,
  useState,
} from "react";
import { StepsContext } from "../provider/StepsProvider";
import { useRouter } from "next/navigation";
import { Job_locationElementType } from "../Information-Job/components/AdditionnalInputs";
import { SiIndeed } from "react-icons/si";
import { GiOfficeChair } from "react-icons/gi";
import LocationCard from "../Information-Job/components/LocationCard";

function Page() {
  const { ApplicationDetails, InformationJob } = useContext(StepsContext);
  const router = useRouter();
  const { done: ApplicationDetails_done } = ApplicationDetails;
  const { done: InformationJob_done } = InformationJob;
  const [post, setPost] = useState<string>("");
  if (!ApplicationDetails_done && !InformationJob_done)
    router.push("/Hiring/jobs/add/Information-Job");
  else if (!ApplicationDetails_done)
    router.push("/Hiring/jobs/add/Application-Details");
  else {
    const Job_post: Job_locationElementType[] = [
      { label: "Indeed & Glassdoor", Icon: SiIndeed },
      { label: "ZipRecruiter", Icon: GiOfficeChair },
    ];

    return (
      <div className="flex h-full w-full flex-col items-start justify-start gap-[0.4rem]">
        {false ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div>
              <h1 className="font-semibold">Get the Word Out</h1>
              <p>You can choose to auto-post this job to other job sites.</p>
            </div>
            <h1 className="mt-2 font-medium text-gray-29">Post this job to:</h1>
            <div className="flex items-center justify-center gap-[1rem]">
              {Job_post?.map(
                (
                  { label, show, Icon }: Job_locationElementType,
                  index: number,
                ) => {
                  return (
                    <LocationCard
                      key={index}
                      setLocation={setPost}
                      label={label}
                      show={show || false}
                      selected={label == post}
                      Icon={Icon}
                    />
                  );
                },
              )}
              <input readOnly autoFocus hidden name={"Job_post"} value={post} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Page;
