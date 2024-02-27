import React from "react";
import EmptyIcon from "/public/NotFound.png";
import Image from "next/image";

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem] py-14">
      <Image src={EmptyIcon} alt="Empty" />
      <h1 className="text-lg text-gray-15">
        We don't see job opening that match that status.
      </h1>
      <h1 className="text-normal text-gray-15">
        Try selecting a different status...
      </h1>
    </div>
  );
}

export default Empty;
