import React, { useState } from "react";
import AddComment from "./AddComment";
import { BiSolidCommentAdd } from "react-icons/bi";

interface ReplyCommentPropsType {
  reply_id: string;
  Candidate_id: string;
  isFirstReply: boolean;
}
function ReplyComment({ reply_id, Candidate_id, isFirstReply = false }: any) {
  const [Reply, setReply] = useState<boolean>(false);

  return (
    <div className={`flex w-full  ${isFirstReply ? "justify-end" : ""}`}>
      {!Reply && (
        <div
          className={`group flex w-full cursor-pointer items-center justify-start gap-1 duration-200  ease-linear ${isFirstReply ? "justify-self-start	" : ""}`}
          onClick={() => setReply(true)}
        >
          <BiSolidCommentAdd className="!text-base !text-color5-500 duration-200 ease-linear group-hover:!text-color-primary-8" />
          <h1 className="font-base text-base text-color5-500 duration-200 ease-linear hover:underline group-hover:!text-color-primary-8">
            Reply
          </h1>
        </div>
      )}
      {Reply && (
        <AddComment
          className={!isFirstReply ? "mt-2 !w-full" : "mt-2 !w-11/12 self-end"}
          reply_id={reply_id}
          AssignTo={String(Candidate_id)}
        />
      )}
    </div>
  );
}

export default ReplyComment;
