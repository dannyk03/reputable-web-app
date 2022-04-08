import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

export interface VotingProps {
  upvotes: number;
  downvotes: number;
  handleVote: (upvotes: number, downvotes: number, increment: -1 | 1) => void;
  upvoted?: boolean;
  downvoted?: boolean;
}

export default function Voting({
  upvotes = 300,
  downvotes = 200,
  handleVote,
  upvoted = false,
  downvoted = false,
}: React.PropsWithChildren<VotingProps>) {
  const absoluteVote = upvotes - downvotes;
  const pos = absoluteVote > 0;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Flex justify="center" align="center">
      <ArrowUpIcon
        color={upvoted && "green.400"}
        onClick={(e) => {
          if (!upvoted) handleVote(upvotes, downvotes, 1);
        }}
        _hover={{ color: "green.400", cursor: !upvoted && "pointer" }}
        aria-label="Upvote"
        width={4}
        height={4}
      />
      <Text fontSize={16} mx={2} color={pos ? "green.400" : "red.400"}>
        {formatter.format(absoluteVote)}
      </Text>
      <ArrowDownIcon
        color={downvoted && "red.400"}
        onClick={(e) => {
          if (!downvoted) handleVote(upvotes, downvotes, -1);
        }}
        _hover={{ color: "red.400", cursor: !downvoted && "pointer" }}
        width={4}
        height={4}
        aria-label="Downvote"
      />
    </Flex>
  );
}
