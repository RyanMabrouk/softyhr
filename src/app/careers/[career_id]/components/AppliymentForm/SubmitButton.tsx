import React from 'react'
import { useFormStatus } from 'react-dom';

function SubmitButton() {
   const { pending } = useFormStatus();
  return (
    <div className='mt-4 flex gap-[1rem] items-center justify-center'>
      <button
            disabled={pending}
            className={
              "text-bold rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 " +
              (pending ? "  animate-pulse " : "")
            }
            type="submit"
          >
            {pending ? (
              <div className="flex items-center justify-center gap-[0.3rem]">
                <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
             { "Submitting Application..."}
              </div>
            ) : (
             "Submit Application"
            )}
          </button>
          <button
            type="reset"
            className="cursor-pointer text-cyan-600 hover:underline btn_left"
          >
            Cancel
          </button>
          </div>
  )
}

export default SubmitButton