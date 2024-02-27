import { GetJobUrl } from "@/app/careers/helpers/GetJobUrl.helper";
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
        <FaRegCopy
          cursor={"pointer"}
          onClick={async () => {
            navigator.clipboard.writeText(await GetJobUrl(id));
            SetCopiedLink(true);
            setTimeout(() => {
              SetCopiedLink(false);
            }, 2000);
          }}
        />
      </div>
     <p className={`text-color-primary-8 text-sm font-normal ${CopiedLink ? "block" : "hidden"}`}>Copied.</p>
    </div>
  );
}

export default CopieJobLink;
