import { Box, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { CreateInfoCard } from '../../../../components/Experiments';
import { useMediaQuery } from '@chakra-ui/react';

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
  const [isMobile] = useMediaQuery('(max-width: 30em');

  return (
    <Flex
      justify="stretch"
      width="100%"
      align="start"
      gap={20}
      position="relative"
      direction={isMobile ? 'column' : 'row'}
    >
      <Box flexGrow={1}>{children}</Box>
      <VStack align="end">
        <CreateInfoCard
          mt={isMobile ? 2 : 10}
          currentStep={currentStep}
          totalSteps={2}
          step={{
            title,
            description,
          }}
        />
      </VStack>
    </Flex>
  );
}
