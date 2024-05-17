import classNames from "classnames";
import { Button, Avatar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import styles from "./index.module.less";

export const Navbar = () => {
  return (
    <section className={classNames("flex items-center justify-between p-4")}>
      <div></div>
      <div></div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;
          if (!connected) {
            return (
              <Button
                variant="contained"
                className={styles.connect_wallet}
                onClick={openConnectModal}
              >
                Connect Wallet
              </Button>
            );
          }
          if (chain.unsupported) {
            return (
              <Button variant="contained" className={styles.connect_wallet}>
                Wrong network
              </Button>
            );
          }
          if (account.address) {
            return (
              <Avatar
                alt={account.address}
                src={account.ensAvatar}
                sx={{ bgcolor: "#FF5722" }}
                className={styles.avatar}
              ></Avatar>
            );
          }
        }}
      </ConnectButton.Custom>
    </section>
  );
};
