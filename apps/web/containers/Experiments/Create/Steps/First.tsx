import {
  Heading,
  Textarea,
  useTheme,
  VStack,
  Input,
  HStack,
  Box,
} from "@chakra-ui/react";
import { StepProps, TCreateExperiment } from "..";
import { useFormContext } from "react-hook-form";
import { PrimaryButton } from "../../../../components/Button";
import { CreateInfoCard } from "../../../../components/Experiments";
import TextLink from "../../../../components/TextLink";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ErrorMessage } from "@hookform/error-message";
import StepperLayout from "./Layout";

export default function FirstStep({
  onSubmit,
  next,
  prev,
}: React.PropsWithChildren<StepProps>) {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useFormContext<TCreateExperiment>();
  const theme = useTheme();
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <VStack align="start" gap={3} width="100%">
        <TextLink label="Back" href="/" icon={<ArrowBackIcon />} />
        <ErrorMessage errors={errors} name="singleErrorInput" />
        <Input
          w="100%"
          size="lg"
          placeholder="Title for this experiment"
          {...register("title", { required: true, minLength: 10 })}
        />
        <Heading size="md">What is your goal for this experiment?</Heading>
        <Textarea
          {...register("description.goal", {
            required: true,
            minLength: 10,
          })}
        />
        <Heading size="md">What is the big idea for your experiment? </Heading>
        <Textarea
          {...register("description.idea", {
            required: true,
            minLength: 10,
          })}
        />
        <Heading size="md">What is your experiment design?</Heading>
        <Textarea
          {...register("description.design", {
            required: true,
            minLength: 10,
          })}
          placeholder={`This is where you can decide on three important components. 1. Is there existing evidence supporting your idea? 2. What is the treatment and how and when will you be using it? 3. How are you tracking progress and how long will you be doing the protocol? "Example: There is existing evidence on PubMed, that limiting alcohol prior to sleep can improve deep and REM sleep scores. I am going to not drink alcohol within 6 hours of sleep and track my sleep with my Oura ring device. I will do this for 6 weeks and compare my sleep scores to the prior 6 weeks."`}
        />
        <Heading size="md">
          Share your results data if any experimentation has been done to date
        </Heading>
        <Textarea
          {...register("description.results", {
            required: true,
            minLength: 10,
          })}
        />
        <Heading size="md">Summary</Heading>
        <Textarea
          {...register("description.summary", {
            required: true,
            minLength: 10,
          })}
          placeholder="In this section, it would be appropriate to discuss your experience with the protocol, if you see this as being a part of your daily routine going forward and any relevant bio-individual data that you feel is important to note?"
        />
        <PrimaryButton
          pos="absolute"
          top="145px"
          w="100px"
          right="16px"
          size="md"
          text="Next"
          type="submit"
        />
      </VStack>
    </form>
  );
}
