import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import type { PopulatedExperiment } from "@reputable/types";

const query = gql`
  query ($_id: String!) {
    experiment(_id: $_id) {
      title
      communities {
        name
        slug
        icon
        memberCount
        bgColor
        textColor
      }
      tips {
        userId
        amount
      }
      description {
        goal
        idea
        design
        summary
        results
      }
      experimentPeriod
      markers {
        name
        slug
        devices
      }
      createdBy {
        name
        user_id
        email
        picture
      }
      comments {
        _id
        replyTo
        createdAt
        updatedAt
        text
        author {
          name
          user_id
          experiments_count
          email
          user_metadata {
            tokens
            tips {
              userId
              amount
            }
          }
          picture
        }
        replies {
          _id
          createdAt
          updatedAt
          author {
            name
            experiments_count
            user_metadata {
              tokens
              tips {
                userId
                amount
              }
            }
            user_id
            email
            picture
          }
          text
        }
      }
      status
      _id
      createdAt
      updatedAt
    }
  }
`;

export const useExperiment = (_id: string) => {
  const { client } = useApiContext();

  return useQuery<PopulatedExperiment>(["experiments", { _id }], () =>
    client
      .request(query, { _id })
      .then((r) => {
        return r.experiment;
      })
      .catch((err) => {
        if (!_id) return undefined;
      })
  );
};

export const prefetchExperiment = async (_id: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PopulatedExperiment>(
    ["experiments", { _id }],
    () =>
      request(`${process.env.API_URL}/graphql`, query).then((r) => {
        return r.experiment;
      })
  );
  return queryClient;
};
