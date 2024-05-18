import { useWriteContract } from "wagmi";
import { useState } from "react";
import TokenJSON from "../abi/token.json";
import { address } from "../constant";
export const useTransfer = () => {
  const [error, setError] = useState<Error>();
  const [completed, setCompleted] = useState<boolean>();
  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error: Error) => {
        // onError(error);
        setError(error);
        // setLensHubOnchainSigNonce(lensHubOnchainSigNonce - 1);
      },
      onSuccess: () => {
        // onCompleted();
        setCompleted(true);
        // setLensHubOnchainSigNonce(lensHubOnchainSigNonce + 1);
      },
    },
  });
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
    error,
    completed,
  };
};
