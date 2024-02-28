import React from "react";
import "./Loader.css";
import Image from "next/image";
import LoaderIcon from "/public/Loader/Loader.svg";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image src={LoaderIcon} alt="Loading..." />
    </div>
  );
}

export default Loader;
