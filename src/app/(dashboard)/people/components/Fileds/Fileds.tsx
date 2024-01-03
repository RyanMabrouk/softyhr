import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
interface FiledsChampsPropsType {
  FieldsArray: RowFieldType[];
  setTouched: (arg: boolean) => void;
  user: any;
  champ:string;
}
function FiledsChamps({
  FieldsArray,
  setTouched,
  user,
  champ
}: FiledsChampsPropsType): ReactNode {
  //const [touched, setTouched] = useState<boolean>(false);
  return (
    <>
      {FieldsArray?.sort((a: any, b: any) => a.rang - b.rang)?.map(
        ({ Row }: any) => {
          return (
            <div
              className="flex items-end justify-center gap-[1rem]"
              key={uuidv4()}
            >
              {Row?.map((RowField: any) => {
                const Component = Field[RowField?.type.toUpperCase()];
                return (
                  <Component
                    champ={champ}
                    user={user?.data[0]}
                    setTouched={setTouched}
                    key={uuidv4()}
                    // setTouched={setTouched}
                    RowField={RowField}
                  />
                );
              })}
            </div>
          );
        },
      )}
      {}
    </>
  );
}

export default FiledsChamps;
