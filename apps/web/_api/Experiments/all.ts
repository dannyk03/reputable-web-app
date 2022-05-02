import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useGraphqlClient } from "../../providers/GraphqlClient";
import { PopulatedExperiment } from "@reputable/types";

export interface ExperimentsParams {
  GET: {
    community: string;
  };
}

const query = gql`
  query {
    experiments {
      title
      communities
      createdBy {
        name
        email
        picture
      }
      experimentPeriod
      status
      description
      _id
    }
  }
`;

export const useExperiments = (params: ExperimentsParams["GET"]) => {
  const client = useGraphqlClient();
  const { community } = params;

  return useQuery<PopulatedExperiment[]>(["experiments", { community }], () =>
    client.request(query).then((r) => {
      return r.experiments;
    })
  );
};

export const prefetchExperiments = async (params: ExperimentsParams["GET"]) => {
  const { community } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PopulatedExperiment[]>(
    ["experiments", { community }],
    () =>
      request(`${process.env.API_URL}/graphql`, query).then((r) => {
        return r.experiments;
      })
  );
  return queryClient;
};
