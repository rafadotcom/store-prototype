import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import customTheme from "../styles/theme";
import { SessionProvider } from 'next-auth/react'

import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>

  );
}

export default MyApp;

