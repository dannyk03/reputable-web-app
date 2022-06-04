import React from "react";
import { gql, GraphQLClient } from "graphql-request";
import { useAuth0 } from "@auth0/auth0-react";
import type { IUser } from "@reputable/types";

const API_URL = process.env.API_URL.endsWith("/")
  ? process.env.API_URL.slice(0, -1)
  : process.env.API_URL;

const client = new GraphQLClient(`${API_URL}/graphql`);

const meQuery = gql`
  query {
    me {
      name
      email
      email_verified
      picture
      app_metadata {
        isApproved
      }
      user_metadata {
        tokens
        tips {
          userId
          amount
        }
        communities
      }
      user_id
    }
  }
`;

interface IAPIContext {
  client?: GraphQLClient;
  user?: IUser;
  refreshUser?: () => void;
  isLoading?: boolean;
}

const APIContext = React.createContext<IAPIContext>({});

export function APIContextProvider({ children }: React.PropsWithChildren<{}>) {
  const { isAuthenticated, getAccessTokenSilently, user: user1 } = useAuth0();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState();
  const [r, setR] = React.useState(false);
  const refreshUser = () => setR((prevR) => !prevR);
  React.useEffect(() => {
    if (isAuthenticated)
      getAccessTokenSilently({ audience: "https://api.reputable.health" })
        .then((token) => {
          client.setHeader("Authorization", `Bearer ${token}`);
          client
            .request(meQuery)
            .then((r) => {
              setUser(r.me);
            })
            .finally(() => setIsLoading(false));
        })
        .finally(() => setIsLoading(false));
    else {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently, r]);
  return (
    <APIContext.Provider value={{ user, client, refreshUser, isLoading }}>
      {children}
    </APIContext.Provider>
  );
}

export const useApiContext = () => React.useContext<IAPIContext>(APIContext);
