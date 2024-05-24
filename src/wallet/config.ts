import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { mainnet, sepolia } from "wagmi/chains";
console.log(getDefaultConfig, "dfs");
const config = getDefaultConfig({
  appName: "Wisely",
  projectId: "3410328644ca5a8969c4970d74fac0c8",
  chains: [mainnet, sepolia],
});

export default config;
