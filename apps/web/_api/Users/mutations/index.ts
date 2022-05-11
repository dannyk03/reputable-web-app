import { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";

const joinCommunityMutation = gql`
  mutation ($community: String!) {
    joinCommunity(community: $community) {
      message
    }
  }
`;

export const useJoinCommunity = (community: string) => {
  const { client: APIClient, refreshUser } = useApiContext();
  const client = useQueryClient();

  return useMutation<IMessageResponse, Error>(
    "joinCommunity",
    () => APIClient.request(joinCommunityMutation, { community }),
    {
      onSuccess: () => {
        refreshUser();
        client.invalidateQueries(["experiments", { community }]);
      },
    }
  );
};
