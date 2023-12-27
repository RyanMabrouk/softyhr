"use client";
import React from "react";
import login from "@/actions/auth/login";
import useToast from "@/hooks/useToast";
export function LoginPageForm({ children }: { children: React.ReactNode }) {
  const { toast, toastContainer } = useToast();
  return (
    <>
      {toastContainer}
      <form
        className="flex h-full w-full flex-col items-start justify-between gap-4 px-28"
        action={async (formData: FormData) => {
          const { error } = await login(formData);
          if (error) toast.error(error.message, error.type);
        }}
      >
        {children}
      </form>
    </>
  );
}
