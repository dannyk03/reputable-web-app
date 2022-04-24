import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import moment from "moment";
import makeAvatar from "../../helpers/makeAvatar";
import Image from "next/image";
import Voting from "./Voting";
import React from "react";
import { IComment } from "../../types";

export default function Comment({
  id,
  author,
  isReply = false,
  text,
  upvotes = 300,
  downvotes = 200,
  replies = [],
  updatedAt,
}: React.PropsWithChildren<IComment>) {
  const timeAgo = moment(updatedAt).fromNow();
  return (
    <>
      <Box pl={isReply && 12} pt={5}>
        <Flex justify="start"></Flex>
        <Flex justify={"start"} align="center">
          <Avatar
            id={id}
            width={"40px"}
            height={"40px"}
            name="Profile Photo"
            src={author.profileImage ?? makeAvatar("tolga")}
          />
          <Text pl="2" fontWeight={600} color="gray.700">
            Tolga Oguz
          </Text>
          <Text pl="2" fontWeight={400} color="gray.600">
            {timeAgo}
          </Text>
        </Flex>
        <Flex pl={12}>
          <Text>{text}</Text>
        </Flex>
        <Flex pl={12} pt="12px" align="center">
          <Voting
            upvotes={upvotes}
            downvotes={downvotes}
            handleVote={(upvote, downvote, inc) =>
              console.log(upvote, downvote, inc)
            }
            upvoted
          />
          <Button colorScheme="gray" variant="ghost" height={6} ml={1}>
            <Image
              src="/icons/Comment.svg"
              width={14}
              height={14}
              alt="Reply"
            />
            <Text pl="6px">Reply</Text>
          </Button>
        </Flex>
      </Box>
      {replies.map((comment, idx) => (
        <Comment key={`${id}_reply_${idx}`} {...comment} />
      ))}
    </>
  );
}
