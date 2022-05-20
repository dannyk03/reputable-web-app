import { useAuth0 } from "@auth0/auth0-react";
import { ChakraProps, Flex, HStack, Textarea, Avatar } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import makeAvatar from "../../helpers/makeAvatar";
import { PrimaryButton } from "../Button";

interface Props extends ChakraProps {
  onSubmit: (data: any) => void;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, ...restProps }: Props) {
  const { register, handleSubmit, reset } = useForm<any>();
  const { isAuthenticated, user } = useAuth0();
  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <Flex w="100%">
      <Avatar
        width={"40px"}
        height={"40px"}
        name="Profile Photo"
        src={user?.picture ?? makeAvatar(user?.given_name ?? "User")}
      />
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
    </Flex>
  );
}
