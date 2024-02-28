import { ObjectOfStrings } from "@/types/database.tables.types";

export function GetQuestions(answers: ObjectOfStrings, Questions: any) {
  console.log(answers);
  let result :any= {};
  Questions.forEach((group:any) => {
    group.forEach((question:any) => {
      question.Row.forEach((Row:any)=>{
        console.log(Row);
      result = { ...result, [Row?.name]:answers?.metadata?.[Row?.name]  };
      });
    });
  });
  return result;
}
