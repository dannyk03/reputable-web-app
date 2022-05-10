import { useToast } from "@chakra-ui/react";
import { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";

const tipExperiment = gql`
  mutation ($experimentId: String!, $tip: Int!) {
    tipExperiment(id: $experimentId, tip: $tip) {
      message
    }
  }
`;

export const useTipExperiment = (experimentId?: string) => {
  const { client, refreshUser } = useApiContext();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<
    IMessageResponse,
    Error,
    { experimentId: string; tip: number }
  >(
    "tipExperiment",
    (params) => {
      return client
        .request<{ tipExperiment: IMessageResponse }>(tipExperiment, params)
        .then((r) => r.tipExperiment);
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
