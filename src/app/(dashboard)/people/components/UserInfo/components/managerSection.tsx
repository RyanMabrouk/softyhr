import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";
import useProfilesData from "@/hooks/useProfilesData";
import Image from "next/image";
import avatar from "/public/avatar.png";
import React from "react";
import Link from "next/link";

function ManagerSection({ user }: any) {
  const {
    profiles: { data: manager, isPending },
  } = useProfilesData(
    { user_id: user?.supervisor_id },
    'user_id,role,picture,supervisor_id,"Basic Information","Job Information"',
  );
  console.log(manager);
  return (
    <>
      {!isPending ? (
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <h1 className="text-sm text-color-primary-7">Manager</h1>
          <UnderlinedLink>
            <Image
              height={100}
              width={100}
              className="h-[1.5rem] w-[1.5rem] rounded-full object-cover"
              alt=""
              src={manager[0]?.picture || avatar}
            />
            <Link
              href={`/people/${manager[0]?.user_id}/personnal`}
              className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:text-fabric-700 hover:underline"
            >
              {`${manager[0]?.["Basic Information"]?.["First name"]} ${manager[0]?.["Basic Information"]?.["Last name"]}`}
            </Link>
          </UnderlinedLink>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default ManagerSection;
