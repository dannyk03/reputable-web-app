import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import MainLayout from '../layouts/Main';
import reputableTheme from '../theme';
import axios from 'axios';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { APIContextProvider } from '../providers/ApiContext';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DefaultSeo } from 'next-seo';
import '../styles.css';

axios.defaults.baseURL = process.env.API_URL;

function Reputable({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URL}
      useRefreshTokens
      audience={process.env.AUTH0_AUDIENCE}
      cacheLocation="localstorage"
    >
      <APIContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={reputableTheme}>
            <DefaultSeo
              additionalLinkTags={[
                {
                  rel: 'icon',
                  href: '/favicons/favicon.ico',
                },
                {
                  rel: 'apple-touch-icon',
                  href: '/favicons/apple-touch-icon.png',
                  sizes: '76x76',
                },
                {
                  rel: 'manifest',
                  href: '/site.webmanifest',
                },
              ]}
              openGraph={{
                type: 'website',
                locale: 'en_IE',
                title: 'Reputable Health',
                description:
                  'Join a community of biohackers.  Experiment, earn and optimize your health.',
                url: 'https://reputable.health/',
                site_name: 'Reputable',
                images: [
                  {
                    url: `https://drive.google.com/uc?export=view&id=1gRt4IwsUbN_ROLS1ao0vbwww9smap6JM`,
                    width: 237,
                    height: 161,
                    alt: 'Reputable Logo',
                  },
                ],
              }}
            />
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
