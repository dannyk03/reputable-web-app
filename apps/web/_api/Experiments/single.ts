import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useGraphqlClient } from "../../providers/GraphqlClient";
import { PopulatedExperiment } from "@reputable/types";

const query = gql`
  query ($_id: String!) {
    experiment(_id: $_id) {
      title
      communities
      createdBy {
        name
        email
        picture
      }
      startDate
      endDate
      results {
        marker {
          name
          unit
          slug
        }
        lastChange {
          type
          percentage
          value
        }
        history {
          date
          value
          imageLink
          prettified
        }
      }
      status
      description
      _id
    }
  }
`;

export const useExperiment = (_id: string) => {
  const client = useGraphqlClient();

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
