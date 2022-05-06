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

  return useMutation<
    IMessageResponse,
    Error,
    { experimentId: string; tip: number }
  >(
    "tipExperiment",
    (params) => {
      return client.request<IMessageResponse>(tipExperiment, params);
    },
    {
      onSuccess: () => {
        console.log("invalidating", experimentId);
        queryClient.invalidateQueries(["experiments", { _id: experimentId }]);
        refreshUser();
      },
    }
  );
};
