import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import MainLayout from "../layouts/Main";
import reputableTheme from "../theme";

function Reputable({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URL}
    >
      <ChakraProvider theme={reputableTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default Reputable;
