import React from "react";
import Loader from "@/app/_ui/Loader/Loader";

export default function LoaderPopUp() {
  return (
    <div className="items m-auto mt-10 flex h-full w-full justify-center">
      <Loader />
    </div>
  );
}
