import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Textarea,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
React.useLayoutEffect = React.useEffect;
import Comment, { IComment } from "../components/Comment";
import Xarrow, { Xwrapper } from "react-xarrows";
import { user } from "../mockData";
import makeAvatar from "../helpers/makeAvatar";
import { ArrowDownIcon } from "@chakra-ui/icons";

export interface CommentsProps {
  comments: IComment[];
}

export default function Comments({
  comments = [],
}: React.PropsWithChildren<CommentsProps>) {
  const theme = useTheme();

  const [value, setValue] = React.useState("");
  return (
    <Box p={6} borderRadius="xl" borderWidth={1} shadow="md">
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
      <Flex>
        <Avatar
          width={"40px"}
          height={"40px"}
          name="Profile Photo"
          src={user.profileImage ?? makeAvatar("tolga")}
        />
        <Textarea ml={3} placeholder="Add a comment" />
      </Flex>
      <Xwrapper>
        {comments.map((comment, index) => {
          return (
            <Box key={`parent_comment_${index}`}>
              <Comment id={`comment_${index}`} {...comment} />
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
          height={7}
          variant="ghost"
          size="sm"
        >
          Load More
        </Button>
      </Flex>
    </Box>
  );
}
