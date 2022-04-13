import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import RichTextEditor from "../../components/Editor";
import { CreateInfoCard } from "../../components/Experiments";
import NoSSR from "../../components/NoSSR";
import TextLink from "../../components/TextLink";

export default function CreateExperimentView() {
  return (
    <HStack align="start" gap={24}>
      <VStack align="start" flexGrow={1} gap={6}>
        <TextLink label="Back" href="/experiments" icon={<ArrowBackIcon />} />
        <Input
          id="title"
          placeholder="Your title goes here!"
          size="lg"
          fontWeight={600}
          color="gray.800"
        />
        <NoSSR>
          <RichTextEditor />
        </NoSSR>
      </VStack>
      <CreateInfoCard currentStep={0} totalSteps={2} />
    </HStack>
  );
}
