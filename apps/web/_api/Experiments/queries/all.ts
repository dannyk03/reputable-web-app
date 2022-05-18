import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import type { PopulatedExperiment } from "@reputable/types";

export interface ExperimentsParams {
  GET: {
    community: string;
  };
}

const query = gql`
  query ($community: String) {
    experiments(community: $community) {
      title
      tips {
        amount
        userId
      }
      communities {
        icon
        name
        slug
        memberCount
      }
      createdBy {
        name
        email
        picture
      }
      experimentPeriod
      status
      description {
        goal
        idea
        design
        summary
        results
      }
      _id
    }
  }
`;

export const useExperiments = (community?: string) => {
  const { client } = useApiContext();

  return useQuery<PopulatedExperiment[]>(["experiments", { community }], () =>
    client.request(query, { community }).then((r) => {
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
