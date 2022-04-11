import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, VStack, Text, Input } from "@chakra-ui/react";
import { CreateInfoCard } from "../../components/Experiments";
import TextLink from "../../components/TextLink";

export default function CreateExperimentView() {
  return (
    <HStack align="start" gap={24}>
      <VStack align="start" flexGrow={1} gap={6}>
        <TextLink label="Back" href="/experiments" icon={<ArrowBackIcon />} />
        <Input placeholder="Title" size="lg" />
        {/* React editor goes here, most probably. */}
      </VStack>
      <CreateInfoCard currentStep={0} totalSteps={2} />
    </HStack>
  );
}
