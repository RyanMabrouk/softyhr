import { GetJobUrl } from "@/helpers/Hiring/GetJobUrl.helper";
import React, { useState } from "react";
import { FaCheck, FaCopy, FaRegCopy } from "react-icons/fa";

function CopieJobLink({ id }: { id: string }) {
  const [CopiedLink, SetCopiedLink] = useState<boolean>(false);
  return (
    <div className="flex items-start justify-center gap-[1rem]">
      <div
        data-tip="copy job link"
        className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
      >
        {!CopiedLink ? (
          <FaRegCopy
            cursor={"pointer"}
            onClick={async () => {
              navigator.clipboard.writeText(await GetJobUrl(id));
              SetCopiedLink(true);
              setTimeout(() => {
                SetCopiedLink(false);
              }, 2000);
              // toast.success("Job Link copied successfully !");
            }}
          />
        ) : (
          <FaCheck fill={"gray"} />
        )}
      </div>
    </div>
  );
}

export default CopieJobLink;
