import { Flex, Input, useTheme, VStack } from "@chakra-ui/react";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { StepProps, TCreateExperiment } from "..";
import NoSSR from "../../../../components/NoSSR";
import RichTextEditor from "../../../../components/RichTextEditor";
import { useFormContext } from "react-hook-form";

export default function FirstStep({}: React.PropsWithChildren<StepProps>) {
  const { register, setValue, trigger } = useFormContext<TCreateExperiment>();
  const theme = useTheme();
  return (
    <VStack align="start" gap={3} width="100%">
      <Input
        placeholder="Your title goes here!"
        size="lg"
        fontWeight={600}
        color="gray.800"
        {...register("title", {
          required: true,
          minLength: 10,
          onChange: (e) => trigger("title"),
        })}
      />
      <NoSSR>
        <RichTextEditor
          {...register("description", { required: true, minLength: 30 })}
          onChange={(value) => {
            setValue("description", draftToHtml(convertToRaw(value)), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          theme={theme}
        />
      </NoSSR>
    </VStack>
  );
}
