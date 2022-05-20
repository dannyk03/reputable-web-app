import { useToast } from "@chakra-ui/react";
import type { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { pickBy } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { TCreateExperiment } from "../../../containers/Experiments/Create";
import { useApiContext } from "../../../providers/ApiContext";

const tipExperiment = gql`
  mutation ($experimentId: String!, $tip: Int!) {
    tipExperiment(id: $experimentId, tip: $tip) {
      message
    }
  }
`;

const createExperimentMutation = gql`
  mutation ($createExperimentInput: CreateExperimentInput!) {
    createExperiment(experiment: $createExperimentInput) {
      message
    }
  }
`;

const removeExperimentMutation = gql`
  mutation ($_id: String!) {
    removeExperiment(_id: $_id) {
      message
    }
  }
`;

export const useExperiment = (params?: {
  community?: string;
  createdBy?: string;
}) => {
  const { client } = useApiContext();
  const queryClient = useQueryClient();
  const q = pickBy(params, (v) => v);
  const toast = useToast();
  console.log("q for mutations", q);
  const config = {
    onSuccess: (data: IMessageResponse) => {
      queryClient.invalidateQueries(["experiments", q]);
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        isClosable: true,
        variant: "top-accent",
      });
    },
  };

  const createExperiment = useMutation<
    IMessageResponse,
    Error,
    TCreateExperiment
  >(
    "createExperiment",
    (params) =>
      client
        .request(createExperimentMutation, {
          createExperimentInput: params,
        })
        .then((r) => r.createExperiment),
    {
      ...config,
    }
  );

  const removeExperiment = useMutation<
    IMessageResponse,
    Error,
    { _id: string }
  >(
    "removeExperiment",
    (params) => {
      return client
        .request(removeExperimentMutation, params)
        .then((r) => r.removeExperiment);
    },
    config
  );

  return {
    create: createExperiment,
    remove: removeExperiment,
  };
};

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
        .request<{ tipExperiment: IMessageResponse }>(tipExperiment, {
          experimentId,
          ...params,
        })
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
