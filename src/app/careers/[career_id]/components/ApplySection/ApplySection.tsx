"use client";
import getCurrentorg from '@/api/getCurrentOrg';
import ChangesSection from '@/app/(dashboard)/people/components/ChangesSection/ChangesSection';
import { HiringInfos, HiringInfosType } from '@/constants/Hiring/Hiring';
import { Hiring_type } from '@/types/database.tables.types'
import React, { useState } from 'react'
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin, FaTwitter } from 'react-icons/fa6';

interface ApplySectionPropsType {
    job:Hiring_type;
}

interface ButtonsType {
    label:string;
    className:string;
}

function ApplySection({job}:ApplySectionPropsType) {
  const [CurrentBtn, setCurrentBtn] = useState<string>("Apply for This job");
  const Buttons = [
    {label:"Apply for This job", className:"btn_swiper_arrow_right w-full cursor-pointer hover:!bg-color-primary-7 ease duration-200 rounded-sm py-2 bg-color-primary-8 text-white text-lg "},
    {label:"◀ View Job Description", className:"btn_swiper_arrow_left w-full cursor-pointer hover:!bg-color-primary-7 ease duration-200 rounded-sm py-2 bg-color-primary-8 text-white text-lg "}
  ]

  return (
    <>
    <div className='flex flex-col items-start w-1/5 justify-center'>
    <div className="shadow-popup w-full gap-[1rem]  mt-20 flex  flex-col items-start justify-start bg-white px-8 py-4">
     {Buttons?.map(({ label, className }: ButtonsType) => {
      const isSelected = CurrentBtn === label?"": " hidden ";
      return <button key={label} onClick={() => setCurrentBtn(label == 'Apply for This job'?"◀ View Job Description":'Apply for This job')} className={className + isSelected}>{label}</button>;
    })}
      <div className='w-full border-t gap-[0.3rem] py-4 border-gray-32 flex flex-col items-start justify-center'>
        <span className='text-sm text-gray-15'>Link To This Job</span>
        <input readOnly value={`https://rayes.localhost:3000/careers/${job?.id}`} className='w-full focus:focus-within:shadow-green h-[2rem] rounded-sm border border-gray-19 px-2 ease-in-out duration-150  outline-none  focus:!border-color-primary-3 '/>
      </div>
      <div className='flex items-start justify-center gap-[1rem]'>
      <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
       <FaLinkedin fill="gray" />
       </div>
      <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
       <FaTwitter fill="gray" />
       </div>
      <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
       <FaFacebookSquare fill="gray" />
       </div>
       </div>
    </div>
    <div className='flex w-full flex-col gap-[1rem] items-start justify-center mt-8'>
          {HiringInfos?.map(({name, label}:HiringInfosType,index:number)=>
               <div key={index} className='pb-4 w-full gap-[0.3rem] flex flex-col items-start justify-center border-b border-gray-32'>
                  <h1 className='text-sm text-gray-15'>{label}</h1>
                  <h1 className=''>{String(job?.job_information?.[name])}</h1>
              </div>
          )}
      </div>
      </div>
     
              </>
  )
}

export default ApplySection