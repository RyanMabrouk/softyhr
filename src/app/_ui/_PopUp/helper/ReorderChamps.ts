export function ReorderChamps(RowStart: any, RowEnd: any, data: any) {
  console.log(RowStart, RowEnd);
  const startIndex = RowStart - 1;
  const endIndex = RowEnd + 1;

  if (RowStart < endIndex) {
    data
      ?.sort((a: any, b: any) => a.rang - b.rang)
      ?.map((row: any) => {
        if (
          row?.rang < endIndex &&
          row?.rang > RowStart &&
          RowStart < endIndex
        ) {
          row.rang = row.rang - 1;
        } else if (row?.rang == RowStart) row.rang = RowEnd;
      });
  } else {
    data
      ?.sort((a: any, b: any) => a.rang - b.rang)
      ?.map((row: any) => {
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
  return data?.sort((a: any, b: any) => a.rang - b.rang);
}
