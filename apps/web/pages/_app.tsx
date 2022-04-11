import { ChakraProvider } from "@chakra-ui/react";
import { IComment } from "../types";
import MainLayout from "../layouts/Main";
import reputableTheme from "../theme";

function Reputable({ Component, pageProps }) {
  return (
    <ChakraProvider theme={reputableTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default Reputable;
