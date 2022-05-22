import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import NextLink from "next/link";
import makeAvatar from "../../helpers/makeAvatar";
import Image from "next/image";
import React from "react";
import type { PopulatedComment } from "@reputable/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { useComment } from "../../_api/Comments/mutations";
import { useRouter } from "next/router";
import { useApiContext } from "../../providers/ApiContext";
import Card from "../Card";
import { ClickOutside } from "../../hooks/useClickOutside";
import ReputableLogo from "../Icons/ReputableLogo";
import { PrimaryButton } from "../Button";
import TipModal from "../TipModal";
import TipsIcon from "../Icons/TipsIcon";
import ExperimentsIcon from "../Icons/ExperimentsIcon";
import CommentForm from "./Form";
import Modal from "../Modal";
import calculateContributions from "../../helpers/calculateContributions";

interface CommentProps {
  data: Partial<PopulatedComment>;
  /** Used to draw arrows from avatar to avatar */
  id?: string;
}

export default function Comment({
  data,
  id,
  ...restProps
}: React.PropsWithChildren<CommentProps>) {
  const {
    updatedAt = data.createdAt,
    replyTo,
    _id,
    author,
    text,
    replies = [],
  } = data;
  const [isUserCardOpen, setUserCardOpen] = React.useState(false);
  const timeAgo = moment(new Date(updatedAt)).fromNow();
  const router = useRouter();
  const { user } = useApiContext();
  const [showReplies, setShowReplies] = React.useState(false);
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const { create, remove } = useComment(router.query.id as string);
  const { totalTokens } = calculateContributions(
    author?.user_metadata?.tips || []
  );
  return (
    <>
      <Box {...restProps} pl={replyTo !== null ? 12 : 0} pt={5}>
        <Flex justify="start"></Flex>
        <Flex justify={"start"} align="center" position="relative">
          <Flex align={"center"} cursor="pointer">
            <Avatar
              id={id}
              width={"40px"}
              height={"40px"}
              name="Profile Photo"
              src={author.picture ?? makeAvatar("User")}
              onClick={() => setUserCardOpen(true)}
            />
            <Text
              pl="2"
              fontWeight={600}
              color="gray.700"
              onClick={() => setUserCardOpen(true)}
            >
              {author.name}
            </Text>
          </Flex>
          <Text pl="2" fontWeight={400} color="gray.600">
            {timeAgo}
          </Text>
          {isUserCardOpen && (
            <ClickOutside
              onClickOutside={() => {
                setUserCardOpen(false);
              }}
            >
              <Card
                py={6}
                px="60px"
                position="absolute"
                top="30px"
                left="50px"
                zIndex={999}
                backgroundColor="white"
                borderRadius="16px"
              >
                <VStack>
                  <Avatar
                    id={id}
                    width={"64px"}
                    height={"64px"}
                    name="User Card Profile Photo"
                    src={author.picture ?? makeAvatar("User")}
                  />
                  <Text
                    pl="2"
                    fontWeight={600}
                    color="gray.700"
                    onClick={() => setUserCardOpen(true)}
                  >
                    {author.name}
                  </Text>
                  <HStack>
                    <HStack alignItems="center">
                      <Icon
                        as={TipsIcon}
                        width="14px"
                        height="14px"
                        color="gray.600"
                      />
                      <Text size="12px" lineHeight="26px" color="gray.600">
                        {Math.round(parseFloat(totalTokens))}
                      </Text>
                    </HStack>
                    <HStack alignItems="center">
                      <Icon
                        as={ExperimentsIcon}
                        width="14px"
                        height="14px"
                        color="gray.600"
                      />
                      <Text size="12px" lineHeight="26px" color="gray.600">
                        {author?.experiments_count}
                      </Text>
                    </HStack>
                  </HStack>
                  <NextLink
                    passHref
                    href={`/user/${encodeURIComponent(author.email)}`}
                  >
                    <PrimaryButton
                      text="See full profile"
                      size="sm"
                      fontSize="14px"
                      height="32px"
                    />
                  </NextLink>
                </VStack>
              </Card>
            </ClickOutside>
          )}
        </Flex>
        <Flex pl={12}>
          <Text>{text}</Text>
        </Flex>
        <Flex pl={12} pt="12px" align="center">
          {/*
          <Voting
            upvotes={upvotes}
            downvotes={downvotes}
            handleVote={(upvote, downvote, inc) =>
              console.log(upvote, downvote, inc)
            }
            upvoted
          />
          */}
          {replyTo === null && (
            <Button
              colorScheme="gray"
              variant="ghost"
              height={6}
              ml={1}
              onClick={() => setShowReplyForm((prev) => !prev)}
            >
              <Image
                src="/icons/Comment.svg"
                width={14}
                height={14}
                alt="Reply"
              />
              <Text pl="6px">Reply</Text>
            </Button>
          )}
          {!user?.app_metadata?.isApproved ? (
            <Modal
              title="Information"
              button={
                <Button
                  leftIcon={
                    <Icon
                      as={ReputableLogo}
                      color="gray.600"
                      width="14px"
                      height="14px"
                    />
                  }
                  colorScheme="gray"
                  variant="ghost"
                  height={6}
                  ml={1}
                >
                  <Text pl="6px">Tip REPT</Text>
                </Button>
              }
            >
              You have to be approved by an administrator to be able to tip
              another user.
            </Modal>
          ) : (
            <TipModal
              userId={data?.author?.user_id}
              experimentId={router.query.id as string}
            >
              <Button
                leftIcon={
                  <Icon
                    as={ReputableLogo}
                    color="gray.600"
                    width="14px"
                    height="14px"
                  />
                }
                colorScheme="gray"
                variant="ghost"
                height={6}
                ml={1}
              >
                <Text pl="6px">Tip REPT</Text>
              </Button>
            </TipModal>
          )}
          {user && user.email === author.email && (
            <Button
              colorScheme="red"
              variant="ghost"
              height={6}
              ml={1}
              onClick={() => {
                if (window.confirm("Are you sure to delete this comment?"))
                  remove.mutate({ _id });
              }}
            >
              <DeleteIcon width="14px" />
              <Text pl="6px">Delete</Text>
            </Button>
          )}
          {replies.length > 0 && (
            <>
              <Text
                color="primary.600"
                _hover={{ textDecor: "underline", cursor: "pointer" }}
                onClick={() =>
                  setShowReplies((prevShowReplies) => !prevShowReplies)
                }
              >
                {!showReplies
                  ? `Show replies (${replies.length})`
                  : "Hide replies"}
              </Text>
            </>
          )}
        </Flex>
      </Box>
      <Collapse in={showReplyForm}>
        <CommentForm
          mt={5}
          ml={12}
          h="70px"
          placeholder="Add a reply"
          onSubmit={(data) => {
            create.mutate({
              replyTo: _id,
              text: data.text,
              experiment: router.query.id as string,
            });
          }}
        />
      </Collapse>
      <Collapse in={showReplies}>
        {replies.map((comment, idx) => (
          <Comment key={`reply_${comment._id}`} data={comment} />
        ))}
      </Collapse>
    </>
  );
}
