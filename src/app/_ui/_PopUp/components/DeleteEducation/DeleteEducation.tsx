"use client";
import updateData from '@/api/updateData';
import useData from '@/hooks/useData';
import useToast from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import { FaRegTrashAlt } from 'react-icons/fa';

interface DeleteEducationFnType {
  id: string | null;
  data: any;
  user_id: string;
}

function DeleteEducation() {
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast, toastContainer } = useToast();
  const { user_profile: data} = useData();
  const params = useSearchParams();
  const id = params?.get("id");
  

  const { mutateAsync, isPending} = useMutation({
    mutationFn: async ({ id, data, user_id }: DeleteEducationFnType) => {
      const NewEducation = data?.filter(
        (education: any) => education?.id != id,
      );
      return await updateData("profiles", [{ Education: NewEducation }], {
        user_id,
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey:["user_profile"]});
      toast.success("Education deleted successfully", "Deleted");
      Router.push(pathname)
    },
    onError: () => {
      toast.error("something went wrong");
      Router.push(pathname)
    },
  });
  return (
    <>
    {toastContainer}
    <div className='z-50 flex flex-col items-center justify-center gap-[0.5rem]'>
       <div className='flex items-center justify-between w-full '>
      <h1 className='text-color-primary-8 text-xl font-semibold'>Delete Education</h1>
      <div onClick={() => Router.push(pathname)}>
              <CgClose
                color={"#999999"}
                fontSize={"2rem"}
                cursor="pointer"
              />
            </div>
      </div>
      <div className='bg-white py-6 px-4 flex rounded-sm flex-col items-center gap-[2rem]'>
      <div className='flex flex-col items-center justify-center gap-[2rem]'>
      <FaRegTrashAlt className="text-color9-500 text-6xl"/>
      <div className='flex flex-col items-center justify-center gap-[0.3rem]'>
      <h1 className='text-lg text-gray-15 whitespace-nowrap'>Are you sure you want to  <strong className='text-black'>delete this education record?</strong></h1>
      <h1 className='text-xl text-center text-gray-15 w-10/12'>Don't worry, doing so won't actually make the employee any less educated</h1>
      </div>
      </div>
      <div className='w-full h-[0.1rem] bg-color-primary-8'/>
      <div className='flex items-center justify-start self-start gap-[1rem] '>
      <button onClick={()=>{
        mutateAsync({
          id: id,
          data: data?.data[0]["Education"],
          user_id: data?.data[0]?.user_id,
        });
      }}  className='text-white hover:bg-color-primary-10 duration-150 ease-in-out p-2 capitalize rounded-sm bg-color-primary-9'>{isPending? <div className="flex items-center justify-center gap-[0.3rem]">
      <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
      Deleting...
    </div>:"yes, delete education"}</button>
      <button onClick={()=>Router.push(pathname)}  className='duration-150 ease-in-out hover:underline hover:text-color1-500 capitalize text-color5-500'>cancel</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default DeleteEducation