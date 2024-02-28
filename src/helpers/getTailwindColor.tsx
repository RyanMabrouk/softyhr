import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
const fullConfig = resolveConfig(tailwindConfig);
export function getTawindColor(color: string): string {
  // @ts-ignore
  return fullConfig?.theme?.colors?.[color];
}
