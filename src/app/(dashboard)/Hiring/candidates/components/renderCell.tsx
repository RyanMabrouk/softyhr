import { DaysAgo, formatCustomDate } from "@/helpers/date.helpers";
import Hiring from "@/app/(dashboard)/Settings/(settings)/Jobs/page";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BiCommentAdd } from "react-icons/bi";
import { MdReadMore } from "react-icons/md";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { TableCandidateType } from "../../jobs/[Job_id]/components/CandidatesTable/components/config";
import RatingGeneric from "../../jobs/[Job_id]/components/CandidatesTable/components/RatingGeneric";
import HireStatus from "../../jobs/[Job_id]/components/CandidatesTable/components/HireStatus";

export const renderCellTableCandidate = (
  user: TableCandidateType,
  columnKey: React.Key,
) => {
  const cellValue = user[columnKey as keyof TableCandidateType];

  switch (columnKey) {
    case "id":
      return (
        <h1 className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline">
          {user?.id}
        </h1>
      );
    case "Job Opportunity":
      return (
        <Link
          href={`/Hiring/jobs/${user?.Hiring?.id}/profile/${user?.id}/Candidate-info`}
          className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline"
        >
          {user?.job_opportunity}
        </Link>
      );
    case "Candidate Info":
      return (
        <div className="flex flex-col items-start justify-center gap-2">
          <Link
            href={`/Hiring/jobs/${user?.Hiring?.id}/profile/${user?.id}/Candidate-info`}
            className="cursor-pointer text-color5-500 hover:text-color-primary-8 hover:underline"
          >
            {user?.["Candidate Info"]}
          </Link>
          <p className="text-sm leading-3 text-gray-15">
            {`${user?.metadata?.Country ? user?.metadata?.Country : ""}${user?.metadata?.City ? `, ${user?.metadata?.City}` : ""} `}
          </p>
          <p className="text-sm leading-3 text-gray-15">
            {user?.Phone ? user?.Phone : ""}
          </p>
        </div>
      );
    case "Status":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{user.status}</p>
          <p className="text-sm  text-gray-15">{user.Status_update}</p>
        </div>
      );
    case "Rating":
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
      return (
        <div className=" z-10 flex items-start justify-start gap-2">
          <HireStatus Hiring={user?.Hiring} candidate={user} />
        </div>
      );
    case "Last Email":
      const Component = user?.["Last Email"];
      return <Component />;
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
                  <MdReadMore className="text-xl text-color-primary-7 group-hover:!text-white" />
                  <Link
                    href={`/Hiring/jobs/${user?.Hiring?.id}/profile/${user?.id}/Candidate-info`}
                    className="text-black group-hover:!text-white"
                  >
                    View More
                  </Link>
                </div>
              </DropdownItem>
              <DropdownItem className="group hover:!bg-color-primary-8">
                <div className="flex items-end justify-start gap-[0.5rem] duration-200 ease-linear">
                  <BiCommentAdd className="text-xl text-color-primary-7 group-hover:!text-white" />
                  <Link
                    href={`?popup=CREATE_COMMENT&id=${user?.id}`}
                    className="text-black group-hover:!text-white"
                  >
                    Add Comment
                  </Link>
                </div>
              </DropdownItem>
              <DropdownItem className="group hover:!bg-color-primary-8">
                <div className="flex items-end justify-start gap-[0.5rem] duration-200 ease-linear">
                  <MdDelete className="text-xl text-color-primary-7 group-hover:!text-white" />
                  <Link
                    href={`?popup=DELETE_CANDIDATE&id=${user?.id}`}
                    className="text-black group-hover:!text-white"
                  >
                    Delete Candidate
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
