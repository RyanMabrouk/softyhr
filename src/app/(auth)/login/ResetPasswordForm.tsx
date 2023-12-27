"use client";
import React from "react";
import resetPassword from "@/actions/auth/resetPassword";
import useToast from "@/hooks/useToast";

export function ResetPasswordForm({ children }: { children: React.ReactNode }) {
  const { toast, toastContainer } = useToast();
  return (
    <>
      {toastContainer}
      <form
        className="flex h-full w-full flex-col items-start justify-between gap-6 px-28"
        action={async (formData: FormData) => {
          const { error } = await resetPassword(formData);
          if (error) toast.error(error.message, error.type);
          else
            toast.success("Please check your Email", "Link sent successfully");
        }}
      >
        {children}
      </form>
    </>
  );
}
