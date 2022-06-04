import React from "react";
import {
  Heading,
  Textarea,
  useTheme,
  VStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { StepProps, TCreateExperiment } from "..";
import {
  Controller,
  useFormContext,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import { PrimaryButton } from "../../../../components/Button";
import TextLink from "../../../../components/TextLink";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ErrorMessage } from "@hookform/error-message";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
}) as unknown as React.FC<any>;

const ControlledEditor = ({
  name,
  style,
  control,
  ...restProps
}: {
  name: FieldPath<TCreateExperiment>;
  style?: React.CSSProperties;
} & UseControllerProps<TCreateExperiment, FieldPath<TCreateExperiment>>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { onChange, onBlur, value, name, ref },
      fieldState: { error },
    }) => (
      <>
        <MDEditor
          style={{
            border: error && "1px solid red",
            width: "100%",
            ...style,
          }}
          onBlur={onBlur}
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <p style={{ color: "red" }}>{error?.message}</p>
      </>
    )}
    {...restProps}
  />
);

export default function FirstStep({
  onSubmit,
}: React.PropsWithChildren<StepProps>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
          {...register("title", {
            required: true,
            minLength: {
              value: 10,
              message: "This field should be at least 10 chars long.",
            },
          })}
        />
        <Heading fontSize="1.5rem">
          What is your goal for this experiment?
        </Heading>
        <Text
          color="gray.500"
          fontWeight={400}
          lineHeight="20px"
          fontSize="14px"
          style={{ marginTop: "0px" }}
        >
          This would be the outcome you hope to achieve for yourself or others.
          Example: “I want to improve my sleep to 2 hours of deep and 2 hours
          REM each night.”
        </Text>
        <ControlledEditor
          control={control}
          name="description.goal"
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: "This field should be at least 10 chars long.",
            },
          }}
        />
        <Heading fontSize="1.5rem">
          What is the big idea for your experiment?{" "}
        </Heading>
        <Text
          color="gray.500"
          fontWeight={400}
          lineHeight="20px"
          style={{ marginTop: "0px" }}
          fontSize="14px"
        >
          Think of this as your "hypothesis". Example: “Having sex before bed
          will improve the quality of my sleep."
        </Text>
        <ControlledEditor
          control={control}
          name="description.idea"
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: "This field should be at least 10 chars long.",
            },
          }}
        />
        <Heading fontSize="1.5rem">What is your experiment design?</Heading>
        <Text
          color="gray.500"
          fontWeight={400}
          style={{ marginTop: "0px" }}
          lineHeight="20px"
          fontSize="14px"
        >
          This is where you can decide on three important components:
          <br />
          1. Is there existing evidence supporting your idea?
          <br />
          2. What is the treatment and how and when will you be using it?
          <br />
          3. How are you tracking progress and how long will you be doing the
          protocol?
          <br /> Example: “There is existing evidence on PubMed, that limiting
          alcohol prior to sleep can improve deep and REM sleep scores. I am
          going to not drink alcohol within 6 hours of sleep and track my sleep
          with my Oura ring device. I will do this for 6 weeks and compare my
          sleep scores to the prior 6 weeks."
        </Text>
        <ControlledEditor
          control={control}
          name="description.design"
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: "This field should be at least 10 chars long.",
            },
          }}
        />
        <Heading fontSize="1.5rem">
          Share your results data if any experimentation has been done to date
        </Heading>
        <Text
          color="gray.500"
          fontWeight={400}
          style={{ marginTop: "0px" }}
          lineHeight="20px"
          fontSize="14px"
        >
          If not, then results will be shared by the community.
        </Text>
        <ControlledEditor control={control} name="description.results" />
        <Heading fontSize="1.5rem">Summary</Heading>
        <Text
          color="gray.500"
          fontWeight={400}
          lineHeight="20px"
          style={{ marginTop: "0px" }}
          fontSize="14px"
        >
          In this section, it would be appropriate to discuss your experience
          with the protocol, if you see this as being a part of your daily
          routine going forward and any relevant bio-individual data that you
          feel is important to note?
        </Text>
        <ControlledEditor control={control} name="description.summary" />
        <PrimaryButton
          pos="absolute"
          top="-20px"
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
