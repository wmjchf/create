import classNames from "classnames";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserOperation } from "./UserOperation";
import { Tabs } from "./Tabs";
import styles from "./index.module.less";
import { Button } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <section
      className={classNames(
        "flex items-center justify-between px-4",
        styles.navbar
      )}
    >
      <div className={classNames("flex items-center", styles.logo)}>
        <Image
          src="/earth.svg"
          width={30}
          height={30}
          alt="Picture of the author"
        />
        <span className="ml-2 font-bold">Planet</span>
      </div>
      <div className="h-full hidden sm:block">
        <Tabs></Tabs>
      </div>
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
                colorScheme="teal"
                variant="outline"
                className={styles.connect_wallet}
                onClick={openConnectModal}
              >
                Connect Wallet
              </Button>
            );
          }
          if (chain.unsupported) {
            return (
              // <Button variant="contained" className={styles.connect_wallet}>
              //   Wrong network
              // </Button>
              <></>
            );
          }
          if (account.address) {
            return (
              <UserOperation
                username={account.ensName}
                avatar={account.ensAvatar}
                address={account.address}
                chainName={chain.name}
                balance={account.displayBalance}
              />
            );
          }
        }}
      </ConnectButton.Custom>
    </section>
  );
};
