import { VStack } from "@chakra-ui/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { IExperiment, PopulatedExperiment } from "@reputable/types";
import FirstStep from "./Steps/First";
import SecondStep from "./Steps/Second";
import StepperLayout from "./Steps/Layout";
import { useExperiment } from "../../../_api/Experiments/mutations";
import { useRouter } from "next/router";
import { pick } from "lodash";

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
  buttonText?: string;
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
    buttonText: "Next",
  },
  {
    title: "Experiment Details",
    description:
      "Now, choose which markers you want to track in this experiment.",
    container: <SecondStep />,
  },
];

export default function ExperimentFormView(props: {
  defaultValues?: PopulatedExperiment;
}) {
  console.log("props", props);
  const methods = useForm<TCreateExperiment>({
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: pick(props.defaultValues, [
      "description",
      "title",
      "experimentPeriod",
      "markers",
    ]),
  });
  const router = useRouter();
  const { create, update } = useExperiment({
    configs: {
      create: {
        onSuccess: () =>
          router.push(`/${(router.query.community as string) ?? ""}`),
      },
      update: {
        onSuccess: () =>
          router.push(
            `/${props.defaultValues.communities[0].slug}/${props.defaultValues._id}`
          ),
      },
    },
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
        if (props.defaultValues)
          update.mutate({ _id: router.query.id as string, data });
        else create.mutate({ ...data, communities: [router.query.community] });
      },
      buttonText: props.defaultValues
        ? "Update Experiment"
        : "Create Experiment",
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
