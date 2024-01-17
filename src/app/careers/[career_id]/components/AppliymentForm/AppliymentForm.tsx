import ChangesSection from '@/app/(dashboard)/people/components/ChangesSection/ChangesSection';
import formulateData from '@/app/(dashboard)/people/components/utils/formulateData';
import { useSettings } from '@/hooks/useSettings';
import { Hiring_type } from '@/types/database.tables.types';
import React from 'react'
import { v4 as uuidv4 } from "uuid";
import FiledsChamps from '@/app/(dashboard)/people/components/Fileds/Fileds'
import Loader from '@/app/(dashboard)/people/components/Loader/Loader';
import { test } from '@/actions/test';
import SubmitButton from './SubmitButton';
import { CreateCandidate } from '@/actions/hiring/CreateCandidate';
import { FormulateFormData } from '@/helpers/CountNewCandidates';
import useToast from '@/hooks/useToast';

interface AppliymentFormPropsType {
    job:Hiring_type;
}

function AppliymentForm({ job}:AppliymentFormPropsType) {
  const { toastContainer, toast} = useToast();
    const {data, isPending} = useSettings('AppliementForm');
     const SubmitForm = async(formdata: FormData) => {
     const response = await CreateCandidate({...FormulateFormData(formdata), job_id:job?.id});
     if (response?.Msg) toast.success(response?.Msg);
    };
  return (
    <>
    {toastContainer}
   {isPending ?
    <Loader/>
   : (
    <div className='w-full h-full'>
         <form className="flex flex-col gap-[1rem] items-start justify-center" action={SubmitForm} >
              {data?.map(
                (FieldsArray: any, index: number) => {
                    console.log(FieldsArray);
                  return (
                    <div
                      className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                      key={index}
                    >
                      <div className="flex flex-col items-start justify-center gap-[1rem]">
                        <FiledsChamps
                          key={uuidv4()}
                          FieldsArray={FieldsArray}
                        />
                      </div>
                    </div>
                  );
                },
              )}
              <div className="-mt-4 flex items-center justify-center gap-[2rem]">
        <SubmitButton/>
        </div>
            </form>
             
    </div>)}
    </>
  )
}

export default AppliymentForm