export const formattedData=(data:any) =>{
  let result:any = [];
  Object.values(data).map(({ name, symbol, code }: any) => {
    result.push({
      name,
      label: `${code} - ${name}`,
      value: code,
      symbol,
    });
  });
  return result;
}

export function extractCurrencyValueAndPeriod(str:string) {
  const currency = str.slice(0, 3);
  const Pay = parseInt(str.slice(4, str.indexOf("/")));
  const period = str.slice(str.indexOf("/") + 1);
  return { currency, Pay, period };
}



