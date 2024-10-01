export function formatNumber(value?: string | number, decimals: number = 2): string {
  if (isNaN(Number(value)) || value === undefined) {
    return "0";
  }

  const numValue = typeof value === "number" ? value : parseFloat(value!);
  const withDecimals = numValue.toFixed(decimals);
  const [whole, decimal] = withDecimals.split(".");
  const wholeWithSeparator = parseInt(whole, 10).toLocaleString("en-US");
  let result;

  if (decimal === undefined) {
    result = wholeWithSeparator;
  } else {
    result = `${wholeWithSeparator}.${decimal}`;
  }

  if (parseFloat(result) === 0) result = "0";

  return result;
}
