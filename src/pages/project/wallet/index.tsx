import classNames from "classnames";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDeposit, useGetBalance, useWithDraw } from "./hooks";
import styles from "./index.module.less";

const Wallet = () => {
  const [amount, setAmount] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [type, setType] = useState("1");
  const [formatBalance, setFormatBalance] = useState(0);
  const { deposit, isSuccess, isError } = useDeposit();
  const {
    withDraw,
    isSuccess: isWithDrawSuccess,
    isError: isWithDrawError,
  } = useWithDraw();
  const toast = useToast();
  const balance = useGetBalance() as number;
  const reset = () => {
    setAmount("");
    setLoading(false);
  };
  useEffect(() => {
    if (amount) {
      setDisabled(false);
    }
  }, [amount]);
  useEffect(() => {
    if (balance) {
      setFormatBalance(parseInt(balance.toString()) / 10 ** 18);
    }
  }, [balance]);
  useEffect(() => {
    if (isWithDrawSuccess || isWithDrawSuccess) {
      reset();
    }
  }, [isWithDrawSuccess, isWithDrawError]);
  useEffect(() => {
    if (isSuccess || isError) {
      reset();
    }
  }, [isSuccess, isError]);
  const handleDeposit = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      const result = await deposit(BigInt(amount * 10 ** 18));
      console.log(result, "fdsfdsee");
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
  const handleWithDraw = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      const result = await withDraw({
        args: [amount * 10 ** 18],
      });
      console.log(result, "fdsfdsee");
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
        styles.wallet,
        "flex items-center flex-col justify-center"
      )}
    >
      <span className="text-white font-bold text-5xl mb-8">Ether Wallet</span>
      <div className={classNames(styles.form, "py-6 px-4 w-11/12 sm:w-2/6 ")}>
        <div className={classNames(styles.tabs, "flex items-center mb-3")}>
          <div
            className={classNames(
              styles.item,
              type === "1" && styles.active,
              "flex-1 flex items-center justify-center"
            )}
            onClick={() => {
              setType("1");
            }}
          >
            <span>Deposit</span>
          </div>
          <div
            className={classNames(
              styles.item,
              type === "2" && styles.active,
              "flex-1 flex items-center justify-center"
            )}
            onClick={() => {
              setType("2");
            }}
          >
            <span>WithDraw</span>
          </div>
        </div>
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
              {formatBalance.toFixed(3)} {"ETH"}
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

          <Button
            width={"100%"}
            borderRadius={"999px"}
            colorScheme="teal"
            height={"60px"}
            className="mt-8"
            isLoading={loading}
            disabled={disabled}
            onClick={() => {
              type === "1" ? handleDeposit() : handleWithDraw();
            }}
          >
            {type === "1" ? "Deposit" : "WithDraw"}
          </Button>
        </FormControl>
      </div>
    </section>
  );
};

export default Wallet;
