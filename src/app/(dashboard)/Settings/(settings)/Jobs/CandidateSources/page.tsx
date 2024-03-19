"use client";

import { createCandidateSources } from "@/actions/settings/Hiring/createCandidateSource";
import useCandidateSources from "@/hooks/Hiring/useCandidateSources";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { sourcesType } from "../types/status.types";
import { FaTrash } from "react-icons/fa6";
import Loader from "@/app/_ui/Loader/Loader";

function Hiring() {
  const [isAdding, setAdding] = useState(false);
  const [value, setValue] = useState<string>("");
  const [Error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const QueryClient = useQueryClient();
  const { data, isPending: candidateSourcesPending } = useCandidateSources();

  const { mutateAsync: AddSource, isPending } = useMutation({
    mutationFn: async () => {
      const error = await createCandidateSources({
        name: value?.trim(),
      });
      if (error?.Error) {
        toast.error(error?.message);
        QueryClient.invalidateQueries({ queryKey: ["candidate_sources"] });
        setAdding(false);
        setValue("");
      }
    },
    onSuccess: () => {
      setAdding(false);
      setValue("");
      QueryClient.invalidateQueries({ queryKey: ["candidate_sources"] });
    },
    onError: (Error) => {
      toast.error("something went wrong !");
    },
  });
  return (
    <div className="mt-6 flex flex-col pl-6">
      <p className="text-xl font-semibold text-black">Candidate Sources</p>
      <div className="flex items-start justify-start">
        <form
          action={(formData: FormData) => {
            if (String(formData.get("sources"))?.trim() === "") {
              setError("Sources is required!");
              return;
            }
            AddSource();
          }}
          className="flex min-h-[3.5rem] w-full items-start gap-[1rem] rounded-sm  bg-white px-4 pt-4"
        >
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-center gap-[1rem]">
              <input
                name={"sources"}
                value={value?.trim()}
                type="text"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="maw-w-[25rem] peer h-[2rem] overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal !text-gray-13 outline-none"
              />
            </div>
            <p
              className={`pl-8 text-sm font-medium text-red-500 ${Error ? "opacity-100" : "opacity-0"}`}
            >
              {Error || "ERROR"}
            </p>
          </div>
          <div className="flex items-center justify-center  gap-[1rem]">
            <button
              className="col-span-2 w-full min-w-[9rem] space-x-8 rounded-md border bg-color-primary-8 px-2 py-1 font-semibold capitalize text-white shadow-sm transition-all ease-linear first-letter:capitalize hover:bg-fabric-600   hover:shadow-md "
              type="submit"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full items-start justify-center border-b border-gray-18 bg-gray-14 px-4 py-2">
          <div className="flex w-full items-center justify-start gap-2">
            <p className=" font-bold text-gray-21">Source Name</p>
          </div>
        </div>
        {!candidateSourcesPending ? (
          data?.map(({ id, name, isDefault }: sourcesType) => {
            return (
              <div
                key={"status" + id}
                className="group flex w-full items-center justify-between border-b  border-gray-18 px-4 py-3 duration-200 ease-linear hover:bg-gray-14"
              >
                <div className="text-base">{name}</div>
                {!isDefault && (
                  <div className="flex items-center justify-center gap-[1rem] self-end">
                    <Link
                      data-tip="delete sources"
                      href={`?popup=DELETE_CANDIDATE_SOURCE&id=${id}`}
                      className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-sm duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
                    >
                      <FaTrash className="cursor-pointer !text-gray-15" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Hiring;
