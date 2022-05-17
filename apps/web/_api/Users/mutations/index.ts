import { useToast } from "@chakra-ui/react";
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

const tipUserMutation = gql`
  mutation ($userId: String!, $tip: Int!) {
    tipUser(userId: $userId, tip: $tip) {
      message
    }
  }
`;

export const useTipUser = (userId?: string, experimentId?: string) => {
  const { client, refreshUser } = useApiContext();
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation<IMessageResponse, Error, { userId: string; tip: number }>(
    "tipUser",
    (params) => {
      return client
        .request<{ tipUser: IMessageResponse }>(tipUserMutation, {
          userId,
          ...params,
        })
        .then((r) => r.tipUser);
    },
    {
      onSuccess: (data: IMessageResponse) => {
        queryClient.invalidateQueries(["experiments", { _id: experimentId }]);
        refreshUser();
        toast({
          title: "Success!",
          description: data.message,
          status: "success",
          isClosable: true,
          variant: "top-accent",
        });
      },
    }
  );
};

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
