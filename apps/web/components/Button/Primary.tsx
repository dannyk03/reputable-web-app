import { Button, ComponentWithAs, ButtonProps } from "@chakra-ui/react";

export interface PrimaryButtonProps extends ButtonProps {
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  return (
    <Button
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      colorScheme="primary"
      variant="solid"
      lineHeight="24px"
      fontSize="16px"
      fontWeight={600}
      borderRadius="24px"
      {...restProps}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
