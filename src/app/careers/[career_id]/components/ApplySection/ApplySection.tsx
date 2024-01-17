import getCurrentorg from '@/api/getCurrentOrg';
import { Hiring_type } from '@/types/database.tables.types'
import React from 'react'

interface ApplySectionPropsType {
    job:Hiring_type;
}

function ApplySection({job}:ApplySectionPropsType) {
  return (
    <div className="shadow-popup gap-[2rem]  mt-16 flex h-[50rem] w-3/12 flex-col items-center justify-start bg-white px-8 py-4">
      <button className='w-full cursor-pointer hover:!bg-color-primary-7 ease duration-200 rounded-sm py-2 bg-color-primary-8 text-white text-lg'>Apply for This job</button>
      <div className='w-full border-t gap-[0.3rem] py-4 border-gray-32 flex flex-col items-start justify-center'>
        <span className='text-sm text-gray-15'>Link To This Job</span>
        <input readOnly value={`https://rayes.localhost/careers/${job?.id}`} className='w-full focus:focus-within:shadow-green h-[2rem] rounded-sm border border-gray-19 px-2 ease-in-out duration-150  outline-none  focus:!border-color-primary-3 '/>
      </div>
    </div>
  )
}

export default ApplySection