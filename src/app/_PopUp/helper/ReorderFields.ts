export function ReorderFields(
  RowStart: any,
  RowEnd: any,
  data: any,
  champ: string,
) {
  console.log(RowStart, RowEnd);
  const ChampFields = data?.Champs?.filter(
    (element: any) => element?.champ == champ,
  );
  let array = ChampFields[0]?.Fields;
  const startIndex = RowStart - 1;
  const endIndex = RowEnd + 1;

  if (RowStart < endIndex) {
    array?.map((row: any) => {
      if (row?.rang < endIndex && row?.rang > RowStart && RowStart < endIndex) {
        row.rang = row.rang - 1;
      } else if (row?.rang == RowStart) row.rang = RowEnd;
    });
  } else {
    array?.map((row: any) => {
      if (
        row?.rang >= RowEnd &&
        row?.rang <= startIndex &&
        startIndex > RowEnd
      ) {
        console.log(row?.rang, RowEnd, startIndex);
        row.rang = row.rang + 1;
        console.log(row?.rang, RowEnd, startIndex);
      } else if (row?.rang == RowStart) {
        row.rang = RowEnd;
        console.log("hereee !!!");
      }
    });
  }
  data?.Champs?.map((element: any) => {
    if (element?.champ == champ) {
      return {
        ...element,
        Fields: array?.sort((a: any, b: any) => a.rang - b.rang),
      };
    }
  });
  return data;
}
