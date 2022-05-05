import { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";

const joinCommunityMutation = gql`
  mutation ($community: String!) {
    joinCommunity(community: $community) {
      message
    }
  }
`;

export const useJoinCommunity = () => {
  const { client, refreshUser } = useApiContext();

  return useMutation<IMessageResponse, Error, { community: string }>(
    "joinCommunity",
    (params) => client.request(joinCommunityMutation, params),
    {
      onSuccess: () => refreshUser(),
    }
  );
};
