import { GetJobUrl } from "@/app/careers/helpers/GetJobUrl.helper";
import React, { useState } from "react";
import { FaCheck, FaCopy, FaRegCopy } from "react-icons/fa";

function CopieJobLink({ id }: { id: string }) {
  const [CopiedLink, SetCopiedLink] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center gap-[1rem]">
      <div
        data-tip="copy job link"
        className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
      >
        <FaRegCopy
          cursor={"pointer"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(await GetJobUrl(id));
              SetCopiedLink(true);
              setTimeout(() => {
                SetCopiedLink(false);
              }, 2000);
            } catch (error) {
              console.error("Failed to copy text: ", error);
            }
          }}
        />
      </div>
      <p
        className={`text-sm font-normal text-color-primary-8 ${CopiedLink ? "opacity-100" : "opacity-0"}`}
      >
        Copied.
      </p>
    </div>
  );
}

export default CopieJobLink;
