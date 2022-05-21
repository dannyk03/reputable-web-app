import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, VStack, useTheme } from "@chakra-ui/react";
import { CreateInfoCard } from "../../../components/Experiments";
import TextLink from "../../../components/TextLink";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { IExperiment } from "@reputable/types";
import FirstStep from "./Steps/First";
import { PrimaryButton } from "../../../components/Button";
import SecondStep from "./Steps/Second";
import StepperLayout from "./Steps/Layout";
import { useExperiment } from "../../../_api/Experiments/mutations";
import { useRouter } from "next/router";

export interface IStep {
  title: string;
  description: string;
}

export interface StepProps {
  /**
   * Indicates if user can click Next or Finish
   */
  canFinish?: boolean;
  onSubmit?: (data) => void;
  next?: () => void;
  prev?: () => void;
}

export type TCreateExperiment = Pick<
  IExperiment,
  "description" | "title" | "experimentPeriod" | "markers"
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
  const methods = useForm<TCreateExperiment>({ reValidateMode: "onChange" });
  const router = useRouter();
  const { create } = useExperiment({
    community: router.query.community as string,
  });
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  if (!router.query.community) {
    return <></>;
  }

  const next = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  const prev = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));

  // Should be in the same order with steps, needs to change based on methods
  // That's why its in the function itself, not defined outside like steps constant
  const stepPropsArray: (Record<string, any> & StepProps)[] = [
    {
      onSubmit: () => next(),
    },
    {
      onSubmit: (data) => {
        create.mutate({ ...data, communities: [router.query.community] });
      },
    },
  ];

  return (
    <FormProvider {...methods}>
      <VStack align="start" flexGrow={1} gap={6}>
        <StepperLayout
          title={steps[currentStep].title}
          description={steps[currentStep].description}
          currentStep={currentStep}
        >
          {React.cloneElement(steps[currentStep].container, {
            ...stepPropsArray[currentStep],
            next,
            prev,
          })}
        </StepperLayout>
      </VStack>
    </FormProvider>
  );
}
