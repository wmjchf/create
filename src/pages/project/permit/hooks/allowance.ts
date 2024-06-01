import { useReadContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";

export const useAllowance = ({ args }: { args: any[] }) => {
  const {
    data: allowance,
    error,
    isPending,
  } = useReadContract({
    abi: TokenJSON.abi,
    address,
    functionName: "allowance",
    args,
  });
  return allowance;
};
