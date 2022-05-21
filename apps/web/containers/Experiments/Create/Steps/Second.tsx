import {
  VStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  HStack,
  InputGroup,
  InputRightAddon,
  IconButton,
  Box,
  Icon,
} from "@chakra-ui/react";
import { TCreateExperiment, StepProps } from "..";
import { useFieldArray, useFormContext } from "react-hook-form";
import Card from "../../../../components/Card";
import { AddIcon, ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import MarkerInput from "../components/MarkerInput";
import { PrimaryButton } from "../../../../components/Button";
import TextLink from "../../../../components/TextLink";

export default function SecondStep({
  onSubmit,
  prev,
}: React.PropsWithChildren<StepProps>) {
  const { register, setValue, trigger, getValues, control, handleSubmit } =
    useFormContext<TCreateExperiment>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "markers",
  });

  return (
    <form
      onKeyPress={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <VStack align="start" gap={6} width="100%">
        <HStack
          _hover={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => prev()}
        >
          <Icon as={ArrowBackIcon} size="sm" />
          <Text fontSize={16}>Back</Text>
        </HStack>
        <Card w="100%">
          <Text
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
            color="primary.800"
          >
            Experiment Period
          </Text>
          <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
            How long this experiment shoul run for?
          </Text>
          <Divider my={4} />
          <FormControl w="fit-content">
            <FormLabel htmlFor="experimentPeriod">Value</FormLabel>
            <InputGroup size="md">
              <Input
                type="number"
                min={0}
                placeholder="Experiment Period"
                {...register("experimentPeriod", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <InputRightAddon>days</InputRightAddon>
            </InputGroup>
          </FormControl>
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
        <Card w="100%">
          <Text
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
            color="primary.800"
          >
            Health Markers to Track
          </Text>
          <Text color="gray.700" fontSize="18px" lineHeight="28px" mt={2}>
            What health markers are you tracking in this experiment?
          </Text>
          <Divider my={4} />
          <VStack align={"start"}>
            {fields.map((field, index) => {
              return (
                <HStack align="end">
                  <MarkerInput index={index} />
                  <Box pb={1}>
                    <IconButton
                      onClick={() => remove(index)}
                      aria-label="Remove Marker"
                      variant="outline"
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </HStack>
              );
            })}
            <IconButton
              onClick={() => append({ name: "", devices: [] })}
              aria-label="Add Health Marker"
              variant="outline"
              size="sm"
              colorScheme="primary"
              icon={<AddIcon />}
            />
          </VStack>
        </Card>
        <PrimaryButton
          pos="absolute"
          top="145px"
          right="16px"
          size="md"
          text="Create Experiment"
          type="submit"
        />
      </VStack>
    </form>
  );
}
