import { IComment } from "@reputable/types";
import { IMessageResponse } from "@reputable/types";
import { gql } from "graphql-request";
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

  const config = {
    onSuccess: () => {
      queryClient.invalidateQueries(["experiments", { _id: experimentId }]);
    },
  };

  const createComment = useMutation<
    IMessageResponse,
    Error,
    Pick<IComment, "text" | "experiment" | "replyTo">
  >(
    "createComment",
    (params) =>
      client.request(createCommentQuery, {
        createCommentInput: params,
      }),
    config
  );

  const removeComment = useMutation<IMessageResponse, Error, { _id: string }>(
    "removeComment",
    (params) => client.request(removeCommentQuery, params),
    config
  );

  return { create: createComment, remove: removeComment };
};
