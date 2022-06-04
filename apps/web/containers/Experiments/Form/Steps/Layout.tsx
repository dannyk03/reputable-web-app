import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { CreateInfoCard } from "../../../../components/Experiments";

interface StepperLayoutProps {
  title: string;
  description: string;
  currentStep: number;
}

export default function StepperLayout({
  children,
  title,
  description,
  currentStep,
}: React.PropsWithChildren<StepperLayoutProps>) {
  return (
    <HStack
      justify="stretch"
      width="100%"
      align="start"
      gap={20}
      position="relative"
    >
      <Box flexGrow={1}>{children}</Box>
      <VStack align="end">
        <CreateInfoCard
          mt={10}
          currentStep={currentStep}
          totalSteps={2}
          step={{
            title,
            description,
          }}
        />
      </VStack>
    </HStack>
  );
}
