import { useEffect } from "react";

import useTimeout from "./useTimeout";

type CallbackFunction = () => void;

export default function useDebounce(
  callback: CallbackFunction,
  delay: number,
  dependencies: any[],
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, dependencies); // Removed unnecessary spread operator
  useEffect(clear, []); // Removed unnecessary spread operator
}
