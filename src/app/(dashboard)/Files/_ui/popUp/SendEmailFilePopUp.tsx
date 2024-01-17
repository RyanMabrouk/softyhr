import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import { AiOutlineFileText } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import Error from "../components/Error";

export default function SendEmailFilePopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");

  type FormValues = {
    email: string;
    subject: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  function onError(errors: any) {
    console.log(errors);
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    Router.replace(pathname);
  };

  return (
    <>
      <div className="z-50 flex flex-col gap-2 ">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Email This File
            </h1>
            <div
              onClick={() => {
                console.log(pathname);
                Router.push(pathname);
              }}
            >
              <CgClose className="cursor-pointer text-3xl text-gray-15" />
            </div>
          </div>
        </div>
        <div className="shadow-popup flex  min-w-[38rem] flex-col gap-2 rounded-sm bg-white p-8">
          <div className="flex w-[28rem] flex-col p-2">
            <AiOutlineFileText fontSize="1.8rem" fill="#222222" />

            <p className="text-lg text-gray-11">{fileName}</p>
            <p className=" text-sm text-gray-15">
              Added 02/17/2024 by tk (512KB)
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
                  value={fileName ? `Here is the file :  ${fileName}` : ""}
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
              <ButtonPopUp check={false} className="!w-fit">
                Save
              </ButtonPopUp>
              <button
                className="cursor-pointer text-color5-500 hover:underline "
                type="reset"
                onClick={() => {
                  Router.push(pathname);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
