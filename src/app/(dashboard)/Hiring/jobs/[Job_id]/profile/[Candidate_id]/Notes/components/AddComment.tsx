import { CreateNewComment } from "@/actions/hiring/Comment/CreateNewComment";
import avatar from "/public/default_avatar.png";
import { Avatar } from "antd";
import Image from "next/image";
import React, { memo, useRef, useState } from "react";
import { FaLink } from "react-icons/fa";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import useData from "@/hooks/useData";

interface AddCommentPropsType {
  AssignTo: string;
  reply_id?: string;
  isFirstReply?: boolean;
  className?: string;
  main?: boolean;
}
function AddComment({
  AssignTo,
  reply_id,
  className,
  isFirstReply = false,
  main = false,
}: AddCommentPropsType) {
  const {
    user_profile: { data, isPending },
  } = useData();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [Added, setAdded] = useState<boolean>(false);
  const QueryClient = useQueryClient();
  async function CreateNewCommentHandler(formdata: FormData) {
    setAdded(true);
    const response = await CreateNewComment(
      String(formdata?.get("newComment")),
      data?.user_id,
      AssignTo,
      reply_id,
    );
    if (response?.Submitted) {
      toast.success(response?.message);
      QueryClient.invalidateQueries({ queryKey: ["candidate_comments"] });
      formRef.current?.reset();
    } else toast.error(response?.message);
  }
  return (
    <div
      className={`flex w-full max-w-full flex-col items-start justify-center ${className}`}
    >
      {!isPending && (!Added || main) && (
        <div
          className={`flex w-full max-w-full items-start justify-center gap-2 ${className}`}
        >
          <Avatar
            size={40}
            icon={
              <Image
                alt={data?.["Basic Infomration"]?.["First name"] || "user"}
                width={100}
                height={100}
                className="rounded-full"
                src={data?.picture || avatar}
              />
            }
          />
          <form
            ref={formRef}
            action={CreateNewCommentHandler}
            className="w-full"
          >
            <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
              <div className="w-full rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
                <label className="sr-only">Your comment</label>
                <textarea
                  rows={4}
                  className="w-full border-0 bg-white px-0 text-base text-gray-900 outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required
                  name="newComment"
                ></textarea>
              </div>
              <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
                <button
                  type="submit"
                  className="dark:focus:color-primary-3 text-lf text- inline-flex items-center rounded-lg bg-color-primary-8 px-4 py-2.5 font-semibold text-white duration-200 ease-linear hover:bg-color-primary-8 focus:ring-4 focus:ring-color-primary-7"
                >
                  Post comment
                </button>
                <div className="flex space-x-1 ps-0 sm:ps-2 rtl:space-x-reverse">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <FaLink className="text-gray-13" />
                    <span className="sr-only">Attach file</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default memo(AddComment);
