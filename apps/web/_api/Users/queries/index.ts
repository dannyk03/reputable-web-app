import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import { IUser } from "@reputable/types";

const userByEmailQuery = gql`
  query ($email: String!) {
    userByEmail(email: $email) {
      name
      picture
      user_metadata {
        tokens
        communities
      }
      user_id
      experiments {
        _id
        title
        description
        communities {
          name
          icon
          slug
        }
        tips {
          userId
          amount
        }
        createdBy {
          picture
          name
        }
      }
      last_login
    }
  }
`;

export const useUserByEmail = (email: string) => {
  const { client } = useApiContext();

  return useQuery<IUser>(["userByEmail", { email }], () =>
    client.request(userByEmailQuery, { email }).then((r) => {
      return r.userByEmail;
    })
  );
};
