import {
  ChakraProps,
  ComponentWithAs,
  HStack,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../Button";

interface Props extends ChakraProps {
  onSubmit: (data: any) => void;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, ...restProps }: Props) {
  const { register, handleSubmit, reset } = useForm<any>();
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
        reset();
      })}
    >
      <HStack align="end">
        <Textarea
          ml={3}
          required
          {...register("text", {
            minLength: {
              value: 10,
              message: "Your comment should be at least 20 chars long.",
            },
          })}
          {...restProps}
        />
        <PrimaryButton fontSize="14px" h={8} type="submit" text="Submit" />
      </HStack>
    </form>
  );
}
