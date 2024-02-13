import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ButtonPopUp from "../components/ButtonPopUp";
import { SubmitHandler, useForm } from "react-hook-form";
import Error from "../components/Error";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useFileData from "@/hooks/useFileData";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa6";
import { formatDateFiles } from "@/helpers/date.helpers";
import { useQueryClient } from "@tanstack/react-query";
import { sendMail } from "@/api/sendEmail";
import useToast from "@/hooks/useToast";

export default function SendEmailFilePopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  type FormValues = {
    email: string;
    subject: string;
    message: string;
  };

  const id = searchParams.get("fileId");
  const { file } = useFileData(id);
  const isPending = file.isPending;

  function onError(errors: any) {}

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await sendMail(
        data.email,
        data.subject,
        `<div className='flex flex-col gap-1'>
        <p className='text-lg'>${data.message}</p>
        <a href="${file.data[0].file_url}">${file.data[0].name}</a>
        </div>`,
      );
      toast.success("Email Sent", "Success");
    } catch (err) {
      toast.error("Error while Sneding Email please try again");
    }
    Router.replace(pathname);
  };

  return (
    <>
      {isPending ? (
        <div className="z-50">
          <LoaderPopUp />
        </div>
      ) : (
        <PopUpSkeleton
          title={"Email This File"}
          className="shadow-popup flex  min-w-[38rem] flex-col gap-2 rounded-sm bg-white p-8"
        >
          <div className="flex w-[28rem] flex-col p-2">
            {(file.data[0].file_type === "application" && (
              <FaRegFilePdf fontSize="1.8rem" fill="#cc4373" />
            )) ||
              (file.data[0].file_type === "image" && (
                <FaRegFileImage fontSize="1.8rem" fill="#777270" />
              ))}
            <p className="text-lg text-gray-11">{file.data[0].name}</p>
            <p className=" text-sm text-gray-15">
              {`Added ${formatDateFiles(file.data[0].created_at)} by ${
                file.data[0].addedBy
              } (${file.data[0].size}KB)`}
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-4 px-2 pt-3"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-11" htmlFor="input">
                  Send To *
                </label>
                <input
                  type="text"
                  placeholder="Enter email address..."
                  {...register("email", {
                    required: "This field is required",
                  })}
                  className="w-96 border border-stone-400 px-2 py-1 text-sm text-gray-12 outline-1 transition-all duration-300 placeholder:text-sm focus:outline-color1-300 "
                />
              </div>
              {errors.email && <Error>{errors.email.message}</Error>}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-11" htmlFor="input">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", {
                    required: "This field is required",
                  })}
                  value={`Here is the file :  ${file.data[0].name}`}
                  className=" w-96 border border-stone-400 px-2 py-1 text-sm text-gray-12 outline-1 transition-all duration-300  focus:outline-color1-300 "
                />
              </div>
              {errors.subject && <Error>{errors.subject.message}</Error>}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-11" htmlFor="input">
                  Message
                </label>
                <input
                  type="text"
                  {...register("message", {
                    required: "This field is required",
                  })}
                  className=" h-20 w-96 border border-stone-400 px-2 py-1 pb-12 text-sm text-gray-12 outline-1 transition-all duration-300 focus:outline-color1-300 "
                />
              </div>
              {errors.message && <Error>{errors.message.message}</Error>}
            </div>

            <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 px-2 pt-3">
              <ButtonPopUp check={false}>Save</ButtonPopUp>
              <button
                className="cursor-pointer text-color5-500 hover:underline "
                type="reset"
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </PopUpSkeleton>
      )}
    </>
  );
}
