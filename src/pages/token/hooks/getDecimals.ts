import { useReadContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";

export const useGetDecimals = () => {
  const {
    data: decimals,
    error,
    isPending,
  } = useReadContract({
    abi: TokenJSON.abi,
    address,
    functionName: "decimals",
  });
  return decimals;
};
