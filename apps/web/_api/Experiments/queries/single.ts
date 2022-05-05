import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import { PopulatedExperiment } from "@reputable/types";

const query = gql`
  query ($_id: String!) {
    experiment(_id: $_id) {
      title
      communities {
        name
        slug
        icon
        memberCount
      }
      tips {
        amount
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
        replyTo
        createdAt
        updatedAt
        text
        author {
          name
          user_id
          email
          picture
        }
        replies {
          createdAt
          updatedAt
          author {
            name
            user_id
            email
            picture
          }
          text
        }
      }
      status
      description
      _id
    }
  }
`;

export const useExperiment = (_id: string) => {
  const { client } = useApiContext();

  return useQuery<PopulatedExperiment>(["experiment", { _id }], () =>
    client.request(query, { _id }).then((r) => {
      console.log("response", r);
      return r.experiment;
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
