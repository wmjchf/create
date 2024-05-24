import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import config from "../../wallet/config";
import styles from "./index.module.less";

const queryClient = new QueryClient();

interface IAppLayout {
  children?: React.ReactNode;
}
export const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider>
            <section className={styles.screen}>
              <Navbar />
              {children}
            </section>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
