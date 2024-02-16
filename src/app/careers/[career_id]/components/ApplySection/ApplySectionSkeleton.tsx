import React from 'react'

function ApplySectionSkeleton() {
  return (
    <div className="shadow-popup  mt-16 flex h-[50rem] w-3/12 flex-col items-center justify-start bg-white px-6 py-4">
      <div className="h-[10rem] w-full animate-pulse bg-gray-14 "></div>
      <div className="mt-20 flex h-[10rem] w-full animate-pulse flex-col gap-[1rem] bg-white ">
        <div className="h-[4rem] rounded bg-slate-200"></div>
        <div className="h-[4rem] rounded bg-slate-200"></div>
        <div className="h-[4rem] rounded bg-slate-200"></div>
        <div className="h-[4rem] rounded bg-slate-200"></div>
      </div>
    </div>
  );
}

export default ApplySectionSkeleton