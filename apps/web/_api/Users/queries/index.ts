import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useApiContext } from '../../../providers/ApiContext';
import type { IUser } from '@reputable/types';

const userByEmailQuery = gql`
  query ($email: String!) {
    userByEmail(email: $email) {
      name
      picture
      user_metadata {
        tokens
        communities
        address
        tips {
          userId
          amount
        }
      }
      user_id
      experiments_count
      last_login
    }
  }
`;

export const useUserByEmail = (email: string) => {
  const { client } = useApiContext();

  return useQuery<IUser>(['userByEmail', { email }], () =>
    client.request(userByEmailQuery, { email }).then((r) => {
      return r.userByEmail;
    }),
  );
};
