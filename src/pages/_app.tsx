import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import "@rainbow-me/rainbowkit/styles.css";
import config from "./wallet/config";
import "./globals.css";
import "./iconfont.css";

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider>
            <section className="h-screen w-screen">
              <Navbar />
              <Component {...pageProps} />
            </section>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
