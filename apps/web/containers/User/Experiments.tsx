import {
  Avatar,
  Text,
  HStack,
  VStack,
  Icon,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import type { IUser } from "@reputable/types";
import { useRouter } from "next/router";
import React from "react";
import ExperimentsLogo from "../../components/Icons/ExperimentsLogo";
import ReputableLogo from "../../components/Icons/ReputableLogo";
import makeAvatar from "../../helpers/makeAvatar";
import moment from "moment";
import { useApiContext } from "../../providers/ApiContext";
import { ExperimentCard } from "../../components/Experiments";

interface UserExperimentsProps {
  data?: IUser;
}

export default function UserExperiments({
  data,
}: React.PropsWithChildren<UserExperimentsProps>) {
  const router = useRouter();
  const { user } = useApiContext();

  const lastLogin = moment(user?.last_login ?? Date.now()).fromNow();
  return (
    <VStack textAlign="left" w="100%" justify="start" gap={10}>
      <HStack
        py={10}
        px="75px"
        backgroundColor="primary.100"
        w="100%"
        align="center"
      >
        <Avatar
          width={"64px"}
          height={"64px"}
          name="Profile Photo"
          src={data?.picture ?? makeAvatar(data?.user_id)}
        />
        <VStack gap={2} pl={5} justify="flex-start">
          <Box w="100%">
            <Text
              color="gray.800"
              fontWeight={600}
              fontSize="24px"
              lineHeight="32px"
            >
              {data?.name}
            </Text>
          </Box>
          <HStack>
            <HStack alignItems="center">
              <Icon as={ReputableLogo} width="20px" height="20px" />
              <Text size="16px" lineHeight="24px">
                {data?.user_metadata.tokens}
              </Text>
            </HStack>
            <HStack align="center">
              <Icon as={ExperimentsLogo} width="20px" height="20px" />
              <Text>{data?.experiments.length}</Text>
            </HStack>
            <HStack>
              <Text color="gray.400" fontSize="14px" lineHeight="20px">
                was active {lastLogin}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <Box display="block" w="100%">
        <Tabs>
          <TabList>
            <Tab>Experiments ({data?.experiments.length})</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={10}>
              {(data?.experiments || []).map((exp) => (
                <ExperimentCard experiment={exp} mt={5} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
}
