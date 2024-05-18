import { useWriteContract } from "wagmi";
import { useState } from "react";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";
export const useTransfer = () => {
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const transfer = async ({ args }: { args: any[] }) => {
    return writeContractAsync({
      abi: TokenJSON.abi,
      address,
      args,
      functionName: "transfer",
    });
  };
  return {
    transfer,
    isPending,
    isSuccess,
    isError,
  };
};
