import { useWriteContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";
export const useTransferFrom = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const transferFrom = async ({ args }: { args: any[] }) => {
    return writeContractAsync({
      abi: TokenJSON.abi,
      address,
      args,
      functionName: "transferFrom",
    });
  };
  return {
    transferFrom,
    isPending,
    isSuccess,
    isError,
  };
};
