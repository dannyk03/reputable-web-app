import { gql, request } from "graphql-request";
import { useQuery, QueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import type { PopulatedExperiment } from "@reputable/types";
import { pickBy } from "lodash";

export interface ExperimentsParams {
  GET: {
    community: string;
  };
}

const query = gql`
  query ($community: String, $createdBy: String) {
    experiments(community: $community, createdBy: $createdBy) {
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
        bgColor
        textColor
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
      createdAt
      updatedAt
    }
  }
`;

export const useExperiments = (params: {
  community?: string;
  createdBy?: string;
}) => {
  const { client } = useApiContext();
  const q = pickBy(params, (v) => v);
  return useQuery<PopulatedExperiment[]>(["experiments", q], () =>
    client.request(query, q).then((r) => {
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
