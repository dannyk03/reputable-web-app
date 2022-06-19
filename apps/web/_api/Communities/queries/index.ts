import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";
import type { ICommunity } from "@reputable/types";

const communitiesQuery = gql`
  query {
    communities {
      name
      icon
      slug
      memberCount
      isEnabled
      isPublished
    }
  }
`;

export const useCommunities = () => {
  const { client } = useApiContext();

  return useQuery<ICommunity[]>(["communities"], () =>
    client.request(communitiesQuery).then((r) => {
      return r.communities;
    })
  );
};
