import React from "react";
import { gql, GraphQLClient } from "graphql-request";
import { useAuth0 } from "@auth0/auth0-react";
import { IUser } from "@reputable/types";

const client = new GraphQLClient(`${process.env.API_URL}/graphql`);

const meQuery = gql`
  query {
    me {
      name
      email
      email_verified
      picture
      user_metadata {
        tokens
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
}

const APIContext = React.createContext<IAPIContext>({});

export function APIContextProvider({ children }: React.PropsWithChildren<{}>) {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    logout,
    user: user1,
  } = useAuth0();
  const [user, setUser] = React.useState();
  const [r, setR] = React.useState(false);
  const refreshUser = () => setR((prevR) => !prevR);
  console.log("User is authenticated", isAuthenticated);
  console.log("user1", user1);
  React.useEffect(() => {
    if (isAuthenticated)
      getAccessTokenSilently({ audience: "https://api.reputable.health" }).then(
        (token) => {
          client.setHeader("Authorization", `Bearer ${token}`);
          client.request(meQuery).then((r) => setUser(r.me));
        }
      );
  }, [isAuthenticated, getAccessTokenSilently, r]);
  return (
    <APIContext.Provider value={{ user, client, refreshUser }}>
      {children}
    </APIContext.Provider>
  );
}

export const useApiContext = () => React.useContext<IAPIContext>(APIContext);
