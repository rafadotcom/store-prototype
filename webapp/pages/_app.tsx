import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SessionProvider } from 'next-auth/react';
import customTheme from "../styles/theme";

import { AppProps } from "next/app";
import "../styles/globals.css";

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

export default MyApp

