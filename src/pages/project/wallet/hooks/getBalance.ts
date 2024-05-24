import { useReadContract } from "wagmi";
import WalletJSON from "../abi/wallet.json";
import { address } from "../constant";

export const useGetBalance = () => {
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    abi: WalletJSON.abi,
    address,
    functionName: "getBalance",
  });
  return balance;
};
