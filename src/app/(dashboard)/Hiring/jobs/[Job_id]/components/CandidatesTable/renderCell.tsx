import { formatCustomDate } from "@/helpers/date.helpers";
import RatingGeneric from "./RatingGeneric";
import HireStatus from "./HireStatus";
import Hiring from "@/app/(dashboard)/Settings/(settings)/SettingsHiring/page";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BiCommentAdd } from "react-icons/bi";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export const renderCell = (Hiring: any, user: any, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof any];
  switch (columnKey) {
    case "id":
      return (
        <h1 className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline">
          {user?.id}
        </h1>
      );
    case "Candidate Info":
      return (
        <Link
          href={`/Hiring/jobs/${Hiring?.id}/profile/${user?.id}/Candidate-info`}
          className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline"
        >
          {user?.["Candidate Info"]}
        </Link>
      );
    case "Status":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{user.Status}</p>
          <p className="text-default-500 font-base text-base capitalize text-gray-15">
            {user.Status_update}
          </p>
        </div>
      );
    case "Rating":
      console.log(user?.Rating);
      return (
        <RatingGeneric
          DefaultValue={user?.Rating}
          id={user?.id}
          tableName="candidates"
        />
      );
    case "Applied":
      return (
        <div className="text-default-600 gap-1 border-none capitalize">
          {formatCustomDate(user.Applied)}
        </div>
      );
    case "Changes Status":
      console.log("objectobject");
      return (
        <div className=" z-10 flex items-center justify-start gap-2">
          <HireStatus Hiring={Hiring} candidate={user} />
        </div>
      );
    case "actions":
      return (
        <div className="relative flex items-center justify-end gap-2">
          <Dropdown className="border-1 border-default-200 flex items-center justify-center bg-background">
            <DropdownTrigger>
              <Button
                className="flex items-center justify-center"
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
              >
                <PiDotsThreeOutlineVerticalFill />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="shadow-green">
              <DropdownItem className="group hover:!bg-color-primary-8">
                <div className="flex items-end justify-start gap-[0.5rem] duration-200 ease-linear">
                  <BiCommentAdd className="text-xl text-color-primary-7 group-hover:!text-white" />
                  <Link href="/" className="text-black group-hover:!text-white">
                    Add Comment
                  </Link>
                </div>
              </DropdownItem>
              <DropdownItem className="group hover:!bg-color-primary-8">
                <div className="flex items-end justify-start gap-[0.5rem] duration-200 ease-linear">
                  <FaEdit className="text-xl text-color-primary-7 group-hover:!text-white" />
                  <Link
                    className="text-black group-hover:!text-white"
                    href={`?popup=UPDATE_CANDIDATE&id=${user?.id}`}
                  >
                    Update candidate
                  </Link>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
