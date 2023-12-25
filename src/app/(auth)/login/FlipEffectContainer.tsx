"use client";
import React, { useState } from "react";
import { GetDomainName } from "./GetDomainName";
import { WhereIsMyDomain } from "./WhereIsMyDomain";

export function FlipEffectContainer() {
  const [toggleDisplay, setToggleDisplay] = useState(false);
  return (
    <div className="perspective group relative flex h-full w-full items-center justify-center">
      <div
        className={`preserve-3d relative flex h-full w-full  items-center justify-center transition-all duration-[650ms] ${
          toggleDisplay ? "my-rotate-y-180" : ""
        }`}
      >
        <div className="backface-hidden absolute inset-0 flex h-full w-full items-center justify-center">
          <GetDomainName setToggleDisplay={setToggleDisplay} />
        </div>
        <div className="my-rotate-y-180 backface-hidden absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
          <WhereIsMyDomain setToggleDisplay={setToggleDisplay} />
        </div>
      </div>
    </div>
  );
}
