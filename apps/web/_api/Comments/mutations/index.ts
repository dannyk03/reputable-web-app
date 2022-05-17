import { useToast } from "@chakra-ui/react";
import type { IComment } from "@reputable/types";
import type { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useApiContext } from "../../../providers/ApiContext";

const createCommentQuery = gql`
  mutation ($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      message
    }
  }
`;

const removeCommentQuery = gql`
  mutation ($_id: String!) {
    removeComment(_id: $_id) {
      message
    }
  }
`;

export const useComment = (experimentId: string) => {
  const { client } = useApiContext();
  const queryClient = useQueryClient();
  const toast = useToast();
  const config = {
    onSuccess: (data: IMessageResponse) => {
      queryClient.invalidateQueries(["experiments", { _id: experimentId }]);
      toast({
        title: "Success!",
        description: data.message,
        status: "success",
        isClosable: true,
        variant: "top-accent",
      });
    },
  };

  const createComment = useMutation<
    IMessageResponse,
    Error,
    Pick<IComment, "text" | "experiment" | "replyTo">
  >(
    "createComment",
    (params) =>
      client
        .request(createCommentQuery, {
          createCommentInput: params,
        })
        .then((r) => r.createComment),
    {
      ...config,
    }
  );

  const removeComment = useMutation<IMessageResponse, Error, { _id: string }>(
    "removeComment",
    (params) => {
      return client
        .request(removeCommentQuery, params)
        .then((r) => r.removeComment);
    },
    config
  );

  return { create: createComment, remove: removeComment };
};
