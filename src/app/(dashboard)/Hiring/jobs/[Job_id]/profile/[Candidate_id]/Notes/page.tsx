"use client";
import useComment from "@/hooks/Hiring/useComment";
import { useParams } from "next/navigation";
import React from "react";
import CommentCard from "./components/Comment";
import Loader from "@/app/_ui/Loader/Loader";
import { FaComment } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { Empty } from "antd";
import useRealTime from "@/hooks/useRealTime";
import AddComment from "./components/AddComment";
import ReplyComment from "./components/ReplyComment";
import { useQueryClient } from "@tanstack/react-query";

function Page() {
  const params = useParams();
  const { Candidate_id } = params;
  const {
    comments: { data, isPending },
  } = useComment(
    { candidate_id: Candidate_id },
    '*,profiles("Basic Information",picture),candidate_comments(*,profiles("Basic Information",picture))',
  );

  const queryClient = useQueryClient();
  useRealTime({
    filters: [{ column: "candidate_id", value: Number(Candidate_id) }],
    table: "candidate_comments",
    onReceive: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate_comments"] });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[2rem] pb-8">
      <div className="mt-4 flex w-10/12 items-center justify-start gap-2">
        <FaComment className="!text-2xl !text-color-primary-8" />
        <h1 className="text-2xl text-color-primary-8">{`Comments ( ${data?.length || 0} )`}</h1>
      </div>
      <div className="flex h-full w-10/12 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-14 p-4 px-6">
        {isPending ? (
          <Loader />
        ) : data.length > 0 ? (
          <>
            <AddComment
              isFirstReply={true}
              main={true}
              AssignTo={String(Candidate_id)}
            />
            {data
              ?.sort((a: any, b: any) => b.id - a.id)
              ?.map((comment: any) => {
                return (
                  <>
                    {!comment?.reply_id && (
                      <CommentCard
                        key={uuidv4()}
                        PictureUrl={comment?.profiles?.picture || ""}
                        UserName={`${comment?.profiles?.["Basic Information"]?.["First Name"] || comment?.profiles?.["Basic Information"]?.["First name"]} ${comment?.profiles?.["Basic Information"]?.["Last name"] || comment?.profiles?.["Basic Information"]?.["Last name"]}`}
                        Created_at={comment?.created_at}
                        Comment_content={comment?.comment_content}
                      />
                    )}
                    {comment?.candidate_comments?.length > 0 ? (
                      <div className="flex w-11/12 flex-col items-end justify-end gap-[0.4rem]">
                        {comment?.candidate_comments?.map(
                          (reply_comment: any, index: number) => {
                            return (
                              <CommentCard
                                key={uuidv4()}
                                PictureUrl={
                                  reply_comment?.profiles?.picture || ""
                                }
                                UserName={`${comment?.profiles?.["Basic Information"]?.["First Name"] || comment?.profiles?.["Basic Information"]?.["First name"]} ${comment?.profiles?.["Basic Information"]?.["Last name"] || comment?.profiles?.["Basic Information"]?.["Last name"]}`}
                                Created_at={reply_comment?.created_at}
                                Comment_content={reply_comment?.comment_content}
                              />
                            );
                          },
                        )}
                        <ReplyComment
                          reply_id={String(comment?.id)}
                          Candidate_id={String(Candidate_id)}
                        />
                      </div>
                    ) : (
                      !comment?.reply_id && (
                        <>
                          <ReplyComment
                            isFirstReply={true}
                            reply_id={comment?.id}
                            Candidate_id={String(Candidate_id)}
                          />
                        </>
                      )
                    )}
                  </>
                );
              })}
          </>
        ) : (
          <>
            <AddComment
              isFirstReply={true}
              main={true}
              AssignTo={String(Candidate_id)}
            />
            <Empty description="No Comments Available." />
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
