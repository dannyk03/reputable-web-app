import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import Comment from "../components/Comment";
import Xarrow, { Xwrapper } from "react-xarrows";
import makeAvatar from "../helpers/makeAvatar";
import { ArrowDownIcon } from "@chakra-ui/icons";
import type { PopulatedComment } from "@reputable/types";
import Card from "../components/Card";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { useComment } from "../_api/Comments/mutations";
import { useRouter } from "next/router";
import CommentForm from "../components/Comment/Form";

// React-XArrows will throw a warning if this is removed.
React.useLayoutEffect = React.useEffect;

export interface CommentsProps {
  comments: PopulatedComment[];
  isLoading?: boolean;
}

export default function Comments({
  comments = [],
  isLoading,
}: React.PropsWithChildren<CommentsProps>) {
  const theme = useTheme();
  const { user = {} } = useAuth0();
  const { register, handleSubmit, reset } =
    useForm<Pick<PopulatedComment, "text" | "experiment" | "replyTo">>();
  const router = useRouter();
  const { create, remove } = useComment(router.query.id as string);
  const [batchSize, setBatchSize] = React.useState(5);

  const onLoadMore = () => {
    setBatchSize((prevBatch) => prevBatch + 5);
  };

  return (
    <Card p={0}>
      {isLoading && <Progress isIndeterminate />}
      <Box p={6}>
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
        <CommentForm
          h="100px"
          placeholder="Add a comment"
          onSubmit={(data) => {
            create.mutate({
              text: data.text,
              experiment: router.query.id as string,
            });
          }}
        />
        <Xwrapper>
          {comments.slice(0, batchSize).map((comment, index) => {
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
        <Flex justify="center" align="center" mt={5}>
          <Button
            leftIcon={<ArrowDownIcon />}
            onClick={() => onLoadMore()}
            disabled={comments.slice(0, batchSize).length === comments.length}
            height={7}
            variant="ghost"
            size="sm"
          >
            Load More
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}
