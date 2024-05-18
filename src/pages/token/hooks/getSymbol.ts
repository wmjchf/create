import { useReadContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";

export const useGetSymbol = () => {
  const {
    data: symbol,
    error,
    isPending,
  } = useReadContract({
    abi: TokenJSON.abi,
    address,
    functionName: "symbol",
  });
  return symbol;
};
