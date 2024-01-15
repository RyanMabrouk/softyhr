"use client";
import React from 'react'
import PopUpSkeleton from '../../PopUpSkeleton'
import { useParams, useSearchParams } from 'next/navigation';
import default_avatar from "/public/default_avatar.jpeg";
import useEmployeeData from '@/hooks/useEmloyeeData';
import Image from 'next/image';
import useData from '@/hooks/useData';
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds"
import Input from '@/app/(dashboard)/people/components/Fileds/Input/Input';
import DateInput from '@/app/(dashboard)/people/components/Fileds/DateInput/DateInput';

function AddEntry() {
  const searchParams = useSearchParams();
  const section_name = searchParams.get("section") || "";
  const { employeeId } = useParams();
  const { employee_profile: data } = useEmployeeData({ employeeId });
  const { settings } = useData()
  if(!settings?.isPending) console.log(settings?.data[0]?.["job"]?.Champs?.filter((section:any)=> section?.champ == section_name ));
  if(!settings?.isPending) console.log(settings?.data[0]?.["personnal"]?.Champs?.filter((section:any)=> section?.champ == section_name ));
  return (
    <PopUpSkeleton className='' title={`add ${section_name} item`}>
      <div className='p-4 px-8'>
      <div className='bg-gray-14 p-4 min-w-[30rem] w-full h-[4rem]'>
        <Image
        alt="profile image"
        src={data?.data?.profile_image|| default_avatar}
        />
        <h1>{data?.data?.["Basic Information"]?.["First name"]+" "+data?.data?.["Basic Information"]?.["Last name"]}</h1>
      </div>
      {settings?.isPending ?
       <h1>Loading...</h1>
      :<div className=''>
       {settings?.data[0]?.["personnal"]?.Champs?.filter((section:any)=> section?.champ == section_name )[0]?.Fields?.map((text:string)=>{
        const component = 
        return text.toLocaleUpperCase().includes('DATE') ? <DateInput RowField={{name:text, type:'text'}}/>:<Input key={text} RowField={{name:text, type:'text'}}/>
       })} 
      </div>}
      </div>
    </PopUpSkeleton>
  )
}

export default AddEntry