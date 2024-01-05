import Input from "./Input/Input";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { ReactNode, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateData from "@/api/updateData";
import useToast from "@/hooks/useToast";

interface DeleteEducationFnType {
  id: string;
  data: any;
  user_id: string;
}
interface EducationPropsType {
  FieldsArray: RowFieldType[];
  setTouched: (arg: boolean) => void;
  user: any;
  champ: string;
}

function Education({
  FieldsArray,
  setTouched,
  user,
  champ,
}: EducationPropsType): ReactNode {
  const queryClient = useQueryClient();
  const { toast, toastContainer } = useToast();
  const [Data, setData] = useState<any>(user[champ]);

  //****** delete education ******
  const { mutateAsync, isPaused } = useMutation({
    mutationFn: async ({ id, data, user_id }: DeleteEducationFnType) => {
      const NewEducation = data?.filter(
        (education: any) => education?.id != id,
      );
      setData(Data?.filter((education: any) => education.id != id));
      return await updateData("profiles", [{ Education: NewEducation }], {
        user_id,
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Education deleted successfully", "Deleted");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <div className="flex flex-col items-start ">
      {toastContainer}
      {Data?.map((data: any) => {
        {
          return (
            <div className="flex justify-center gap-[1rem] py-2">
              <div className="flex flex-col items-start gap-[0.5rem] border-b border-gray-5 py-6">
                {FieldsArray?.map(({ Row }: any) => {
                  return (
                    <div
                      className="flex items-end justify-center gap-[2rem]"
                      key={uuidv4()}
                    >
                      {Row?.map((RowField: any) => {
                        const Component = Field[RowField?.type.toUpperCase()];
                        return (
                          <Component
                            champ={champ}
                            defaultValue={data[RowField?.name]}
                            setTouched={setTouched}
                            key={uuidv4()}
                            RowField={RowField}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div
                key={data?.id}
                onClick={() => {
                  console.log(
                    user[champ]?.filter(
                      (education: any) => education.id == data?.id,
                    ),
                  );
                  if (
                    user[champ]?.filter(
                      (education: any) => education.id == data?.id,
                    ).length > 0
                  ) {
                    mutateAsync({
                      id: data?.id,
                      data: user[champ],
                      user_id: user?.user_id,
                    });
                  } else
                    setData(
                      Data?.filter(
                        (education: any) => education.id != data?.id,
                      ),
                    );
                }}
                className="hover:border-gray-27 hover:bg-gray flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-150 ease-in-out hover:border"
              >
                <FaTrash cursor={"pointer"} fill={"gray"} />
              </div>
            </div>
          );
        }
      })}
      <div
        className="flex cursor-pointer items-center justify-center gap-[0.5rem] pt-4 text-color5-600"
        onClick={() =>
          setData([
            ...Data,
            {
              id: uuidv4(),
              GPA: "",
              Degree: "",
              "End Date": "",
              "Start Date": "",
              "College/Institution": "",
              "Major/Specialization": "",
            },
          ])
        }
      >
        <IoMdAddCircleOutline fill={"#095c8f"} />
        Add Education
      </div>
    </div>
  );
}

export default memo(Education);
