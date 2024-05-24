import { AppProps } from "next/app";
import { AppLayout } from "@/layout/app";
import "./globals.css";
import "./iconfont.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <AppLayout>{<Component {...pageProps} />}</AppLayout>;
};

export default App;
