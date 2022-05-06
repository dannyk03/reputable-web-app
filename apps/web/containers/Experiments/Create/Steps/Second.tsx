import {
  VStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Box,
} from "@chakra-ui/react";
import { StepProps, TCreateExperiment } from "..";
import { useFieldArray, useFormContext } from "react-hook-form";
import Card from "../../../../components/Card";
import { ExperimentResultMarker } from "../../../../types";
import moment from "moment";
import { TimeIcon } from "@chakra-ui/icons";

export interface SecondStepProps extends StepProps {
  resultMarkers?: ExperimentResultMarker[];
}

export default function SecondStep({
  resultMarkers,
}: React.PropsWithChildren<SecondStepProps>) {
  const { register, setValue, trigger, getValues, control } =
    useFormContext<TCreateExperiment>();
  const startDateMoment = moment(getValues("startDate"));
  const endDateMoment = moment(getValues("endDate"));
  const { fields, append, remove } = useFieldArray({
    control,
    name: "results",
  });
  return (
    <VStack align="start" gap={6} width="100%">
      <Card>
        <Text
          fontSize="20px"
          fontWeight={600}
          lineHeight="28px"
          color="primary.800"
        >
          Health Markers to Track
        </Text>
        <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Divider my={4} />
        {/* 
        <FormControl>
          <FormLabel htmlFor="healthMarker">
            Add Health Marker Results
          </FormLabel>
          <Select
            id="healthMarker"
            placeholder="Select a health marker"
            onChange={(e) => {
              append(JSON.parse(e.target.value));
            }}
          >
            {resultMarkers.map((resultMarker, index) => (
              <option
                key={`resultMarker_${index}`}
                value={JSON.stringify(resultMarker)}
              >
                {resultMarker.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {getValues("results").map((result, idx) => (
          <FormControl key={`resultMakerVal_${idx}`} w="100%">
            <FormLabel htmlFor="startDate">{result.marker.name}</FormLabel>
            <Input
              type="date"
              placeholder="Select a health marker"
              {...register("results", {
                required: true,
                valueAsDate: true,
              })}
            ></Input>
          </FormControl>
        ))}
                    */}
      </Card>
      <Card>
        <Text
          fontSize="20px"
          fontWeight={600}
          lineHeight="28px"
          color="primary.800"
        >
          Experiment Period
        </Text>
        <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Divider my={4} />
        <HStack justify="start">
          <Box minW="280px">
            <FormControl w="100%">
              <FormLabel htmlFor="startDate">Start date</FormLabel>
              <Input
                type="date"
                placeholder="Select a health marker"
                {...register("startDate", {
                  required: true,
                  valueAsDate: true,
                })}
              ></Input>
            </FormControl>
            <FormControl mt={5} w="100%">
              <FormLabel htmlFor="endDate">End date</FormLabel>
              <Input
                type="date"
                placeholder="Select a health marker"
                {...register("endDate", { required: true, valueAsDate: true })}
              ></Input>
            </FormControl>
          </Box>
          <Box
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={2.5}
            ml="40px"
          >
            <HStack height="28px">
              <TimeIcon w="20px" h="20px" color="#FF8A84" />
              <Text color="gray.400" fontSize="20px" lineHeight="28px">
                {endDateMoment.diff(startDateMoment, "days") || 0} days selected
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Card>
    </VStack>
  );
}
