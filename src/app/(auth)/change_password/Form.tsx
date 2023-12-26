"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../login/_ui/Input";
import { IoKey } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { SubmitBtn } from "../signup/ui/SubmitBtn";
import updatePassword from "@/actions/auth/updatePassword";
import { FaRegCircle } from "react-icons/fa6";
export function Form() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const requirements = useMemo(
    () => [
      { name: "8 or more characters", valid: password.length >= 8 },
      { name: "At least 1 number", valid: /\d/.test(password) },
      { name: "Uppercase", valid: /[A-Z]/.test(password) },
      { name: "Lowercase", valid: /[a-z]/.test(password) },
    ],
    [password],
  );
  useEffect(() => {
    const reqs = requirements.reduce(
      (acc, e) => (e.valid ? acc : (acc = false)),
      true,
    );
    if (reqs) setIsValidPassword(true);
    else setIsValidPassword(false);
  }, [password, requirements]);
  return (
    <form
      className="flex h-full w-full flex-col items-start justify-between gap-4 px-16"
      action={updatePassword}
    >
      <hr className="h-[2px] w-full" />
      <div className="flex h-fit w-full grow flex-col gap-4 px-6">
        <label className="text-[0.925rem]" htmlFor="password_req">
          Make sure your new password is secure:
        </label>
        <ul
          id="password_req"
          className="text-sm font-light leading-5 text-gray-9 [&_li]:mb-0.5 [&_li]:space-x-1"
        >
          {requirements.map((req, i) => (
            <li className="flex flex-row items-center gap-1" key={req.name + i}>
              {req.valid ? (
                <IoIosCheckmarkCircleOutline
                  className={`h-5 w-5 text-color-green-5`}
                />
              ) : (
                <FaRegCircle className={`ml-0.5 h-4 w-4`} />
              )}
              <span>{req.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center gap-2">
          <Input
            setValueInParent={setPassword}
            name="password"
            type="password"
            placeholder="Password"
          >
            <IoKey
              className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5"
              setPassword
            />
          </Input>
          <IoShieldCheckmarkOutline
            className={`h-8 w-8 ${
              isValidPassword ? "text-color-green-5" : "text-gray-400"
            }`}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Input
            setValueInParent={setConfirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          >
            <IoKey className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
          </Input>
          <IoShieldCheckmarkOutline
            className={`h-8 w-8 ${
              confirmPassword === password && confirmPassword.length > 0
                ? "text-color-green-5"
                : "text-gray-400"
            }`}
          />
        </div>
        {isValidPassword && confirmPassword === password ? (
          <SubmitBtn
            className={`!h-11 !max-w-[9rem] !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 `}
          >
            Reset Password
          </SubmitBtn>
        ) : (
          <button
            type="button"
            disabled={true}
            className={`col-span-2 h-11 w-full max-w-[9rem] rounded-md !bg-fabric-700 px-[auto] font-bold capitalize text-white transition-all duration-300 ease-linear hover:!bg-fabric-600  disabled:bg-color-green-5  disabled:opacity-50 `}
          >
            Reset Password
          </button>
        )}
      </div>
    </form>
  );
}
