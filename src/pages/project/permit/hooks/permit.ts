import { useWriteContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";
export const usePermit = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const permit = async ({ args }: { args: any[] }) => {
    return writeContractAsync({
      abi: TokenJSON.abi,
      address,
      args,
      functionName: "permit",
    });
  };
  return {
    permit,
    isPending,
    isSuccess,
    isError,
  };
};
