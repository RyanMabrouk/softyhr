"use client";
import React, { useContext } from "react";
import { Button } from "../../signup/ui/Button";
import toggleFormDisplay, {
  toggleFormDisplayType,
} from "../_context/toggleFormDisplay";

export function ToggleBackBtn() {
  const { setToggleDisplay } =
    useContext<toggleFormDisplayType>(toggleFormDisplay);
  return (
    <Button
      className=" !h-11 !max-w-[8rem] !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 "
      onClick={() =>
        setToggleDisplay && setToggleDisplay((old: boolean) => !old)
      }
    >
      Great, thanks!
    </Button>
  );
}
