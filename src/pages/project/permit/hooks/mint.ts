import { useWriteContract } from "wagmi";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";
export const useMint = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const mint = async ({ args }: { args: any[] }) => {
    return writeContractAsync({
      abi: TokenJSON.abi,
      address,
      args,
      functionName: "mint",
    });
  };
  return {
    mint,
    isPending,
    isSuccess,
    isError,
  };
};
