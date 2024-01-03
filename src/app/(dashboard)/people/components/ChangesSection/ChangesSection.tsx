"use client";
import React from 'react'

interface ChangesSectionPropsType {
    touched:boolean;
    setTouched:(arg: boolean)=> void;
}

function ChangesSection({ touched, setTouched }: ChangesSectionPropsType) {
  return (
    <div className="fixed bottom-0 left-0 flex h-[5rem] w-full items-center justify-center  gap-[2rem] border-t border-gray-19 bg-gray-14 px-10 delay-200 ease-in-out  ">
      <button
        className="text-bold  rounded bg-color-primary-8  p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
        type="submit"
      >
        save changes
      </button>
      <h1 className="cursor-pointer text-cyan-600 hover:underline" onClick={()=> setTouched(false)}>Cancel</h1>
    </div>
  );
}

export default ChangesSection