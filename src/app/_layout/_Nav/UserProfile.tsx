"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import defaultAvatar from "/public/default_avatar.png";
import useData from "@/hooks/useData";
import signout from "@/actions/auth/signout";
import useScrollPosition from "@/hooks/useScrollPosition";

export function UserProfile() {
  const [toggleView, setToggleView] = React.useState(false);
  const {
    user_profile: { data: user },
  } = useData();
  const full_name =
    user?.["Basic Information"]?.["First name"] +
    " " +
    user?.["Basic Information"]?.["Last name"];
  // toggle the view when the user scrolls
  const scrollPosition = useScrollPosition();
  useEffect(() => {
    if (toggleView) {
      setToggleView((old) => !old);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);
  return (
    <div className="">
      <Image
        onClick={() => setToggleView((old) => !old)}
        className="h-8 w-8 cursor-pointer rounded-full "
        src={user?.picture ?? defaultAvatar}
        alt=""
        priority
        width={80}
        height={80}
      />
      {toggleView && (
        <div
          role="button"
          onClick={() => setToggleView((old) => !old)}
          className="fixed left-0 top-0 z-40 flex h-full min-h-screen min-w-full grow items-start justify-end overflow-hidden "
        >
          <div className="shadow-green z-20 mr-[1.5vw] mt-[4rem] h-fit w-max min-w-[17.5rem] overflow-clip rounded-md bg-white">
            <div className="mx-auto flex w-full flex-row items-start gap-3 rounded-t-md bg-gray-14 px-3 py-4">
              <Image
                src={user?.picture ?? defaultAvatar}
                alt="user-name"
                priority
                width={80}
                height={80}
                className="h-20 w-20 cursor-pointer rounded-full border border-white bg-gray-6 object-cover text-white"
              />
              <div className="flex flex-col gap-1">
                <div className=" text-xl font-bold capitalize text-black">
                  {full_name}
                </div>
                <Link
                  className=" w-fit rounded-md bg-fabric-700  px-2 py-1 text-sm font-medium text-white"
                  onClick={() => setToggleView((old) => !old)}
                  href={{
                    pathname: `/people/${user?.user_id}/personnal`,
                  }}
                >
                  My info
                </Link>
              </div>
            </div>

            <main
              className="flex flex-col justify-center rounded-b-md text-sm text-gray-27 transition-all ease-linear"
              role="button"
            >
              <Link
                onClick={() => setToggleView((old) => !old)}
                className="border-t bg-white px-3 py-2 text-base transition-all ease-linear hover:bg-fabric-700 hover:text-white"
                href={"/Settings/Account"}
              >
                Account settings
              </Link>
              <form
                action={() => {
                  setToggleView((old) => !old);
                  signout();
                }}
              >
                <button
                  className="w-full cursor-pointer border-t bg-white px-3 py-2 text-left text-base transition-all ease-linear hover:bg-fabric-700 hover:text-white"
                  type="submit"
                >
                  Log out
                </button>
              </form>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
