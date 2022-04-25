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
import Comment from "../components/Comment";
import Xarrow, { Xwrapper } from "react-xarrows";
import makeAvatar from "../helpers/makeAvatar";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { IComment } from "types";
import Card from "../components/Card";
import { useAuth0 } from "@auth0/auth0-react";

// React-XArrows will throw a warning if this is removed.
React.useLayoutEffect = React.useEffect;

export interface CommentsProps {
  comments: IComment[];
}

export default function Comments({
  comments = [],
}: React.PropsWithChildren<CommentsProps>) {
  const theme = useTheme();
  const { user = {} } = useAuth0();
  const [value, setValue] = React.useState("");

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
      <Flex>
        <Avatar
          width={"40px"}
          height={"40px"}
          name="Profile Photo"
          src={user.profileImage ?? makeAvatar(user.given_name ?? "User")}
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
    </Card>
  );
}
