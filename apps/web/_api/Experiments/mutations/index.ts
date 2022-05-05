import { IMessageResponse } from "@reputable/types";
import { gql, request } from "graphql-request";
import { useMutation } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";

const tipExperiment = gql`
  mutation ($experimentId: String!, $tip: Int!) {
    tipExperiment(id: $experimentId, tip: $tip) {
      message
    }
  }
`;

export const useTipExperiment = () => {
  const { client } = useApiContext();

  return useMutation<
    IMessageResponse,
    Error,
    { experimentId: string; tip: number }
  >("tipExperiment", (params) => {
    return client.request<IMessageResponse>(tipExperiment, params);
  });
};
