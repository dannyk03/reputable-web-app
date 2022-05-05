import { IMessageResponse } from "@reputable/types";
import { gql, request } from "graphql-request";
import { useMutation } from "react-query";
import { useApiContext } from "../../../providers/GraphqlClient";

const joinCommunityMutation = gql`
  mutation ($community: String!) {
    joinCommunity(community: $community) {
      message
    }
  }
`;

export const useJoinCommunity = (community: string) => {
  const { client } = useApiContext();

  return useMutation<IMessageResponse>("joinCommunity", () =>
    client.request(joinCommunityMutation, { community })
  );
};
