import { useWriteContract } from "wagmi";
import WalletJSON from "../abi/wallet.json";
import { address } from "../constant";
export const useWithDraw = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const withDraw = async ({ args }: { args: any[] }) => {
    return writeContractAsync({
      abi: WalletJSON.abi,
      address,
      functionName: "withdraw",
      args,
    });
  };
  return {
    withDraw,
    isPending,
    isSuccess,
    isError,
  };
};
