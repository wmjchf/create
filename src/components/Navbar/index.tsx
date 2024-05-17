import classNames from "classnames";
import { Button } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./index.module.less";

export const Navbar = () => {
  return (
    <section className={classNames("flex items-center justify-between p-4")}>
      <div></div>
      <div></div>
      <ConnectButton label="Connect wallet" />
    </section>
  );
};
