import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";

import { WalletContextProvider } from "multichain-walletkit-sdk-react";
import { initWallets } from "multichain-walletkit-sdk-react-init";

const { CHAIN_ID_ETH } = require("multichain-walletkit-sdk-core");
import { MetamaskWallet, WalletConnectWallet } from "@/utils/evm";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const evmWallets = {
    [CHAIN_ID_ETH]: [new MetamaskWallet(), new WalletConnectWallet()],
  };

  const wallets = {
    ...initWallets(),
    ...evmWallets,
  };
  // useEffect(() => {
  //   if (
  //     localStorage.theme === "light" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: light)").matches)
  //   ) {
  //     document.documentElement.classList.add("light");
  //     localStorage.setItem("theme", "light");
  //   } else {
  //     document.documentElement.classList.remove("light");
  //     document.documentElement.classList.add("dark");

  //     localStorage.setItem("theme", "dark");
  //   }
  // }, []);
  // console.log(wallets);

  return (
    <ThemeProvider
      attribute="data-theme"
      storageKey="theme"
      enableColorScheme={true}
      forcedTheme="light"
    >
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <WalletContextProvider wallets={wallets}>
              <Component {...pageProps} />
            </WalletContextProvider>
          </Provider>
        </QueryClientProvider>
      </PersistGate>
    </ThemeProvider>
  );
}
