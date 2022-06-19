import { useToast } from "@chakra-ui/react";
import type { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { MutationOptions, useMutation, useQueryClient } from "react-query";
import { TCreateExperiment } from "../../../containers/Experiments/Form";
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

const updateExperimentMutation = gql`
  mutation ($_id: String!, $updateExperimentInput: UpdateExperimentInput!) {
    updateExperiment(_id: $_id, experiment: $updateExperimentInput) {
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
  configs?: Partial<Record<"create" | "update" | "remove", MutationOptions>>;
}) => {
  const { client } = useApiContext();
  const queryClient = useQueryClient();
  const toast = useToast();
  const cfg = (type: "create" | "update" | "remove") => ({
    onSuccess: (data: IMessageResponse, variables, ctx) => {
      if (params.configs[type].onSuccess) {
        params.configs[type].onSuccess(data, variables, ctx);
      } else {
        queryClient.invalidateQueries(["experiments"]);
      }
      console.log("toast will call");
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        isClosable: true,
        variant: "top-accent",
      });
    },
  });

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
    cfg("create")
  );

  const removeExperiment = useMutation<
    IMessageResponse,
    Error,
    { _id: string }
  >(
    "removeExperiment",
    (params) =>
      client
        .request(removeExperimentMutation, params)
        .then((r) => r.removeExperiment),
    cfg("remove")
  );

  const updateExperiment = useMutation<
    IMessageResponse,
    Error,
    { _id: string; data: TCreateExperiment & { _id: string } }
  >(
    "updateExperiment",
    (params) =>
      client
        .request(updateExperimentMutation, {
          _id: params._id,
          updateExperimentInput: params.data,
        })
        .then((r) => r.updateExperiment),
    cfg("update")
  );

  return {
    create: createExperiment,
    remove: removeExperiment,
    update: updateExperiment,
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
