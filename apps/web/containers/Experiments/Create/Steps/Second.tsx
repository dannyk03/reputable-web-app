import { useTheme, VStack, Text, Divider } from "@chakra-ui/react";
import { StepProps, TCreateExperiment } from "..";
import { useFormContext } from "react-hook-form";
import Card from "../../../../components/Card";

export default function SecondStep({}: React.PropsWithChildren<StepProps>) {
  const { register, setValue, trigger } = useFormContext<TCreateExperiment>();
  const theme = useTheme();
  return (
    <VStack align="start" gap={3} width="100%">
      <Card>
        <Text
          fontSize="20px"
          fontWeight={600}
          lineHeight="28px"
          color="primary.800"
        >
          Health Markers to Track
        </Text>
        <Text mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Divider my={4} />
      </Card>
    </VStack>
  );
}
