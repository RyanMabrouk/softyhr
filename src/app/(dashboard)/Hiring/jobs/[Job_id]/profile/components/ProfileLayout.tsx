"use client";
import {
  CandidateProfileRoutes,
  CandidateProfileRoutesType,
} from "@/constants/Hiring/CandidateRoutes.constants";
import { formatCustomDate, monthsAgo } from "@/helpers/date.helpers";
import useCandidate from "@/hooks/Hiring/useCandidate";
import useHiring from "@/hooks/Hiring/useHiring";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";
import avatar from "/public/avatar.png";
import CandidatesInfos from "./CandidatesInfos";
import Loader from "@/app/_ui/Loader/Loader";
import { Avatar } from "antd";

function ProfileLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const { Candidate_id, Job_id } = params;
  const {
    candidates: { data: candidates_data, isPending: candidates_isPending },
  } = useCandidate("", { id: Candidate_id });
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id: Job_id });
  const ActiveRoute =
    usePathname().split("/").slice(-1).join("") ||
    CandidateProfileRoutes[0]?.label;
  return (
    <>
      {Hiring_isPending || candidates_isPending ? (
        <Loader />
      ) : (
        <div className="flex h-full items-start justify-center">
          <div className="flex h-full w-full ">
            <div className="flex h-full w-full flex-col">
              <div className="z-20 flex h-[13rem] justify-center bg-gradient-to-r from-color-primary-7  to-color-primary-9 transition-all duration-300 ">
                <div
                  className={
                    "mt-2 flex w-3/5 flex-col items-start justify-start gap-[1rem] "
                  }
                >
                  <Link
                    href={`/Hiring/jobs/${Job_id}`}
                    className="flex items-center justify-center gap-2 text-sm text-gray-18 duration-200 ease-linear hover:text-color-primary-8 hover:underline"
                  >
                    <BsArrowLeft />
                    {`${Hiring_data[0]?.job_information?.["Posting Title"]} - ${Hiring_data[0]?.job_information?.["Job Location"] || "Remote"}`}
                  </Link>
                  <div
                    className={"flex-column flex w-full flex-col gap-[1.3rem] "}
                  >
                    <div className="flex items-center justify-start gap-[1rem]">
                      <div className="z-10 h-[6rem] w-[6rem] rounded-full border-color-primary-2 ">
                        {/*
                        <Image
                          src={candidates_data?.data?.picture || avatar}
                          alt="user-name"
                          priority
                          width={208}
                          height={208}
                          className={
                            "h-full  w-full cursor-pointer rounded-full border-4 border-white bg-gray-6 object-cover"
                          }
                        />*/}
                        <Avatar
                          size={20}
                          icon={
                            <Image
                              /*      className={
                                "h-full  w-full cursor-pointer rounded-full border-4 border-white bg-gray-6 object-cover"
                              }*/
                              alt={
                                candidates_data[0]?.["First Name"] +
                                  " " +
                                  candidates_data[0]?.["Last Name"] ||
                                "candidate picture"
                              }
                              width={208}
                              height={208}
                              src={candidates_data?.data?.picture || avatar}
                            />
                          }
                        />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">
                          {candidates_data[0]?.["First Name"] +
                            " " +
                            candidates_data[0]?.["Last Name"] ||
                            "candidate name"}
                        </h1>
                        <h1 className="text-xl font-medium text-white">
                          {`Added on ${formatCustomDate(candidates_data[0]?.created_at)} (in ${monthsAgo(candidates_data[0]?.created_at)})`}
                        </h1>
                      </div>
                      <div className={"flex h-10 gap-[1rem] "}></div>
                    </div>
                    <div className="flex">
                      {CandidateProfileRoutes?.map(
                        ({
                          label,
                          path,
                          Pathname,
                          Icon,
                        }: CandidateProfileRoutesType) => (
                          <Link
                            key={label}
                            href={path(String(Job_id), String(Candidate_id))}
                            className={
                              "flex items-center justify-center gap-2 overflow-hidden rounded-t-md p-3 px-6 capitalize text-white transition ease-in-out " +
                              (ActiveRoute == Pathname
                                ? `bg-white font-bold !text-color-primary-9 `
                                : `font-normal hover:bg-gray-24`)
                            }
                          >
                            <Icon
                              className={
                                "text-lg text-white transition ease-in-out " +
                                (ActiveRoute == Pathname
                                  ? `bg-white !text-color-primary-9 `
                                  : ` hover:bg-gray-24`)
                              }
                            />
                            {label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-full w-full items-center justify-start">
                {children}
              </div>
            </div>
          </div>
          <CandidatesInfos candidates_data={candidates_data} />
        </div>
      )}
    </>
  );
}

export default ProfileLayout;
