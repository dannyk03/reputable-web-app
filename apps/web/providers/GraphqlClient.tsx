import React from "react";
import { GraphQLClient } from "graphql-request";
import { useAuth0 } from "@auth0/auth0-react";

const client = new GraphQLClient(`${process.env.API_URL}/graphql`);

const GraphqlClientContext = React.createContext(client);

export function GraphqlClientProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  React.useEffect(() => {
    if (isAuthenticated)
      getAccessTokenSilently().then((token) =>
        client.setHeader("Authorization", `Bearer ${token}`)
      );
  }, [isAuthenticated, getAccessTokenSilently]);
  return (
    <GraphqlClientContext.Provider value={client}>
      {children}
    </GraphqlClientContext.Provider>
  );
}

export const useGraphqlClient = () => React.useContext(GraphqlClientContext);
