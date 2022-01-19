import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { Header } from "../components/Header";
import { AppProps } from "next/dist/shared/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
