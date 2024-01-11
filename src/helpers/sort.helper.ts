export function SortByDate(array: any) {
  console.log(
    array
      ?.filter((data: any) => {
        if (data?.Date || data?.["Effective Date"]) return true;
      })
      ?.sort(
        (a: any, b: any) =>
          Number(new Date(b?.date || b?.["Effective Date"])) -
          Number(new Date(a?.date || a?.["Effective Date"])),
      ),
  );
  return array
    ?.filter((data: any) => {
      if (data?.Date || data?.["Effective Date"]) return true;
    })
    ?.sort(
      (a: any, b: any) =>
        new Date(a?.Date || a?.["Effective Date"]).getTime() -
        new Date(b?.Date || b?.["Effective Date"]).getTime(),
    )[array.length - 1]?.id;
}