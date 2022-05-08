import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  Textarea,
  useTheme,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Comment from "../components/Comment";
import Xarrow, { Xwrapper } from "react-xarrows";
import makeAvatar from "../helpers/makeAvatar";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { IComment } from "@reputable/types";
import Card from "../components/Card";
import { useAuth0 } from "@auth0/auth0-react";
import { PrimaryButton } from "../components/Button";
import { useForm } from "react-hook-form";
import { useComment } from "../_api/Comments/mutations";
import { useRouter } from "next/router";

// React-XArrows will throw a warning if this is removed.
React.useLayoutEffect = React.useEffect;

export interface CommentsProps {
  comments: IComment[];
}

export default function Comments({
  comments = [],
}: React.PropsWithChildren<CommentsProps>) {
  const batchSize = 2;
  const startingBatchNumber = React.useRef(1);

  const theme = useTheme();
  const { user = {} } = useAuth0();
  const { register, handleSubmit } =
    useForm<Pick<IComment, "text" | "experiment" | "replyTo">>();
  const router = useRouter();
  const { create, remove } = useComment(router.query.id as string);
  const [renderedComments, setRenderedComments] = useState(
    comments.slice(0, batchSize)
  );

  const onLoadMore = () => {
    setRenderedComments((prevComments) => [
      ...prevComments,
      ...comments.slice(
        startingBatchNumber.current * batchSize,
        (startingBatchNumber.current + 1) * batchSize
      ),
    ]);
  };

  return (
    <Card>
      <Heading fontSize="20px" fontWeight={600} color="gray.700">
        {" "}
        The Conversation ({comments.length})
      </Heading>
      <Text
        py={1}
        fontSize="18px"
        color="gray.600"
        fontWeight={400}
        lineHeight="28px"
      >
        Start a discussion, not a fire. Post with kindness.
      </Text>
      <Divider my={5} />
      {/*
        Sort will go here.
       */}
      <Flex w="100%">
        <Avatar
          width={"40px"}
          height={"40px"}
          name="Profile Photo"
          src={user.picture ?? makeAvatar(user.given_name ?? "User")}
        />
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit((values) => {
            create.mutate({
              ...values,
              experiment: router.query.id as string,
            });
          })}
        >
          <HStack align="end">
            <Textarea
              ml={3}
              h="100px"
              placeholder="Add a comment"
              required
              {...register("text", {
                minLength: {
                  value: 10,
                  message: "Your comment should be at least 20 chars long.",
                },
              })}
            />
            <PrimaryButton fontSize="14px" h={8} type="submit" text="Submit" />
          </HStack>
        </form>
      </Flex>
      <Xwrapper>
        {renderedComments.map((comment, index) => {
          return (
            <Box key={`parent_comment_${index}`}>
              <Comment id={`comment_${index}`} data={comment} />
              {index !== 0 && (
                <Xarrow
                  start={`comment_${index - 1}`}
                  end={`comment_${index}`}
                  color={theme.colors.gray[200]}
                  showHead={false}
                  strokeWidth={1}
                />
              )}
            </Box>
          );
        })}
      </Xwrapper>
      <Flex justify="center" align="center">
        <Button
          leftIcon={<ArrowDownIcon />}
          onClick={() => onLoadMore()}
          disabled={renderedComments.length === comments.length}
          height={7}
          variant="ghost"
          size="sm"
        >
          Load More
        </Button>
      </Flex>
    </Card>
  );
}
