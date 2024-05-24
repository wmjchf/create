import { useWriteContract } from "wagmi";
import WalletJSON from "../abi/wallet.json";
import { address } from "../constant";
export const useDeposit = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const deposit = async (amount: bigint) => {
    return writeContractAsync({
      abi: WalletJSON.abi,
      address,
      functionName: "deposit",
      value: amount,
    });
  };
  return {
    deposit,
    isPending,
    isSuccess,
    isError,
  };
};
