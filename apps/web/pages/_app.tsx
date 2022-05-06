import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import MainLayout from "../layouts/Main";
import reputableTheme from "../theme";
import axios from "axios";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { APIContextProvider } from "../providers/ApiContext";
import { ReactQueryDevtools } from "react-query/devtools";

axios.defaults.baseURL = process.env.API_URL;

function Reputable({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URL}
    >
      <APIContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={reputableTheme}>
            <MainLayout>
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </Hydrate>
            </MainLayout>
          </ChakraProvider>
        </QueryClientProvider>
      </APIContextProvider>
    </Auth0Provider>
  );
}

export default Reputable;
