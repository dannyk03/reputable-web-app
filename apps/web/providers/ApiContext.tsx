import React from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { useAuth0 } from '@auth0/auth0-react';
import type { IUser } from '@reputable/types';

const API_URL = process.env.API_URL.endsWith('/')
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
        role
      }
      user_metadata {
        tokens
        tips {
          userId
          amount
        }
        communities
        address
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
  isAdmin?: boolean;
  authorized?: boolean;
}

const APIContext = React.createContext<IAPIContext>({});

/**
 *
 * Unfortunately it's not possible to retrieve custom data for a user `user_metadata`
 * using Auth0 React framework, so we opt-in to a custom solution here.
 * @returns
 */
export function APIContextProvider({ children }: React.PropsWithChildren<{}>) {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    isLoading: Auth0Loading,
  } = useAuth0();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [r, setR] = React.useState(false);
  const refreshUser = () => setR((prevR) => !prevR);

  React.useEffect(() => {
    // isAuthenticated is retrieved from Auth0
    if (!Auth0Loading && isAuthenticated)
      getAccessTokenSilently({ audience: 'https://api.reputable.health' })
        .then((token) => {
          client.setHeader('Authorization', `Bearer ${token}`);
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

  const isAdmin = user && user?.app_metadata?.role === 'admin';
  const authorized = (user && user?.app_metadata?.isApproved) || false;
  return (
    <APIContext.Provider
      value={{ user, client, refreshUser, isLoading, isAdmin, authorized }}
    >
      {children}
    </APIContext.Provider>
  );
}

export const useApiContext = () => React.useContext<IAPIContext>(APIContext);
