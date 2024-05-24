import classNames from "classnames";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./index.module.less";

const Wallet = () => {
  const [amount, setAmount] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  return (
    <section
      className={classNames(
        styles.wallet,
        "flex items-center flex-col justify-center"
      )}
    >
      <span className="text-white font-bold text-5xl mb-8">
        Contract Wallet
      </span>
      <div className={classNames(styles.form, "py-6 px-4 w-11/12 sm:w-2/6 ")}>
        <div className={classNames(styles.tabs)}>
          <div className={classNames(styles.item)}>
            <span>Deposit</span>
          </div>
          <div className={classNames(styles.item)}>
            <span>withDraw</span>
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
              {/* {formatBalance.toFixed(3)} {symbol || "PLT"} */}
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
          >
            Transform
          </Button>
        </FormControl>
      </div>
    </section>
  );
};

export default Wallet;
