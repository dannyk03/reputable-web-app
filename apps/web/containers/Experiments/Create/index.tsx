import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, VStack, useTheme } from "@chakra-ui/react";
import { CreateInfoCard } from "../../../components/Experiments";
import TextLink from "../../../components/TextLink";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { IExperiment } from "../../../types";
import FirstStep from "./Steps/First";
import { PrimaryButton } from "../../../components/Button";
import SecondStep from "./Steps/Second";

export interface IStep {
  title: string;
  description: string;
}

export interface StepProps {
  /**
   * Indicates if user can click Next or Finish
   */
  canFinish?: boolean;
  onFinish?: () => void;
}

export type TCreateExperiment = Pick<
  IExperiment,
  "description" | "title" | "startDate" | "endDate" | "results"
>;

const steps = [
  {
    title: "Experiment Title and Description",
    description: "Please provide an in-depth explanation for your experiment",
    container: <FirstStep />,
  },
  {
    title: "Experiment Details",
    description:
      "Now, choose which markers you want to track in this experiment.",
    container: <SecondStep />,
  },
];

export default function CreateExperimentView() {
  const methods = useForm<TCreateExperiment>();

  return (
    <FormProvider {...methods}>
      <form>
        <HStack align="start" gap={24}>
          <VStack align="start" flexGrow={1} gap={6}>
            <TextLink label="Back" href="/" icon={<ArrowBackIcon />} />
            {React.cloneElement(
              steps[currentStep].container,
              stepPropsArray[currentStep]
            )}
          </VStack>
          <VStack align="end">
            <PrimaryButton
              size="md"
              text="Next"
              disabled={stepPropsArray[currentStep]?.canFinish ?? true}
              onClick={
                stepPropsArray[currentStep]?.onFinish ??
                (() => console.log("clicked"))
              }
            />
            <CreateInfoCard
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep]}
            />
          </VStack>
        </HStack>
      </form>
    </FormProvider>
  );
}
