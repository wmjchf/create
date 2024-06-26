import { useReadContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";

export const useGetBalance = (addressList: string[]) => {
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    abi: TokenJSON.abi,
    address,
    functionName: "balanceOf",
    args: addressList,
  });
  return balance;
};
