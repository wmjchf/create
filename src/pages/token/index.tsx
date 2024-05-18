import classNames from "classnames";
import styles from "./index.module.less";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  useGetBalance,
  useGetDecimals,
  useGetSymbol,
  useTransfer,
} from "./hooks";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Token = () => {
  const { address } = useUserStore();
  const { isConnected } = useAccount();
  const balance = useGetBalance([address]) as number;
  const decimals = useGetDecimals() as number;
  const symbol = useGetSymbol() as number;
  const [formatBalance, setFormatBalance] = useState(0);
  const [amount, setAmount] = useState<string>();
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { transfer, isSuccess, isError } = useTransfer();
  const toast = useToast();
  const reset = () => {
    setTarget("");
    setAmount("");
    setLoading(false);
  };

  useEffect(() => {
    if (balance && decimals) {
      setFormatBalance(parseInt(balance.toString()) / 10 ** decimals);
    }
  }, [balance, decimals]);

  useEffect(() => {
    if (isSuccess || isError) {
      reset();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!isConnected) {
      setFormatBalance(0);
    }
  }, [isConnected]);

  useEffect(() => {
    if (amount && target) {
      setDisabled(false);
    }
  }, [amount, target]);

  const handleTransfer = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      const result = await transfer({
        args: [target, (amount as string) * 10 ** decimals],
      });
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <section
      className={classNames(
        styles.token,
        "flex items-center flex-col justify-center"
      )}
    >
      <span className="text-white font-bold text-5xl mb-8">$PLANET</span>
      <div className={classNames(styles.form, "py-6 px-4 w-11/12 sm:w-2/6 ")}>
        <FormControl>
          <FormLabel
            className={classNames(
              styles.label,
              "w-full items-center justify-between"
            )}
          >
            <span className={classNames("text-white  font-bold")}>Amount</span>
            <span className={classNames(styles.balance)}>
              <i className="icon-yue iconfont mr-1" />
              {formatBalance.toFixed(3)} {symbol || "PLT"}
            </span>
          </FormLabel>
          <Input
            className={classNames(styles.input, styles.amount, "mt-2")}
            placeholder={"0.00"}
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <FormLabel className={"mt-8"}>
            <span className={classNames(styles.lable, "text-white font-bold")}>
              Address
            </span>
          </FormLabel>
          <Input
            className={classNames(styles.input, "mt-2")}
            placeholder={"Address"}
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          <Button
            width={"100%"}
            borderRadius={"999px"}
            colorScheme="teal"
            height={"60px"}
            className="mt-8"
            isLoading={loading}
            disabled={disabled}
            onClick={handleTransfer}
          >
            Transform
          </Button>
        </FormControl>
      </div>
    </section>
  );
};
export default Token;
