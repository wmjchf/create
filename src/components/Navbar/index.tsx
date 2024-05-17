import classNames from "classnames";
import { Button, Avatar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserOperation } from "./UserOperation";

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
              <UserOperation
                username={account.ensName}
                avatar={account.ensAvatar}
                address={account.address}
                chainName={chain.name}
              />
            );
          }
        }}
      </ConnectButton.Custom>
    </section>
  );
};
